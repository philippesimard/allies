'use strict';

angular.module('piste').factory('Badge',
  function (Schema) {

    var Badge = new Schema('badge');

    Badge.prototype.toString = function () {
      return this.name;
    };

    return Badge;

  });
