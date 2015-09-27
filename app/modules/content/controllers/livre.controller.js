'use strict';

angular.module('content').controller('LivreController',
  function ($scope)

  {

    $scope.livrelist = [{
      'name': 'Violette',
      'synopsis': 'Violette Leduc, née bâtarde au début du siècle dernier, rencontre Simone de Beauvoir dans les années d’après-guerre à St-Germain-des-Prés. Commence une relation intense entre les deux femmes qui va durer toute leur vie, relation basée sur la quête de la liberté par l’écriture pour Violette et la conviction pour Simone d’avoir entre les mains le destin d’un écrivain hors norme.',
      'realisateur': 'Martin Provost',
      'niveau': 'Secondaires 3 à 5 et Cégep',
      'date': '2013',
      'dure': '140 min',
      'img': 'img/film/violette.jpg',

    }, {
      'name': 'Brokeback',
      'synopsis': 'Deux jeunes cow-boys, Jack et Ennis, sont engagés pour garder ensemble un troupeau de moutons à Brokeback Mountain.Isolés au milieu d’une nature sauvage, ils voient leur complicité se transformer lentement en une attirance aussi irrésistible qu’inattendue. ',
      'realisateur': 'Ang Lee',
      'niveau': 'Secondaires 3 à 5 et Cégep',
      'date': '2005',
      'dure': '134 min',
      'img': 'img/film/brokeback.jpg',

    }, {
      'name': 'Un film de cow-boy',
      'synopsis': 'Brokeback Mountain est passé hier soir à la télé. Vincent l’a vu et ça l’a bouleversé. Il profite de la récréation et de l’intimité des toilettes du collège pour raconter, de manière touchante et naïve, le film à Moussa. De l’autre côté du mur, dans les toilettes des filles, Jessica, elle aussi très affectée, en profite pour poser pas mal de questions sur le papa homosexuel de Nadia.',
      'realisateur': 'Benjamin Parent',
      'niveau': 'Secondaires 3 à 5 et Cégep',
      'date': '2012',
      'dure': '12 min',
      'img': 'img/film/pasfilm.jpg',

    }, {
      'name': 'Au premier regard',
      'synopsis': 'C’est la fin de l’été à São Paulo. Leonardo, 15 ans, est aveugle. Il aimerait être plus indépendant, étudier à l’étranger, mais aussi tomber amoureux. Un jour, Gabriel, un nouvel élève, débarque dans sa classe. Les deux adolescents se rapprochent et progressivement, leur amitié semble évoluer vers autre chose. Mais comment Leonardo pourrait-il séduire Gabriel et savoir s’il lui plait puisqu’il ne peut pas le voir ?',
      'realisateur': 'Daniel Ribeiro',
      'niveau': 'Secondaires 3 à 5 et Cégep',
      'date': '2014',
      'dure': ' 96 min',
      'img': 'img/film/regard.jpg',

    }, {
      'name': 'Tout va bien',
      'synopsis': 'Maintenant qu’elle a l’âge légal d’accéder à son dossier à la banque de sperme, Joni décide avec son frère de retrouver le donneur dont ils sont tous deux issus. Ce dernier est rapidement séduit par les deux adolescents qui frappent à sa porte. Ils l’invitent alors à dîner pour la présentation aux parents : deux mamans qui vivent ensemble depuis vingt ans.',
      'realisateur': 'Lisa Cholodenko',
      'niveau': 'Secondaires 3 à 5 et Cégep',
      'date': '2010',
      'dure': '107 min',
      'img': 'img/film/toutva.jpg',

    }, {
      'name': 'Les chansons d’amour',
      'synopsis': 'Ismaël, secrétaire de rédaction d’un journal parisien, fait ménage à trois avec Julie, sa compagne depuis huit ans, et Alice, une collègue au bureau. Sans être toujours harmonieuse, leur relation est placée sous le signe de l’insouciance et de la légèreté. Mais tout bascule lorsque Julie meurt subitement. Malgré l’affection que lui porte sa belle-famille, Ismaël se replie, rejetant les efforts maladroits et insistants de Jeanne, la sœur aînée de la défunte, visant à l’aider à surmonter l’épreuve. Il trouve plutôt réconfort dans les bras d’Erwann, un lycéen breton, petit frère du nouveau copain d’Alice. Cependant, toujours en proie à la mélancolie, le journaliste ne se sent pas prêt à fredonner une autre « chanson d’amour ».',
      'realisateur': 'Christophe Honoré',
      'niveau': 'Cégep',
      'date': '2007',
      'dure': '100 min',
      'img': 'img/film/chansonsamour.jpg',

    }, {
      'name': 'Ma vie en rose',
      'synopsis': 'Ce film évoque le thème de la différence et de l’identité de genre à travers l’histoire de Ludovic, un enfant de sept ans, petite fille assignée garçon à la naissance. Ludovic part dans des rêveries où sa poupée Pam l’emmène dans un monde idéalisé à l’esthétique très kitsch.Invitée chez un voisin de son âge, elle fait scandale en revêtant la robe de la sœur défunte du garçon et organisant un faux mariage avec ce dernier',
      'realisateur': 'Alain Berliner',
      'niveau': 'Secondaires et Cégep',
      'date': '1997',
      'dure': '88 min',
      'img': 'img/film/vierose.jpg',

    }, {
      'name': 'But I’m a cheerleader',
      'synopsis': 'Megan est pom-pom girl et a un petit ami. Seulement voilà, il se pourrait bien qu’elle soit lesbienne. Ses parents décident donc de l’envoyer en école de « réorientation sexuelle » afin qu’elle réapprenne l’hétérosexualité. Là-bas, elle rencontre la belle Graham...',
      'realisateur': 'Jamie Babbit',
      'niveau': 'Secondaires à Cégep',
      'date': '1999',
      'dure': '85 min',
      'img': 'img/film/butam.jpg',

    }, ];

    $scope.title = 'Filmographie';

  });
