'use strict';

angular.module('core').controller('ActivitesController',
  function ($scope, activites) {
    $scope.activites = activites;
  });
