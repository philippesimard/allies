'use strict';

angular.module('partenaires').config(
  function ($stateProvider) {

    $stateProvider.

    state('partenaire', {
      url: '/partenaires',
      templateUrl: 'modules/partenaires/views/partenaires.html',
      resolve: {
        partenairesCommunautaures: function (Partenaire) {
          return Partenaire.find('communautaire');
        }
      },
      controller: function ($scope, partenairesCommunautaures) {
        $scope.partenairesCommunautaures = partenairesCommunautaures;
      }
    });
  });
