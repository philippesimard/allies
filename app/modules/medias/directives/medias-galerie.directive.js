'use strict';

angular.module('medias').directive('mediasGalerie',
  function ($q, MediaSection, Media) {
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
      templateUrl: function (element, attrs) {
        return attrs.mode === 'static' ? 'modules/medias/views/medias.static-galerie.html' : 'modules/medias/views/medias.galerie.html';
      },
      link: function (scope) {

        var deffered;
        if (scope.mediaType) {
          deffered = Media.findBySectionShortName(scope.mediaType);
        } else if (scope.mediaSectionId) {
          deffered = Media.find({
            sectionId: scope.mediaSectionId
          });
        } else if (scope.mediasIds) {
          var promises = [],
            medias = [];

          _.forEach(scope.mediasIds, function (mediasId) {
            promises.push(Media.findById(mediasId).then(function (media) {
              medias.push(media);
            }));
          });

          deffered = $q.when(promises).then(function () {
            return medias;
          });
        }

        deffered.then(function (medias) {

          if (scope.maxRows) {
            var nbMedia = scope.mediasPerRow * scope.maxRows;
            medias = medias.length < nbMedia ? medias : medias.slice(0, nbMedia);
          }

          scope.cardLength = 100 / scope.mediasPerRow + '%';
          scope.medias = medias;

        });
      },
      controller: function ($scope) {

        this.setMedias = function (medias) {
          $scope.medias = medias;
        };
      }
    };
  });
