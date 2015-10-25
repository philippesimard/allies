'use strict';

angular.module('piste').directive('badge',
  function(Badge) {
    return {
      restrict: 'E',
      scope: {
        badgeId: '='
      },
      templateUrl: 'modules/pistes/views/badge.html',
      link: function(scope, element) {
        Badge.findById(scope.badgeId).then(function(badge) {
          
          var img = new Image();
          
          img.src = badge.img;

          img.onload = function() {
            scope.badge = badge;
            scope.$apply();
          };
        });
      }
    };
  });