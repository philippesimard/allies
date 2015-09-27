'use strict';

angular.module('help').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('signaler', {
      url: '/aide/signaler',
      templateUrl: 'modules/help/views/signaler.html',
      controller: 'SignalerController'
    })

    .state('aidecheminement', {
      url: '/aide/cheminement',
      templateUrl: 'modules/help/views/cheminement.html',
      controller: 'AideController'
    })

    .state('aideutilisateur', {
      url: '/aide/utilisateur',
      templateUrl: 'modules/help/views/utilisateur.html',
      controller: 'AideController'
    })

    .state('aidecondition', {
      url: '/aide/condition',
      templateUrl: 'modules/help/views/condition.html',
      controller: 'AideController'
    })

    .state('aidevisite', {
      url: '/aide/visite',
      templateUrl: 'modules/help/views/visite.html',
      controller: 'AideController'
    })

    .state('aide', {
      url: '/aide',
      templateUrl: 'modules/help/views/help.index.html',
      controller: 'AideController'
    });
  });
