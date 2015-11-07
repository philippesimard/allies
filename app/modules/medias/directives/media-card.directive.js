'use strict';

angular.module('medias').directive('mediaCard',
  function($rootScope, $state, MaterializeService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        media: '='
      },
      templateUrl: 'modules/medias/views/media.card.html',
      link: function(scope) {

        if ($rootScope.currentUser.isAuthentified()) {
          scope.media.isFavorited = $rootScope.currentUser.hasFavorite('media', scope.media);

          scope.addToFavorite = function() {
            $rootScope.currentUser.addFavorite('media', scope.media).then(function(message) {
              scope.media.isFavorited = true;
              MaterializeService.toast('<i class="material-icons red-text">favorite</i>&nbsp;&nbsp;' + message, 3000);
            });
          };

          scope.removeFromFavorite = function() {
            $rootScope.currentUser.removeFavorite('media', scope.media).then(function(message) {
              scope.media.isFavorited = false;
              MaterializeService.toast('<i class="material-icons red-text">favorite</i>&nbsp;&nbsp;' + message, 3000);
            });
          };
        }

        scope.goToMedia = function(media) {
          $state.go('media-fiche', {
            mediaId: media._id
          });
        };
      }
    };
  });