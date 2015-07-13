'use strict';

angular.module('users').controller('ContactController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.parameters = function () {
      $state.go('contact', {
        userId: user._id
      });
    };

  });
