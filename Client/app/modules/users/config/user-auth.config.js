'use strict';

// Cette page permet d'ajouter des pages visibles sans être connecté //

angular.module('users').config(

  function (UserAuthProvider) {

    UserAuthProvider.config({

      sendPasswordToken: {
        urlRedirection: 'http://localhost:9000/#!/reset_password',
      },
      confirmEmail: {
        urlRedirection: 'http://localhost:9000/#!/confirm_email',
      },
      apiRoot: ''
    });
  });

angular.module('users').run(

  function ($rootScope, UserAuth, $state) {

    var config = {
      loginStateName: 'login',
      authorizedRoutes: ['home', 'userForm', 'propos', 'ressources', 'parcours', 'recherche']
    };

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams) {

        if (!UserAuth.isAuthentified()) {

          if (UserAuth.config.loginStateName && !_.contains(config.authorizedRoutes, toState.name)) {
            event.preventDefault();
            $state.go(config.loginStateName, toParams);
          }
        }
      });
  });
