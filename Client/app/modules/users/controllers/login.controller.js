'use strict';

angular.module('users').controller('LoginController',
  function ($scope, $rootScope, $state, UserAuth, MaterializeService) {

    $scope.login = function () {

      if ($scope.loginForm.$invalid) {
        $scope.showErrors = true;
      } else {

        $rootScope.$on('UserAuth:login:success', function (event, user) {
          MaterializeService.toast('Vous êtes maintenant connecté', 3000);
          $state.go('userAccount', {
            userId: user._id
          });
        });

        $rootScope.$on('UserAuth:login:error:wrongUserNameOrPass', function () {

          MaterializeService.toast('Erreur', 3000);
          $scope.showErrors = false;
          $scope.loginInfo.password = undefined;
        });

        UserAuth.login($scope.loginInfo);

      }
    };
  });
