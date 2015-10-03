'use strict';

angular.module('parcours').factory('Piste',
  function (Schema) {

    var Piste = new Schema('piste');

    /*Piste.create({
      name: 'Agir au quotidien',
      shortName: 'communautaire_direction_agir',
      secteurId: '56102af927a06b180446aa28',
    });*/

    Piste.prototype.toString = function () {
      return this.name;
    };

    return Piste;

  });
