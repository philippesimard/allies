'use strict';

angular.module('users').controller('UsersController',
  function ($scope, UserService) {

    $scope.titreSection = 'Nos Bénévoles';

    $scope.users = UserService.getUsers();

    $scope.addUser = function () {

      if ($scope.userForm.$invalid) {
        $scope.showErrors = true;
      } else {

        UserService.addUser($scope.newUser);

        $scope.showErrors = false;

        $scope.newUser = undefined;
      }

    };

  });
