'use strict';

angular.module('users').factory('User',
  function (Schema, $q) {

    var User = new Schema('user');

    User.prototype.toString = function () {
      return this.firstname + ' ' + this.lastname;
    };

    function addPisteToFavorite(user, piste) {
      if (user.hasFavorite('piste', piste)) {
        var deffered = $q.defer();
        deffered.resolve('Déjà dans vos favoris');
        return deffered.promise;
      }

      user.favorites.piste.push(piste._id);
      return user.save().then(function () {
        return 'La piste ' + piste.toString() + ' a été ajoutée à vos favoris.';
      });
    }

    function addMediaToFavorite(user, media) {

      if (user.hasFavorite('media', media)) {
        var deffered = $q.defer();
        deffered.resolve('Déjà dans vos favoris');
        return deffered.promise;
      }

      user.favorites.media.push(media._id);
      return user.save().then(function () {
        return 'Le media ' + media.toString() + ' a été ajoutée à vos favoris.';
      });
    }

    User.prototype.hasFavorite = function (type, element) {
      return !_.isUndefined(this.favorites[type]) && _.contains(this.favorites[type], element._id);
    };

    User.prototype.addFavorite = function (type, element) {

      if (_.isUndefined(this.favorites)) {
        this.favorites = {};
      }

      if (_.isUndefined(this.favorites[type])) {
        this.favorites[type] = [];
      }

      switch (type) {
      case 'piste':
        return addPisteToFavorite(this, element);
      case 'media':
        return addMediaToFavorite(this, element);
      }
    };

    User.prototype.removeFavorite = function (type, element) {
      _.pull(this.favorites[type], element._id);
      return this.save().then(function () {
        return element.toString() + ' a été retiré de vos favoris.';
      });
    };

    User.prototype.hasBadge = function (badgeId) {
      return _.contains(this.badges, badgeId);
    };

    User.prototype.addBadge = function (badgeId) {
      this.badges.push(badgeId);
      return this.save();
    };

    User.prototype.getBadgeIds = function () {
      return this.badges;
    };

    return User;
  });
