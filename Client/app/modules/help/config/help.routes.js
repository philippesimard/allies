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

    .state('aide', {
      url: '/aide',
      templateUrl: 'modules/help/views/help.index.html',
      controller: 'AideController'
    });
  });
