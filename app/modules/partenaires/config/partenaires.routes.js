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
    });
  });
