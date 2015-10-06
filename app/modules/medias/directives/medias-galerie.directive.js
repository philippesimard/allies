'use strict';

angular.module('medias').directive('mediasGalerie',
  function (MediaFactory) {
    return {
      restrict: 'E',
      scope: {
        mode: '@',
        mediaType: '@',
        orderBy: '@',
        mediasPerRow: '@',
        maxRows: '@'
      },
      templateUrl: 'modules/medias/views/medias.galerie.html',
      link: function (scope) {
        MediaFactory.getMedias({
          mediaType: scope.mediaType
        }).then(function (medias) {

          if (scope.maxRows) {
            var nbMedia = scope.mediasPerRow * scope.maxRows;
            medias = medias.length < nbMedia ? medias : medias.slice(0, nbMedia);
          }

          scope.cardLength = 100 / scope.mediasPerRow + '%';
          scope.medias = medias;
        });
      }
    };
  });
