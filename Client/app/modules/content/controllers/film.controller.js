'use strict';

angular.module('content').controller('FilmController',
  function ($scope, films, niveaux) {

    $scope.films = films;
    $scope.niveaux = niveaux;

    $scope.filterFilm = function (prop, value) {
      if (!prop || !value) {
        $scope.films = films;
        return;
      }

      $scope.films = _.filter(films, function (film) {
        return film[prop] === value._id;
      });
    };
  });
