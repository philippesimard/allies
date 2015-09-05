'use strict';

angular.module('core').directive('header',
  function (UserAuth, $window, $state, $rootScope) {

    return {

      templateUrl: 'modules/navigation/views/header.html',
      link: function (scope) {

        scope.isConnected = $rootScope.currentUser.isAuthentified();

        $rootScope.$on('$stateChangeSuccess',
          function () {
            scope.isConnected = $rootScope.currentUser.isAuthentified();
          });

        scope.deconnect = function () {
          UserAuth.signout().then(function () {
            $state.go('home');
          });
        };

        scope.monCompte = function () {
          $state.go('userAccount');
        };
      }
    };
  });
