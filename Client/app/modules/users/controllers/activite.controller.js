'use strict';

angular.module('users').controller('ActiviteController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.parameters = function () {
      $state.go('activite', {
        userId: user._id
      });
    };

  });
