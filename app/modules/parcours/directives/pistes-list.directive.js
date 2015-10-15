'use strict';

angular.module('parcours').directive('pisteList',
  function ($state) {

    return {
      restrict: 'E',
      templateUrl: 'modules/parcours/views/pistes.list.html',
      link: function (scope) {

        scope.toToPiste = function (piste) {
          $state.go('piste-page', {
            pisteName: piste.shortName
          });
        };
      }

    };

  });
