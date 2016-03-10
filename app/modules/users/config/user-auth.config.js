'use strict';

// Cette page permet d'ajouter des pages visibles sans être connecté //

angular.module('users').config(

  function (UserAuthProvider, CLIENT_URL) {
    console.log(CLIENT_URL + '/#!/reset_password');
    UserAuthProvider.config({

      userSchema: 'User',

      sendPasswordToken: {
        urlRedirection: CLIENT_URL + '/#!/reset_password',
      },

      confirmEmail: {
        urlRedirection: CLIENT_URL + '/#!/confirm_email',
      },

      apiRoot: '',

      loginStateName: 'login',

      authorizedRoutes: [
        'home',
        'userForm',
        'propos',
        'ressources',
        'partenaire',
        'partenaire-fiche',
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
        'activite-fiche',
        'lesparcours'
      ]
    });
  });
