'use strict';

angular.module('users').controller('ParametersController',
  function ($rootScope, $scope, user) {

    $scope.user = user;

    $scope.modifyUser = function (userForm, user) {

      if (userForm.$valid) {

        user.update().then(function (updatedUser) {

          $scope.user = updatedUser;

          $rootScope.$broadcast('User:changeInfos:success', updatedUser);

          // Étant donné qu'on ne change pas de page, on reset les propriétés du formulaire
          userForm.$setPristine();
        });
      }
    };

  });
