'use strict';

angular.module('activites').directive('activitesGalerie',
  function () {
    return {
      restrict: 'E',
      scope: {
        activites: '=',
        activitesPerRow: '@',
        maxRows: '@',
        showFilters: '='
      },
      templateUrl: 'modules/activites/views/activites.galerie.html',
      link: function (scope) {

        if (scope.maxRows) {
          var nbActivites = scope.activitesPerRow * scope.maxRows;
          scope.activites = scope.activites.length < nbActivites ? scope.activites : scope.activites.slice(0, nbActivites);
        }

        scope.cardLength = 100 / scope.activitesPerRow + '%';
      }
    };
  });
