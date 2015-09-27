'use strict';

angular.module('core').service('es',
  function (esFactory) {
    return esFactory({
      host: 'localhost:9200',
    });
  });
