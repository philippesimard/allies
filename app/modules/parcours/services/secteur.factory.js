'use strict';

angular.module('parcours').factory('Secteur',
  function (Schema) {

    var Secteur = new Schema('secteur');

    Secteur.create({
      name: 'Agir au quotidien',
      shortName: 'boite_base_commencer',
      parcoursId: '56100d690faa06e41fd0b8db',
    });

    Secteur.prototype.toString = function () {
      return this.name;
    };

    return Secteur;

  });
