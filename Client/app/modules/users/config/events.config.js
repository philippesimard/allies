'use strict';

// Cette page permet d'ajouter des pages visibles sans être connecté //

angular.module('users').run(

  function ($rootScope, $state, MaterializeService) {

    var toastDelay = 3000;

    $rootScope.$on('UserAuth:signup:success', function () {
      $state.go('home');
      MaterializeService.toast('Un courriel de confirmation vous a été envoyé');
    });

    /*$rootScope.$on('UserAuth:signup:fail', function($event, reason) {

    });*/

    $rootScope.$on('UserAuth:signin:success', function (event, user) {
      MaterializeService.toast('Bonjour ' + user.toString(), toastDelay);
      $state.go('userAccount', {
        userId: user._id
      });
    });

    $rootScope.$on('UserAuth:signin:fail', function (event, error) {
      console.log(error);

      var message;

      switch (error.code) {
      case 'BadCredentials':
        message = 'Erreur identifiant ou mot de passe';
        break;
      case 'EmailNonConfirmed':
        message = 'Votre courriel n\'a pas été confirmé';
        break;
      }

      MaterializeService.toast(message, toastDelay);
    });

  });
