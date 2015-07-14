'use strict';

angular.module('users').controller('UsersAjoutController',
  function ($scope, User) {

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

    $scope.addUser = function () {

      if ($scope.userForm.$invalid) {
        $scope.showErrors = true;
      } else {

        User.create($scope.newUser).then(function () {

          $scope.showErrors = false;

          $scope.newUser = undefined;

        });
      }
    };

  });
