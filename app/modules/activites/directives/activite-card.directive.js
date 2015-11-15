'use strict';

angular.module('activites').directive('activiteCard',
  function ($state) {
    return {
      restrict: 'E',
      scope: {
        activite: '='
      },
      replace: true,
      templateUrl: 'modules/activites/views/activite.card.html',
      link: function (scope) {

        scope.goToActivite = function (activite) {
          $state.go('activite-fiche', {
            activiteId: activite._id
          });
        };
      }
    };
  });
