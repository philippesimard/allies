'use strict';

angular.module('medias').directive('mediasGalerie',
  function($q, $timeout, MediaSection, Media, Niveau) {
    return {
      restrict: 'E',
      scope: {
        mediasIds: '=',
        mediaType: '@',
        mediaSectionId: '@',
        mediasPerRow: '@',
        maxRows: '@',
        showFilters: '='
      },
      templateUrl: function(element, attrs) {
        return attrs.mode === 'static' ? 'modules/medias/views/medias.static-galerie.html' : 'modules/medias/views/medias.galerie.html';
      },
      link: function(scope) {

        var deffered = $q.defer();

        if (scope.mediaType) {
          Media.findBySectionShortName(scope.mediaType).then(function(medias) {
            deffered.resolve(medias);
          });
        } else if (scope.mediaSectionId) {
          Media.find({
            sectionId: scope.mediaSectionId
          }).then(function(medias) {
            deffered.resolve(medias);
          });
        } else if (scope.mediasIds) {
          var promises = [],
            medias = [];
          _.forEach(scope.mediasIds, function(mediasId) {
            var deffered2 = $q.defer();
            promises.push(deffered2.promise);
            Media.findById(mediasId).then(function(media) {
              medias.push(media);
              deffered2.resolve(media);
            }).catch(function() {
              deffered2.resolve();
            });
          });

          $q.all(promises).then(function() {
            deffered.resolve(medias);
          });
        }

        deffered.promise.then(function(medias) {

          if (scope.maxRows) {
            var nbMedia = scope.mediasPerRow * scope.maxRows;
            medias = medias.length < nbMedia ? medias : medias.slice(0, nbMedia);
          }

          scope.cardLength = 100 / scope.mediasPerRow + '%';
          scope.galerie = {
            medias: medias
          };

          // Filtres

          var originalList = angular.copy(scope.galerie.medias);

          scope.niveaux = [];

          var newNiveauxIds = [];
          _.forEach(scope.galerie.medias, function(media) {
            newNiveauxIds = _.difference(media.niveau, _.pluck(scope.niveaux, '_id'));
          });

          var promises = [];
          _.forEach(newNiveauxIds, function(newNiveauxId) {
            promises.push(Niveau.findById(newNiveauxId).then(function(niveau) {
              scope.niveaux.push(niveau);
            }));
          });

          $q.all(promises).then(function() {
            $('.dropdown-button').dropdown({
              inDuration: 300,
              outDuration: 225,
              constrain_width: false, // jshint ignore:line
              hover: true, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: true // Displays dropdown below the button
            });
          });

          var allNiveaux = new Niveau({
            _id: 0,
            poids: 0,
            description: 'Tous les niveaux'
          });
          scope.niveaux.unshift(allNiveaux);
          scope.selectedNiveau = allNiveaux;

          var currentQuery;

          function filter(query, niveau) {
            var medias;

            if (niveau._id === 0) {
              medias = originalList;
            } else {
              medias = _.filter(originalList, function(media) {
                return _.contains(media.niveau, niveau._id);
              });
            }

            return _.filter(medias, function(media) {
              return _.deburr(media.toString().toLowerCase()).indexOf(query) > -1;
            });
          }

          scope.$watch('query', function(newQuery) {
            if (newQuery) {
              currentQuery = _.deburr(newQuery).toLowerCase();
              scope.galerie.medias = filter(currentQuery, scope.selectedNiveau);
            }
          });

          scope.filterByNiveau = function(niveau) {
            scope.selectedNiveau = niveau;
            scope.galerie.medias = filter(currentQuery, niveau);
          };

          scope.reinitialize = function() {
            scope.query = '';
            currentQuery = scope.query;
            scope.selectedNiveau = allNiveaux;
            scope.galerie.medias = filter(scope.query, scope.selectedNiveau);
          };
        });

        $timeout(function() {

        });

      }
    };
  });