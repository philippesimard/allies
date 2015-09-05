'use strict';

angular.module('users').factory('Niveau',
  function (Schema) {

    var Niveau = new Schema('niveau');

    Niveau.prototype.toString = function () {
      return this.description;
    };

    return Niveau;

  });
