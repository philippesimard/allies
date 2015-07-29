'use strict';

module.service('client', function (esFactory) {
  return esFactory({
    host: 'localhost:9200',
  });
});
