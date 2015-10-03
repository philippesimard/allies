'use strict';

angular.module('parcours').directive('secteurList',
  function ($state) {
    return {
      restrict: 'E',
      templateUrl: 'modules/parcours/views/secteurs.list.html',
      link: function (scope) {

        scope.toToSecteur = function (secteur) {
          $state.go('secteur-page', {
            secteurName: secteur.shortName
          });
        };
      }
    };
  });
