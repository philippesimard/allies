'use strict';

angular.module('core').directive('header',
  function (UserAuth, $window, $state, $timeout, $rootScope, Parcours, MediaSection, MaterializeService) {

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

        $timeout(function () {
          scope.isActive = function (menuItemName) {
            if (menuItemName === 'parcours') {
              return _.contains(['parcours', 'parcours-page', 'secteur-page', 'piste-page'], $state.current.name);
            } else if (menuItemName === 'ressources') {
              return _.contains(['ressources', 'media-section', 'media-fiche'], $state.current.name);
            } else {
              return menuItemName === $state.current.name;
            }
          };
        });

        scope.goToMediaSection = function (mediaSection) {
          $state.go('media-section', {
            mediaSectionName: mediaSection.shortName
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
            MaterializeService.toast('À très bientôt!', 3000);
          });
        };

        scope.monCompte = function () {
          $state.go('userAccount');
        };
      }
    };
  });
