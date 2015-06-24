'use strict';

angular.module('users').config(

function ($httpProvider) {

    $httpProvider.interceptors.push(
      function ($q, $window, $rootScope) {
        return {

          request: function (config) {
            config.headers = config.headers || {};
            var token = $window.sessionStorage.token;
            if (token) {
              config.headers.Authorization = 'Bearer ' + JSON.parse(token).id;
            }
            return config;
          },

          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              $rootScope.$broadcast('IAMUserAuth:request:unauthorized', rejection);
              break;
            }

            return $q.reject(rejection);
          }
        };
      }
    );
  });

angular.module('users').run(

  function ($rootScope, UserAuth, $state, $location) {

    function goToLogin(toParams) {
      $state.go(UserAuth.config.loginStateName, toParams);
    }

    function autoLogin(toState, toParams) {
      UserAuth.login(UserAuth.config.autoLogin).then(function () {
        if (toState.name === UserAuth.config.loginStateName) {
          $location.path('/');
        } else {
          $state.go(toState.name, toParams);
        }
      });
    }

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams) {

        if (!UserAuth.isAuthentified()) {

          if (UserAuth.config.autoLogin) {
            event.preventDefault();
            autoLogin(toState, toParams);

          } else if (UserAuth.config.loginStateName && toState.name !== UserAuth.config.loginStateName) {
            event.preventDefault();
            goToLogin(toParams);
          }
        }
      });
  });
