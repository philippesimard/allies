'use strict';

angular.module('parcours').factory('Parcours',
  function (Schema) {

    var Parcours = new Schema('parcours');

    Parcours.prototype.toString = function () {
      return this.name;
    };

    return Parcours;

  });
