'use strict';

angular.module('users').factory('Film',
  function (Schema) {

    var Film = new Schema('film');

    Film.post('find', function (next) {
      this.imgUrl = 'images/' + this.img;
      next();
    });

    return Film;

  });
