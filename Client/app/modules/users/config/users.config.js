'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('userForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/core/views/users.form.html',
      controller: 'UsersController'
    })

    .state('userList', {
      url: '/utilisateur',
      resolve: {
        users: function (User) {
          return User.find();
        }
      },
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UsersController'
    })

    .state('userAccount', {
      url: '/utilisateur/:userId',
      resolve: {
        user: function ($stateParams, User) {
          return User.findOne($stateParams.userId);
        }
      },
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UsersController'
    });
  });
