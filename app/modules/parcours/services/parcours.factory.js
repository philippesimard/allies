'use strict';

angular.module('parcours').factory('Parcours',
  function (Schema) {

    var Parcours = new Schema('parcours');

    /*Parcours.create({
       name: 'Santé',
       shortName: 'sante',
       description: 'Cette boite à outils de base s\'adresse à quiconque souhaite inclure la diversité sexuelle et de genre au quotidien.',
       img: 'http://acommealliees.ca/data/img/parcours/education.jpg',
     });*/

    Parcours.prototype.toString = function () {
      return this.name;
    };

    return Parcours;

  });
