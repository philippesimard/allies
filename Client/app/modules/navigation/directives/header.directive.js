'use strict';

angular.module('core').directive('header',
  function (UserAuth, $window, $state, $rootScope) {

    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'modules/navigation/views/header.html',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function (scope) {

        $rootScope.$on('$stateChangeSuccess',
          function () {
            scope.isConnected = UserAuth.isAuthentified();
          });

        scope.deconnect = function () {
          // UserAuth.logout(); En attendant que Steve corrige
          $window.sessionStorage.clear();
          $state.go('home');
        };

        scope.monCompte = function () {
          console.log('mon Compte');
        };

      },
      // controller: function ($scope) {},
    };
  });
