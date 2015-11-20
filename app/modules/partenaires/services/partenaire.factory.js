'use strict';

angular.module('partenaires').factory('Partenaire',
  function (Schema) {

    var Partenaire = new Schema('partenaire');

    Partenaire.prototype.toString = function () {
      return this.name;
    };

    Partenaire.post('find', function (next) {
      if (!_.startsWith(this.img, 'http')) {
        this.img = 'img/partenaires/' + this.img;
      }
      next();
    });

    return Partenaire;
  });
