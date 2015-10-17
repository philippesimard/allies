'use strict';

angular.module('parcours').factory('Piste',
  function (Schema) {

    var Piste = new Schema('piste');

    Piste.prototype.toString = function () {
      return this.name;
    };

    return Piste;

  });
