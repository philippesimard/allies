'use strict';

angular.module('medias').directive('mediaFilters',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/medias/views/media.filters.html'
    };
  });
