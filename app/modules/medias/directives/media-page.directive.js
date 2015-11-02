'use strict';

angular.module('medias').directive('mediaPage',
  function ($rootScope, GrosBoutton) {
    return {
      restrict: 'E',
      scope: {
        piste: '='
      },
      templateUrl: 'modules/medias/views/media-page.html',
      link: function (scope) {

        scope.piste.templateUrl = 'modules/pistes/views/' + scope.piste.templateUrl;

        var grosBoutton = new GrosBoutton();

        grosBoutton.on('addToFavorites', function () {
          return $rootScope.currentUser.addFavorite('media', scope.piste);
        });

      }
    };
  });
