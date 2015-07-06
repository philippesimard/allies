'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('userForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/users/views/users.form.html',
      controller: 'UsersAjoutController'
    })

    .state('userList', {
      url: '/utilisateur',
      resolve: {
        users: function (User) {
          return User.find();
        }
      },
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UsersListController'
    })

    .state('userAccount', {
      url: '/utilisateur/:userId',
      resolve: {
        user: function ($stateParams, User) {
          return User.findOne($stateParams.userId);
        }
      },
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UserAccountController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'modules/users/views/users.login.html',
      controller: 'LoginController'
    })

    .state('parameters', {
      url: '/utilisateur/parameters/:userId',
      resolve: {
        user: function ($stateParams, User) {
          return User.findOne($stateParams.userId);
        }
      },
      templateUrl: 'modules/users/views/users.parameters.html',
      controller: 'ParametersController'
    });
  });
