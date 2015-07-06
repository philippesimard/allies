'use strict';

angular.module('users').controller('ParametersController',
  function ($scope, user) {

    $scope.user = user;

    $scope.editUser = function () {

      if ($scope.userForm.$invalid) {
        $scope.showErrors = true;
      } else {

        $scope.user.update().then(function (updatedUser) {

          $scope.user = updatedUser;

          $scope.showErrors = false;

          $scope.newUser = undefined;
        });
      }
    };

  });
