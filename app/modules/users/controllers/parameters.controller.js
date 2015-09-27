'use strict';

angular.module('users').controller('ParametersController',
  function ($rootScope, $scope) {

    $scope.modifyUser = function (userForm) {

      if (userForm.$valid) {

        $rootScope.currentUser.save().then(function (updatedUser) {

          $rootScope.$broadcast('User:changeInfos:success', updatedUser);

          // Étant donné qu'on ne change pas de page, on reset les propriétés du formulaire
          userForm.$setPristine();
        });
      }
    };

  });
