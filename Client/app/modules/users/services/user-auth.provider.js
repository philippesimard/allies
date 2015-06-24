'use strict';

angular.module('users').provider('UserAuth',
  function () {

    var config;

    return {

      config: function (value) {
        config = value;
      },

      $get: ['$rootScope', '$q', '$http', '$window', function ($rootScope, $q, $http, $window) {

        function getToken() {
          var token = $window.sessionStorage.token;
          if (token) {
            return JSON.parse(token);
          }
          return null;
        }

        function isTokenValid() {
          var token = getToken();
          if (token) {
            return new Date(token.expiration) > new Date();
          }
          return false;
        }

        return {

          config: config,

          login: function (credentials) {

            return $http.post(config.apiUrls.signin, credentials)
              .then(function (response) {

                var user = response.data.user;

                $window.sessionStorage.token = JSON.stringify(response.data.token);
                $window.sessionStorage.user = JSON.stringify(user);

                $rootScope.$broadcast('UserAuth:login:success', user);

                return user;

              }).catch(function (response) {

                var deffered = $q.defer();

                var error;

                if (response.status === 0) {
                  error = 'noInternetConnection';

                } else if (response.status === 400) {
                  error = 'wrongUserNameOrPass';

                } else {
                  error = 'unknown';
                }

                $rootScope.$broadcast('UserAuth:login:error:' + error, response);
                deffered.reject(error);
                return deffered.promise;
              });
          },

          isAuthentified: function () {
            return isTokenValid();
          },

          logout: function () {
            $window.sessionStorage.clear();
            return $http.post(config.apiUrls.signout);

          }
        };
      }]
    };
  });
