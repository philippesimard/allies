'use strict';

angular.module('content').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('film', {
      url: '/contenus/film',
      templateUrl: 'modules/content/views/film.html',
      controller: 'FilmController'
    })

    .state('livre', {
      url: '/contenus/livre',
      templateUrl: 'modules/content/views/livre.html',
      controller: 'ContentController'
    })

    .state('bd', {
      url: '/contenus/bd',
      templateUrl: 'modules/content/views/bd.html',
      controller: 'ContentController'
    })

    .state('document', {
      url: '/contenus/document',
      templateUrl: 'modules/content/views/document.html',
      controller: 'ContentController'
    })

    .state('roman', {
      url: '/contenus/roman',
      templateUrl: 'modules/content/views/roman.html',
      controller: 'ContentController'
    })

    .state('autre', {
      url: '/contenus/autre',
      templateUrl: 'modules/content/views/autre.html',
      controller: 'ContentController'
    });
  });
