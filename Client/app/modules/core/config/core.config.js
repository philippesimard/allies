'use strict';

angular.module('core').config(
  function ($httpProvider) {

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {

          if (!_.endsWith(config.url, '.html')) {
            var host = window.location.hostname,
              urlPrefix = '';

            if (_.contains(['localhost', '127.0.0.1'], host)) {
              urlPrefix = 'http://localhost:9001';
            } else if (typeof cordova !== 'undefined' || typeof phonegap !== 'undefined') {} else {
              urlPrefix = 'http://' + host;
            }

            var route = config.url.split('/')[config.url.split('/').length - 2];

            if (!_.contains(['img', 'icons', '/'], route)) {
              urlPrefix += '/api/v1';
              config.url = urlPrefix + '/' + config.url;
            }

          }
          return config;
        }
      };
    });
  });

angular.module('core').run(
  function ($rootScope, $state) {
    $rootScope.$state = $state;
  });
