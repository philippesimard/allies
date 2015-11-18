'use strict';

angular.module('navigation-module').directive('ft',
  function (Parcours, $state) {

    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/footer.html',
      link: function (scope) {

        Parcours.find().then(function (parcours) {
          scope.allParcours = parcours;
        });

        scope.goToParcours = function (parcours) {
          $state.go('parcours-page', {
            parcoursName: parcours.shortName
          });
        };
      }
    };

  });
