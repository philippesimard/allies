'use strict';

angular.module('activites').config(
  function ($stateProvider) {

    $stateProvider.

    state('activite', {
      url: '/activite',
      templateUrl: 'modules/activites/views/activites.section.html',
      resolve: {
        activites: function (Activite) {
          return Activite.find();
        }
      },
      controller: function ($scope, activites) {
        $scope.activites = activites;
      }
    }).

    state('activite-fiche', {
      url: '/activite/:activiteId',
      resolve: {
        activite: function (Activite, $stateParams) {
          return Activite.findById($stateParams.activiteId);
        }
      },
      templateUrl: 'modules/activites/views/activite.fiche.html',
      controller: function ($scope, activite) {
        $scope.activite = activite;
      }
    });
  });
