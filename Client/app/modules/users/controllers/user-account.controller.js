'use strict';

angular.module('users').controller('UserAccountController',
  function ($scope, $state, user) {

    $scope.user = user;

    $scope.contenus = function () {
      $state.go('contenus', {
        userId: user._id
      });
    };

    $scope.experience = function () {
      $state.go('experience', {
        userId: user._id
      });
    };

    $scope.activite = function () {
      $state.go('activite', {
        userId: user._id
      });
    };

    $scope.contribution = function () {
      $state.go('contribution', {
        userId: user._id
      });
    };

    $scope.contact = function () {
      $state.go('contact', {
        userId: user._id
      });
    };

    $scope.parameters = function () {
      $state.go('parameters', {
        userId: user._id
      });
    };

    $scope.visite = function () {
      $state.go('visite', {
        userId: user._id
      });
    };

  });
