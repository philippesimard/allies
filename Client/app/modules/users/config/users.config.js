'use strict';

angular.module('users').config(
  function (UserAuthProvider) {
    UserAuthProvider.config({
      apiUrls: {
        signin: 'auth/signin',
        signout: 'auth/signout'
      },
      loginStateName: 'login'
    });
  });
