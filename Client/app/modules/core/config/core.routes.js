'use strict';

angular.module('core').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.html',
      controller: 'HomeController'
    })

    .state('propos', {
      url: '/propos',
      templateUrl: 'modules/core/views/propos.html',
      controller: 'ProposController'
    })

    .state('usersForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/core/views/users.form.html',
      controller: 'UsersController'
    });
  });
