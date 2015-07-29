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

    .state('recherche', {
      url: '/recherche',
      templateUrl: 'modules/core/views/recherche.html',
      controller: 'RechercheController'
    })

    .state('parcours', {
      url: '/parcours',
      templateUrl: 'modules/core/views/parcours.html',
      controller: 'HomeController'
    })

    .state('ressources', {
      url: '/ressources',
      templateUrl: 'modules/core/views/ressources.html',
      controller: 'HomeController'
    })

    .state('propos', {
      url: '/propos',
      templateUrl: 'modules/core/views/propos.html',
      controller: 'ProposController'
    });
  });
