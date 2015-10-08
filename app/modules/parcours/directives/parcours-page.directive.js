'use strict';

angular.module('parcours').directive('parcoursPage',
  function ($rootScope, Secteur, Piste, GrosBoutton) {
    return {
      restrict: 'E',
      scope: {
        parcours: '='
      },
      templateUrl: 'modules/parcours/views/parcours.page.html',
      link: function (scope) {

        if (scope.parcours.hasSectors) {
          Secteur.find({
            parcoursId: scope.parcours._id
          }).then(function (secteurs) {
            scope.secteurs = secteurs;
          });
        } else {
          Piste.find({
            parcoursId: scope.parcours._id
          }).then(function (pistes) {
            scope.pistes = pistes;
          });
        }

        $rootScope.$broadcast('grosButton:show', new GrosBoutton());
      }
    };
  });
