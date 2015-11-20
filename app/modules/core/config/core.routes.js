'use strict';

angular.module('core').config(
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.html',
      controller: function ($scope, $state, Parcours) {
        Parcours.find().then(function (allParcours) {
          $scope.allParcours = allParcours;
          $scope.goToParcours = function (parcours) {
            $state.go('parcours-page', {
              parcoursName: parcours.shortName
            });
          };
        });
      }
    })

    .state('homecontact', {
      url: '/contact',
      templateUrl: 'modules/core/views/contact.html',
      controller: 'ContactController'
    })

    .state('propos', {
      url: '/propos',
      templateUrl: 'modules/core/views/propos.html',
      controller: 'ProposController',
      data: {
        breadcrumb: 'Home',
      }
    });
  });
