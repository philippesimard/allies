'use strict';

angular.module('medias').directive('mediasGalerie',
  function ($compile, MediaFactory) {
    return {
      restrict: 'E',
      scope: {
        mediaType: '@',
        mediasPerRow: '@',
        maxRows: '@'
      },
      templateUrl: function (element, attrs) {
        return attrs.mode === 'static' ? 'modules/medias/views/medias.static-galerie.html' : 'modules/medias/views/medias.galerie.html';
      },
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

        /*
    $scope.films = films;
    $scope.niveaux = niveaux;

    $scope.filterFilm = function (prop, value) {
      if (!prop || !value) {
        $scope.films = films;
        return;
      }

      $scope.films = _.filter(films, function (film) {
        return film[prop] === value._id;
      });
    };*/

        /*scope.random = function () {
          return 0.5 - Math.random();
        };*/
      }
    };
  });
