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

        scope.piste.templateUrl = 'modules/pistes/views/' + scope.piste.templateUrl;

        scope.piste.canAddBadge = !_.isUndefined(scope.piste.badge) && !$rootScope.currentUser.hasBadge(scope.piste.badge);

        var grosBoutton = new GrosBoutton();

        grosBoutton.on('addToFavorites', function () {
          return $rootScope.currentUser.addFavorite('piste', scope.piste);
        });

        $rootScope.$broadcast('grosButton:show', grosBoutton);

        scope.addBadge = function () {
          if (scope.piste.canAddBadge) {
            $rootScope.currentUser.addBadge(scope.piste.badge).then(function () {
              scope.piste.canAddBadge = false;
            });
          }
        };
      }
    };
  });
