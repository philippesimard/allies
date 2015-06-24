'use strict';

angular.module('users').factory('User',
  function (Ressource) {

    return new Ressource({
      api: 'user'
    });
  });
