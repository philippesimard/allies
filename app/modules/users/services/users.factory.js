'use strict';

angular.module('users').factory('User',
  function (Schema) {

    var User = new Schema('user');

    User.prototype.toString = function () {
      return this.firstname + ' ' + this.lastname;
    };

    return User;
  });
