'use strict';

angular.module('users').factory('Film',
  function (Schema) {

    var Film = new Schema('film');

    /*
    Film.create({
      name: 'La belle saison',
      synopsis: 'Delphine, fille de paysans, monte à Paris pour s’émanciper du carcan familial et gagner son indépendance financière. Carole est parisienne. En couple avec Manuel, elle vit activement les débuts du féminisme. Lorsque Delphine et Carole se rencontrent, leur histoire d’amour fait basculer leurs vies.',
      realisateur: 'Catherine Corsini',
      niveau: '55eb5d604c85b5f824ad9518',
      annee: '2015',
      dureeMins: '105',
      img: 'film/saison.jpg',

    });
*/

    Film.post('find', function (next) {
      this.imgUrl = 'images/' + this.img;
      next();
    });

    return Film;

  });
