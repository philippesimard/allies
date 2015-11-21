'use strict';

angular.module('partenaires').directive('partenairesGalerie',
  function () {
    return {
      restrict: 'E',
      scope: {
        partenaires: '='
      },
      templateUrl: 'modules/partenaires/views/partenaires-galerie.html'
    };
  });
