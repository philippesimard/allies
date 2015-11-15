'use strict';

angular.module('core').run(
  function ($rootScope) {

    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  });
