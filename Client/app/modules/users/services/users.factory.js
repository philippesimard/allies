'use strict';

angular.module('users').factory('User',
  function (Ressource) {

    var User = new Ressource({
      api: 'user'
    });

    User.pre('return', function (user) {
      user.toString = function () {
        return user.firstname + ' ' + user.lastname;
      };
      return user;
    });

    return User;
  });
