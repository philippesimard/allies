'use strict';

angular.module('users').controller('UserAccountController',
  function ($scope, user) {

    $scope.user = user;

    /*
    User.find() // Liste utilisateurs
    User.findOne(id) // retour un utilisateur.

    User.findOne(1234567).then(function(user) {
        user.firstname = 'MAthieu';
        
        user.update();
        user.destroy();
    });

    User.create({
      firstname: 'Steve',
      name: 'Boisbert'
    }).then(function(user) {
      user === le nouvel utilisateur
    });

    */

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
