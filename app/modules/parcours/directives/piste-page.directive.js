'use strict';

angular.module('parcours').directive('pistePage',
  function ($rootScope, GrosBoutton) {
    return {
      restrict: 'E',
      scope: {
        piste: '='
      },
      templateUrl: 'modules/parcours/views/piste.page.html',
      link: function (scope) {

        var grosBoutton = new GrosBoutton();

        grosBoutton.on('addToFavorites', function () {
          return $rootScope.currentUser.addFavorite('piste', scope.piste);
        });

        $rootScope.$broadcast('grosButton:show', grosBoutton);
      }
    };
  });
