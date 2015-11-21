'use strict';

angular.module('partenaires').config(
  function ($stateProvider) {

    $stateProvider.

    state('partenaire', {
      url: '/partenaires',
      templateUrl: 'modules/partenaires/views/partenaires.html',
      resolve: {
        partenaires: function (Partenaire) {
          return Partenaire.find();
        }
      },
      controller: function ($scope, partenaires) {
        $scope.partenaires = partenaires;
      }
    }).

    state('partenaire-fiche', {
      url: '/partenaire/:partenaireId',
      resolve: {
        partenaire: function (Partenaire, $stateParams) {
          return Partenaire.findById($stateParams.partenaireId);
        }
      },
      templateUrl: 'modules/partenaires/views/partenaire.fiche.html',
      controller: function ($scope, partenaire) {
        $scope.partenaire = partenaire;
      }
    });
  });
