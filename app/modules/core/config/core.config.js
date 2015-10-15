'use strict';

angular.module('core').config(
  function ($httpProvider, MailerProvider, BACKEND) {

    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {

          if (!_.endsWith(config.url, '.html')) {
            var host = window.location.hostname,
              urlPrefix = '';

            if (_.contains(['localhost', '127.0.0.1'], host)) {
              urlPrefix = BACKEND;
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

    MailerProvider.config({
      url: 'mailer'
    });

  });

angular.module('core').run(
  function ($rootScope, $state) {
    $rootScope.$state = $state;
  });
