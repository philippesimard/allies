'use strict';

angular.module('users').controller('LoginController',
  function ($scope, $rootScope, $state, UserAuth) {

    $scope.login = function () {

      if ($scope.loginForm.$invalid) {
        $scope.showErrors = true;
      } else {

        $rootScope.$on('UserAuth:login:success', function (event, user) {
          $state.go('userAccount', {
            userId: user._id
          });
        });

        $rootScope.$on('UserAuth:login:error:wrongUserNameOrPass', function () {
          console.log('ERROR!!!');
          $scope.showErrors = false;
          $scope.loginInfo.password = undefined;
        });

        UserAuth.login($scope.loginInfo);

      }
    };
  });
