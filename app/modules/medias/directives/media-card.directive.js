'use strict';

angular.module('medias').directive('mediaCard',
  function ($rootScope, MaterializeService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        media: '='
      },
      templateUrl: 'modules/medias/views/media.card.html',
      link: function (scope) {

        scope.addToFavorite = function () {
          $rootScope.currentUser.addFavorite('media', scope.media).then(function (message) {
            MaterializeService.toast('<i class="material-icons red-text">favorite</i>&nbsp;&nbsp;' + message, 3000);
          });
        };
      }
    };
  });
