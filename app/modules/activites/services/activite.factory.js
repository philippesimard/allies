'use strict';

angular.module('activites').factory('Activite',
  function (Schema) {

    var Activite = new Schema('activite');

    Activite.prototype.toString = function () {
      return this.name;
    };

    Activite.post('find', function (next) {
      if (!_.startsWith(this.img, 'http')) {
        this.img = 'img/' + this.img;
      }
      next();
    });

    return Activite;

  });
