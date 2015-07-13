'use strict';

angular.module('users').controller('ParametersController',
  function ($scope, user, MaterializeService) {

    $scope.user = user;

    $scope.modifyUser = function () {

      if ($scope.userForm.$invalid) {
        $scope.showErrors = true;
      } else {

        $scope.user.update().then(function (updatedUser) {

          $scope.user = updatedUser;

          MaterializeService.toast('Mises à jour de vos informations', 3000);

          $scope.showErrors = false;
        });
      }
    };

  });
