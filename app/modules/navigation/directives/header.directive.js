'use strict';

angular.module('core').directive('header',
  function (UserAuth, $window, $state, $rootScope, Parcours, MediaSection) {

    return {

      templateUrl: 'modules/navigation/views/header.html',
      link: function (scope) {

        Parcours.find().then(function (parcours) {
          scope.allParcours = parcours;
        });

        MediaSection.find().then(function (mediaSections) {
          scope.mediaSections = mediaSections;
        });


        scope.goToParcours = function (parcours) {
          $state.go('parcours-page', {
            parcoursName: parcours.shortName
          });
        };

        scope.goToMediaSection = function (mediaSection) {
          $state.go('media-section', {
            mediaSectionName: section.shortName
          });
        };

        scope.isConnected = $rootScope.currentUser.isAuthentified();

        $rootScope.$on('$stateChangeSuccess',
          function () {
            scope.isConnected = $rootScope.currentUser.isAuthentified();
          });

        scope.deconnect = function () {
          UserAuth.signout().then(function () {
            $state.go('home');
          });
        };

        scope.monCompte = function () {
          $state.go('userAccount');
        };
      }
    };
  });
