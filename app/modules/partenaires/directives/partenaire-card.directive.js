'use strict';

angular.module('partenaires').directive('partenaireCard',
  function ($state) {
    return {
      restrict: 'E',
      scope: {
        partenaire: '='
      },
      replace: true,
      templateUrl: 'modules/partenaires/views/partenaire.card.html',
      link: function (scope) {

        scope.$watch('partenaire', function (A) {
          console.log(A);
        });

        scope.goToPartenaire = function (partenaire) {
          $state.go('partenaire-fiche', {
            partenaireId: partenaire._id
          });
        };
      }
    };
  });
