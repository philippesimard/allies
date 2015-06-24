'use strict';

angular.module('users').service('UserService',
  function () {

    var users = [];

    return {

      getUsers: function () {
        return users;
      },

      addUser: function (user) {
        users.push(user);
      }
    };
  });
