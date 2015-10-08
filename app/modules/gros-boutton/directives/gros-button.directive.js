'use strict';

angular.module('gros-boutton').directive('grosButton',
  function ($rootScope) {

    return {
      restrict: 'E',
      templateUrl: 'modules/gros-boutton/views/gros.button.html',
      link: function (scope) {

        $rootScope.$on('$stateChangeStart', function () {
          scope.grosBoutton = undefined;
        });

        $rootScope.$on('grosButton:show', function ($event, grosBoutton) {
          if ($rootScope.currentUser.isAuthentified()) {
            scope.grosBoutton = grosBoutton;
          }
        });
      }
    };
  });
