'use strict';

angular.module('medias').directive('mediaCard',
  function ($state) {
    return {
      restrict: 'E',
      scope: {
        media: '='
      },
      replace: true,
      templateUrl: 'modules/medias/views/media.card.html',
      link: function (scope) {

        scope.goToMedia = function (media) {
          $state.go('media-fiche', {
            mediaId: media._id
          });
        };
      }
    };
  });
