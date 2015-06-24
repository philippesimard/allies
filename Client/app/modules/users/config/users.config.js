'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('usersForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/core/views/users.form.html',
      controller: 'UsersController'
    })

    .state('account', {
      url: '/utilisateur/:userId',
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UsersController'
    });
  });
