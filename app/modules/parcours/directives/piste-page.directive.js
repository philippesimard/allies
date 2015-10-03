'use strict';

angular.module('parcours').directive('pistePage',
  function () {
    return {
      restrict: 'E',
      scope: {
        piste: '='
      },
      templateUrl: 'modules/parcours/views/piste.page.html',
      // link: function (scope) {}
    };
  });
