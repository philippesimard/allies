'use strict';

angular.module('parcours').directive('parcoursPreview',
  function ($state) {
    return {
      restrict: 'E',
      scope: {
        parcours: '='
      },
      templateUrl: 'modules/parcours/views/parcours.preview.html',
      link: function (scope, element) {
        angular.element(element.find('div')[0]).css('background-image', 'url(' + scope.parcours.img + ')');

        scope.toToParcours = function (parcours) {
          $state.go('parcours-page', {
            parcoursName: parcours.shortName
          });
        };
      }
    };
  });
