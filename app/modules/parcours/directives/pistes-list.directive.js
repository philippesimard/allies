'use strict';

angular.module('parcours').directive('pisteList',
  function ($rootScope, MaterializeService, Piste, $q, $state) {

    return {
      restrict: 'E',
      scope: {
        pistes: '=',
        pistesIds: '=',
        showRemoveIcon: '@',
        noHeader: '@'
      },
      templateUrl: 'modules/parcours/views/pistes.list.html',
      link: function (scope) {

        if (scope.pistesIds) {
          var promises = [];
          _.forEach(scope.pistesIds, function (pisteId) {
            promises.push(Piste.findById(pisteId));
          });
          $q.when(promises).then(function (pistes) {
            scope.pistes = pistes;
          });
        }

        scope.toToPiste = function (piste) {
          $state.go('piste-page', {
            pisteName: piste.shortName
          });
        };

        scope.canRemove = function (piste) {
          return $rootScope.currentUser.isAuthentified() && $rootScope.currentUser.hasFavorite('piste', piste);
        };

        scope.removeFromFavorite = function (piste) {
          $rootScope.currentUser.removeFavorite('piste', piste).then(function (message) {
            if ($state.current.name === 'contenus') {
              _.pull(scope.pistes, piste);
            }
            MaterializeService.toast('<i class="material-icons red-text">favorite</i>&nbsp;&nbsp;' + message, 3000);
          });
        };
      }

    };

  });
