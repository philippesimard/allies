'use strict';

angular.module('ressources').config(function (PrePostProvider) {

  PrePostProvider.config({
    pre: {
      allowedOperations: ['return', 'caching', 'create', 'update', 'destroy']
    },
    post: {
      allowedOperations: ['create', 'update', 'destroy']
    }
  });
});
