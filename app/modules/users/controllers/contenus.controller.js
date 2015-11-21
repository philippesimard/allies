'use strict';

angular.module('users').controller('ContenusController',
  function($q, $rootScope, $scope, Piste, Secteur, Parcours) {

    $scope.savedThings = [{
      title: 'Medias',
      color: 'blue',
      icon: 'movie',
      things: $rootScope.currentUser.favorites.media || [],
      show: function(things) {
        $scope.medias = things;
      }
    }, {
      title: 'Pistes',
      color: 'pink',
      icon: 'link',
      things: $rootScope.currentUser.favorites.piste || [],
      show: function(things) {
        $scope.pistes = things;
      }
    }];

    $scope.show = function(savedThing) {
      $scope.medias = undefined;
      $scope.pistes = undefined;
      _.forEach($scope.savedThings, function(thing) {
        if (thing === savedThing) {
          thing.active = true;
        } else {
          thing.active = false;
        }
      });
      savedThing.show(savedThing.things);
    };

    $scope.show($scope.savedThings[0]);

    $rootScope.$on('media:favorite:remove', function($event, removedMedia) {
      _.remove($scope.medias, function(media) {
        return media._id === removedMedia._id;
      })
    });

    $rootScope.$on('piste:favorite:remove', function($event, removedPiste) {
      _.remove($scope.pistes, function(piste) {
        return piste._id === removedPiste._id;
      })
    });

    // Grosse cascade de vomit dégeu.
    var pisteIds = $rootScope.currentUser.favorites.piste;
    if (pisteIds && pisteIds.length > 0) {
      var pistePromises = [];
      _.forEach(pisteIds, function(pisteId) {
        pistePromises.push(Piste.findById(pisteId));
      });
      $q.all(pistePromises).then(function(pistes) {
        var groupedPistes = _.groupBy(pistes, 'secteurId'),
          secteurPromises = [];
        _.forEach(_.keys(groupedPistes), function(secteurId) {
          secteurPromises.push(Secteur.findById(secteurId).then(function(secteur) {
            secteur.pistes = groupedPistes[secteur._id];
            return secteur;
          }));
        });
        $q.all(secteurPromises).then(function(secteurs) {
          var groupedSecteurs = _.groupBy(secteurs, 'parcoursId'),
            parcoursPromises = [];
          _.forEach(_.keys(groupedSecteurs), function(parcoursId) {
            parcoursPromises.push(Parcours.findById(parcoursId).then(function(parcours) {
              parcours.secteurs = groupedSecteurs[parcours._id];
              return parcours;
            }));
          });
          $q.all(parcoursPromises).then(function(allParcours) {
            $scope.allParcours = allParcours;
          });
        });
      });
    }
  });