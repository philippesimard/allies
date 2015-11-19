'use strict';

// Cette page permet d'ajouter des pages visibles sans être connecté //

angular.module('users').run(

  function ($rootScope, $state, MaterializeService) {

    var toastDelay = 3000;

    $rootScope.$on('UserAuth:signup:success', function () {
      $state.go('home');
      MaterializeService.toast('Un courriel de confirmation vous a été envoyé', toastDelay);
    });

    $rootScope.$on('UserAuth:signup:fail', function ($event, error) {
      var message;

      switch (error.code) {
      case 'UserExists':
        message = 'Courriel existant, vous avez oublié votre mot de passe?';
        break;
      default:
        message = error.code + ' : ' + error.message;
      }

      MaterializeService.toast(message, toastDelay);

    });

    $rootScope.$on('UserAuth:signin:success', function (event, user) {
      MaterializeService.toast('Bonjour ' + user.toString(), toastDelay);
      $state.go('userAccount');
    });

    $rootScope.$on('UserAuth:sendPasswordToken:success', function () {
      MaterializeService.toast('Un courriel de réinitialisation à été envoyé', toastDelay);
    });

    $rootScope.$on('UserAuth:sendPasswordToken:fail', function ($event, error) {
      var message;

      switch (error.code) {
      case 'NonExistantUser':
        message = 'Courriel inexistant';
        break;
      default:
        message = error.code + ' : ' + error.message;
      }

      MaterializeService.toast(message, toastDelay);
    });

    $rootScope.$on('UserAuth:signin:fail', function (event, error) {

      var message;

      switch (error.code) {
      case 'BadCredentials':
        message = 'Erreur identifiant ou mot de passe';
        break;
      case 'EmailNonConfirmed':
        message = 'Votre courriel n\'a pas été confirmé';
        break;
      default:
        message = error.code + ' : ' + error.message;
      }

      MaterializeService.toast(message, toastDelay);
    });

    $rootScope.$on('User:changeInfos:success', function () {
      MaterializeService.toast('Informations mises à jour', toastDelay);
    });

  });
