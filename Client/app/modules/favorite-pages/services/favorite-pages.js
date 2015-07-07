'use strict';

angular.module('favorite-pages').service('FavoritePagesService',
  function ($q) {

    return {

    	addContenu: function() {
    		var deffered = $q.defer();
    		deffered.resolve();

    		console.log('Contenu ajouter!');
    		return deffered.promise;
    		// user
    		// contenu
    	}

    };	
  });
