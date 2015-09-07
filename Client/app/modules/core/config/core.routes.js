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

    // Parcours ici

    .state('boite', {
      url: '/parcours/boite',
      templateUrl: 'modules/core/views/boite.html',
      controller: 'ParcoursController'
    })

    .state('sante', {
      url: '/parcours/sante',
      templateUrl: 'modules/core/views/sante.html',
      controller: 'ParcoursController'
    })

    .state('communautaire', {
      url: '/parcours/communautaire',
      templateUrl: 'modules/core/views/communautaire.html',
      controller: 'ParcoursController'
    })

    .state('scolaire', {
      url: '/parcours/scolaire',
      templateUrl: 'modules/core/views/scolaire.html',
      controller: 'ParcoursController'
    })

    .state('propos', {
      url: '/propos',
      templateUrl: 'modules/core/views/propos.html',
      controller: 'ProposController'
    });
  });
