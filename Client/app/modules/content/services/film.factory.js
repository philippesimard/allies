'use strict';

angular.module('users').factory('Film',
  function (Schema) {

    var Film = new Schema('film');

    /* Creer nouveau film
    Film.create({
      nom: 'nom',
      synopsis: 'synopsis'
      niveau: '343fkf3049244jf'
    });
  
    */

    Film.post('find', function (next) {
      this.imgUrl = 'images/' + this.img;
      next();
    });

    return Film;

  });
