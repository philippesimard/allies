'use strict';

angular.module('users').controller('UsersListController',
  function ($scope, users) {

    $scope.users = users;

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

  });
