'use strict';

angular.module('content').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('film', {
      url: '/contenus/film',
      resolve: {
        films: function (Film) {
          return Film.find();
        },
        niveaux: function (Niveau) {
          return Niveau.find();
        }
      },
      templateUrl: 'modules/content/views/film.html',
      controller: 'FilmController'
    })

    .state('boiteagir', {
      url: '/parcours/boite/agirquotidien',
      templateUrl: 'modules/content/parcours/boite/agirquotidien.html',
      controller: 'ContentController'
    })

    //Page d'accueil des différentes catégories de parcours

    .state('homesante', {
      url: '/parcours/sante',
      templateUrl: 'modules/content/parcours/sante/home.html',
      controller: 'ContentController'
    })

    .state('homescolaire', {
      url: '/parcours/scolaire',
      templateUrl: 'modules/content/parcours/scolaire/home.html',
      controller: 'ContentController'
    })

    .state('homecommunautaire', {
      url: '/parcours/communautaire',
      templateUrl: 'modules/content/parcours/communautaire/home.html',
      controller: 'ContentController'
    })

    // Fin 

    .state('livre', {
      url: '/contenus/livre',
      templateUrl: 'modules/content/views/livre.html',
      controller: 'LivreController'
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
