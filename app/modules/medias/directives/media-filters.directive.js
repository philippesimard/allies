'use strict';

angular.module('medias').directive('mediaFilters',
  function () {
    return {
      restrict: 'E',
      require: '^mediasGalerie',
      templateUrl: 'modules/medias/views/media.filters.html',
      link: function (scope, element, attrs, mediasGalerieController) {
        var watchMedia = scope.$watch('medias', function (medias) {
          if (medias) {

            var originalList = angular.copy(medias),
              filteredItems = [];

            scope.$watch('query', function (newQuery, oldQuery) {
              if (!_.isUndefined(newQuery)) {

                newQuery = _.deburr(newQuery).toLowerCase()

                // Tris.
                if (_.isUndefined(oldQuery) || newQuery.length > oldQuery.length) {

                  var medias = _.filter(scope.medias, function (media) {
                    return _.deburr(media.toString().toLowerCase()).indexOf(newQuery) > -1;
                  });
                  mediasGalerieController.setMedias(medias);
                  filteredItems[newQuery.length - 1] = medias;
                }

                // Reset.
                else if (newQuery.length === 0 && !_.isUndefined(oldQuery)) {
                  mediasGalerieController.setMedias(originalList);
                }

                // Retour en arrière.
                else if (newQuery.length < oldQuery.length) {
                  mediasGalerieController.setMedias(filteredItems[newQuery.length - 1]);
                }
              }
            });
            watchMedia();
          }
        });
      }
    };
  });
