'use strict';

angular.module('users').controller('LoginController',
  function ($scope, $rootScope, $state, MaterializeService) {

    $rootScope.$on('UserAuth:signin:success', function (event, user) {
      MaterializeService.toast('Vous êtes maintenant connecté', 3000);
      $state.go('userAccount', {
        userId: user._id
      });
    });

    $rootScope.$on('UserAuth:signin:fail', function () {

      MaterializeService.toast('Erreur identifiant ou mot de passe', 3000);
      $scope.showErrors = false;
      $scope.loginInfo.password = undefined;
    });

  });
