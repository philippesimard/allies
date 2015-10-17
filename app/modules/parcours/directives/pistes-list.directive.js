'use strict';

angular.module('parcours').directive('pisteList',
  function (Piste, $q, $state) {

    return {
      restrict: 'E',
      scope: {
        pistes: '=',
        pistesIds: '='
      },
      templateUrl: 'modules/parcours/views/pistes.list.html',
      link: function (scope, element, attrs) {

        scope.noHeader = attrs.noHeader;

        if (scope.pistesIds) {
          var promises = [],
            pistes = [];
          _.forEach(scope.pistesIds, function (pisteId) {
            promises.push(Piste.findById(pisteId).then(function (piste) {
              pistes.push(piste);
            }));
          });
          $q.when(promises).then(function () {
            scope.pistes = pistes;
          });
        }

        scope.toToPiste = function (piste) {
          $state.go('piste-page', {
            pisteName: piste.shortName
          });
        };
      }

    };

  });
