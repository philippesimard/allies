'use strict';

angular.module('users').factory('User',
  function (Schema, $q) {

    var User = new Schema('user');

    User.prototype.toString = function () {
      return this.firstname + ' ' + this.lastname;
    };

    User.prototype.addFavorite = function (type, element) {

      if (_.isUndefined(this.favorites)) {
        this.favorites = {};
      }

      if (_.isUndefined(this.favorites[type])) {
        this.favorites[type] = [];
      } else if (_.contains(this.favorites[type], element._id)) {
        var deffered = $q.defer();
        deffered.resolve('Déjà dans vos favoris');
        return deffered.promise;
      }

      var message;

      switch (type) {
      case 'piste':
        this.favorites[type].push(element._id);
        message = 'La piste ' + element.toString() + ' a été ajoutée à vos favoris.';
        break;
      }

      return this.save().then(function () {
        return message;
      });
    };

    return User;
  });
