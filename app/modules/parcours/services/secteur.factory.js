'use strict';

angular.module('parcours').factory('Secteur',
  function (Schema) {

    var Secteur = new Schema('secteur');

    Secteur.prototype.toString = function () {
      return this.name;
    };

    return Secteur;

  });
