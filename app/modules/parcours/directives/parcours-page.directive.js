'use strict';

angular.module('parcours').directive('parcoursPage',
  function ($rootScope, Secteur, GrosBoutton) {
    return {
      restrict: 'E',
      scope: {
        parcours: '='
      },
      templateUrl: 'modules/parcours/views/parcours.page.html',
      link: function (scope) {

        Secteur.find({
          parcoursId: scope.parcours._id
        }).then(function (secteurs) {
          scope.secteurs = secteurs;
        });

        $rootScope.$broadcast('grosButton:show', new GrosBoutton());
      }
    };
  });
