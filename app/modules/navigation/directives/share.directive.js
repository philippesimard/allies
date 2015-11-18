'use strict';

angular.module('navigation-module').directive('partager',
  function (SocialShareKitService, $timeout) {

    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/share.html',
      link: function (scope) {
        SocialShareKitService.init();

        // Timeout pour rêgler un glicth lors de l'initialization
        $timeout(function() {
        	scope.showSocialKit = true;
        })
      }
    };

  });
