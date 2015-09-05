'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('visite', {
      url: '/utilisateur/visite',
      templateUrl: 'modules/users/views/users.visite.html',
      controller: 'UserAccountController'
    })

    /*.state('userList', {
      url: '/utilisateur',
      resolve: {
        users: function (User) {
          return User.find();
        }
      },
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UsersListController'
    })*/

    .state('userAccount', {
      url: '/utilisateur',
      templateUrl: 'modules/users/views/users.account.html',
      controller: 'UserAccountController'
    })

    .state('contenus', {
      url: '/utilisateur/contenus',
      templateUrl: 'modules/users/views/users.contenus.html',
      controller: 'ContenusController'
    })

    .state('experience', {
      url: '/utilisateur/experience',
      templateUrl: 'modules/users/views/users.experience.html',
      controller: 'ExperienceController'
    })

    .state('activite', {
      url: '/utilisateur/activite',
      templateUrl: 'modules/users/views/users.activite.html',
      controller: 'ActiviteController'
    })

    .state('contribution', {
      url: '/utilisateur/contribution',
      templateUrl: 'modules/users/views/users.contribution.html',
      controller: 'ContributionController'
    })

    .state('contact', {
      url: '/utilisateur/contact',
      templateUrl: 'modules/users/views/users.contact.html',
      controller: 'ContactController'
    })

    .state('parameters', {
      url: '/utilisateur/parameters',
      templateUrl: 'modules/users/views/users.parameters.html',
      controller: 'ParametersController'
    });
  });
