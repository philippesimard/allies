'use strict';

angular.module('users').controller('ExperienceController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.parameters = function () {
      $state.go('contenus', {
        userId: user._id
      });
    };

  });
