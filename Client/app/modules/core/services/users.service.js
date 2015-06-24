'use strict';

angular.module('core').service('UserService',
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
