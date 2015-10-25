'use strict';

angular.module('users').controller('ContenusController',
  function ($q, $rootScope, $scope, Piste, Secteur, Parcours) {

    $scope.savedThings = [{
      title: 'Medias',
      color: 'blue',
      icon: 'movie',
      things: $rootScope.currentUser.favorites.media || [],
      show: function (things) {
        $scope.medias = things;
      }
    }, {
      title: 'Pistes',
      color: 'pink',
      icon: 'link',
      things: $rootScope.currentUser.favorites.piste || [],
      show: function (things) {
        $scope.pistes = things;
      }
    }];

    $scope.show = function (savedThing) {
      $scope.medias = undefined;
      $scope.pistes = undefined;
      _.forEach($scope.savedThings, function (thing) {
        if (thing === savedThing) {
          thing.active = true;
        } else {
          thing.active = false;
        }
      });
      savedThing.show(savedThing.things);
    };

    $scope.show($scope.savedThings[0]);

    // Grosse cascade de vomit dégeu.
    var pisteIds = $rootScope.currentUser.favorites.piste;
    if (pisteIds && pisteIds.length > 0) {
      var pistePromises = [];
      _.forEach(pisteIds, function (pisteId) {
        pistePromises.push(Piste.findById(pisteId));
      });
      $q.all(pistePromises).then(function (pistes) {
        var secteurPromises = [];
        _.forEach(_.uniq(_.pluck(pistes, 'secteurId')), function (secteurId) {
          secteurPromises.push(Secteur.findById(secteurId));
        });
        $q.all(secteurPromises).then(function (secteurs) {
          _.forEach(secteurs, function (secteur) {
            secteur.pistes = _.filter(pistes, 'secteurId');
          });
          var parcoursPromises = [];
          _.forEach(_.uniq(_.pluck(secteurs, 'parcoursId')), function (parcoursId) {
            parcoursPromises.push(Parcours.findById(parcoursId));
          });
          $q.all(parcoursPromises).then(function (allParcours) {
            _.forEach(allParcours, function (parcours) {
              parcours.secteurs = _.filter(secteurs, 'parcoursId');
            });
            $scope.allParcours = allParcours;
          });
        });
      });
    }

  });
