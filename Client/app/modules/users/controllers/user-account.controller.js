'use strict';

angular.module('users').controller('UserAccountController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.parameters = function () {
      $state.go('parameters', {
        userId: user._id
      });
    };

  });
