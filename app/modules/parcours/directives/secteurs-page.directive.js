'use strict';

angular.module('parcours').directive('secteurPage',
  function (Piste) {
    return {
      restrict: 'E',
      scope: {
        secteur: '='
      },
      templateUrl: 'modules/parcours/views/secteurs.page.html',
      link: function (scope) {

        Piste.find({
          secteurId: scope.secteur._id
        }).then(function (pistes) {
          scope.pistes = pistes;
        });

      }
    };
  });
