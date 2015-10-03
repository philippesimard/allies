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

    .state('homecontact', {
      url: '/contact',
      templateUrl: 'modules/core/views/contact.html',
      controller: 'ContactController'
    })

    .state('recherche', {
      url: '/recherche',
      templateUrl: 'modules/core/views/recherche.html',
      controller: 'RechercheController'
    })

    .state('propos', {
      url: '/propos',
      templateUrl: 'modules/core/views/propos.html',
      controller: 'ProposController'
    });
  });
