'use strict';

angular.module('users').config(
  function ($stateProvider) {

    $stateProvider

      .state('userForm', {
      url: '/utilisateur/ajout',
      templateUrl: 'modules/users/views/users.form.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'modules/users/views/users.login.html'
    })

    .state('confirm_email', {
      url: '/confirm_email/:tokenId',
      templateUrl: 'modules/users/views/users.email-confirm.html',
      controller: function ($scope, UserAuth) {
        UserAuth.confirmEmail().then(function () {
          $scope.emailConfirmed = true;
        }).catch(function () {
          $scope.emailConfirmed = false;
        });
      }
    })

    .state('reset_password', {
      url: '/reset_password/:tokenId',
      templateUrl: 'modules/users/views/users.email-reinit.html',
      controller: function ($scope, UserAuth) {
        $scope.passwordChanged = false;
        $scope.changePassword = function (passwordForm, newPassword) {
          if (passwordForm.$valid) {
            UserAuth.changePassword(newPassword).then(function () {
              $scope.passwordChanged = true;
            });
          }
        };
      }
    });
  });
