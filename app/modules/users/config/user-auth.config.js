'use strict';

// Cette page permet d'ajouter des pages visibles sans être connecté //

angular.module('users').config(

  function (UserAuthProvider) {

    UserAuthProvider.config({

      userSchema: 'User',

      sendPasswordToken: {
        urlRedirection: 'http://localhost:9000/#!/reset_password',
      },

      confirmEmail: {
        urlRedirection: 'http://localhost:9000/#!/confirm_email',
      },

      apiRoot: '',

      loginStateName: 'login',

      authorizedRoutes: [
        'home',
        'userForm',
        'propos',
        'ressources',
        'media-section',
        'media-fiche',
        'parcours',
        'parcours-page',
        'secteur-page',
        'piste-page',
        'recherche',
        'aide',
        'scolaire',
        'sante',
        'communautaire',
        'boite',
        'homesante',
        'homescolaire',
        'homecommunautaire',
        'livre',
        'document',
        'film',
        'bd',
        'roman',
        'confirm_email',
        'homecontact',
        'reset_password',
        'activite',
        'activite-fiche'
      ]
    });
  });
