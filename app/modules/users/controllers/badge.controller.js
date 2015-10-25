'use strict';

angular.module('users').controller('BadgeController',
  function ($rootScope, $scope) {
    $scope.badgeIds = $rootScope.currentUser.getBadgeIds();
  });
