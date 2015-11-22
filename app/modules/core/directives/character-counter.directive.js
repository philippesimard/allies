'use strict';

angular.module('core').directive('characterCounter',
  function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.attr('length', attrs.characterCounter);
        element.characterCounter();
      }
    };
  });
