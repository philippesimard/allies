'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('userForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/users/views/users.form.html',
      controller: 'UsersAjoutController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'modules/users/views/users.login.html',
      controller: 'LoginController'
    });

  });
