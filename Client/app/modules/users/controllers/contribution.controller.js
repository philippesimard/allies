'use strict';

angular.module('users').controller('ContributionController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.parameters = function () {
      $state.go('contribution', {
        userId: user._id
      });
    };

  });
