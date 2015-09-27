'use strict';

angular.module('core').provider('Mailer',
  function () {

    var config = {};

    return {

      config: function (value) {
        _.extend(config, value);
      },

      $get: function ($http) {

        return {
          send: function (message) {
            return $http.post(config.url, message);
          }
        };
      }
    };
  });
