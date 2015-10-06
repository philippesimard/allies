'use strict';

angular.module('parcours').directive('parcoursList',
  function ($state, Parcours) {
    return {
      restrict: 'E',
      templateUrl: 'modules/parcours/views/parcours.list.html',
      link: function (scope) {

        Parcours.find().then(function (parcours) {
          scope.allParcours = parcours;
        });

        scope.toToParcours = function (parcours) {
          $state.go('parcours-page', {
            parcoursName: parcours.shortName
          });
        };
      }
    };
  });
