'use strict';

angular.module('users').controller('ContenusController',
  function ($rootScope, $scope) {

    $scope.savedThings = [{
      title: 'Medias',
      color: 'blue',
      icon: 'movie',
      things: $rootScope.currentUser.favorites.media || [],
      show: function (things) {
        $scope.medias = things;
      }
    }, {
      title: 'Pistes',
      color: 'pink',
      icon: 'link',
      things: $rootScope.currentUser.favorites.piste || [],
      show: function (things) {
        $scope.pistes = things;
      }
    }];

    $scope.show = function (savedThing) {
      $scope.medias = undefined;
      $scope.pistes = undefined;
      _.forEach($scope.savedThings, function (thing) {
        if (thing === savedThing) {
          thing.active = true;
        } else {
          thing.active = false;
        }
      });
      savedThing.show(savedThing.things);
    };

    $scope.show($scope.savedThings[0]);

  });
