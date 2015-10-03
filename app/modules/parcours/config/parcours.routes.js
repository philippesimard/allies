'use strict';

angular.module('core').config(
  function ($stateProvider) {

    $stateProvider

      .state('parcours', {
      url: '/parcours',
      template: '<parcours-preview parcours="parcours" ng-repeat="parcours in allParcours | orderBy:\'position\'"></parcours-preview>',
      resolve: {
        allParcours: function (Parcours) {
          return Parcours.find();
        }
      },
      controller: function ($scope, allParcours) {
        $scope.allParcours = allParcours;
      }
    })

    .state('parcours-page', {
      url: '/parcours/:parcoursName',
      template: '<parcours-page parcours="parcours"></parcours-page>',
      resolve: {
        parcours: function (Parcours, $stateParams) {
          return Parcours.find({
            shortName: $stateParams.parcoursName
          });
        }
      },
      controller: function ($scope, parcours) {
        $scope.parcours = parcours[0];
      }
    })

    .state('secteur-page', {
      url: '/secteurs/:secteurName',
      template: '<secteur-page secteur="secteur"></secteur-page>',
      resolve: {
        secteurs: function (Secteur, $stateParams) {
          return Secteur.find({
            shortName: $stateParams.secteurName
          });
        }
      },
      controller: function ($scope, secteurs) {
        $scope.secteur = secteurs[0];
      }
    })

    .state('piste-page', {
      url: '/pistes/:pisteName',
      template: '<piste-page piste="piste"></piste-page>',
      resolve: {
        pistes: function (Piste, $stateParams) {
          return Piste.find({
            shortName: $stateParams.pisteName
          });
        }
      },
      controller: function ($scope, pistes) {
        $scope.piste = pistes[0];
      }
    });
  });
