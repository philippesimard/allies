'use strict';

angular.module('gros-boutton').factory('GrosBoutton',
  function (MaterializeService) {

    var GrosBoutton = function () {
      this.cbs = {};
      this.toastTime = 3000;
    };

    GrosBoutton.prototype.on = function (action, cb) {
      this.hasFavoriteFunction = action === 'addToFavorites';
      this.cbs[action] = cb;
    };

    GrosBoutton.prototype.addToFavorites = function () {
      var that = this;
      this.cbs.addToFavorites().then(function (message) {
        MaterializeService.toast('<i class="material-icons red-text">favorite</i>&nbsp;&nbsp;' + message, that.toastTime);
      });
    };

    GrosBoutton.prototype.signaler = function () {
      console.log('signaler');
      MaterializeService.toast('<i class="material-icons red-text">warning</i>&nbsp;&nbsp;Pour signaler cette page </span><a class="waves-effect waves-light btn red"; href=&quot;#!&quot;>Cliquez ici<a>', this.toastTime);
    };

    GrosBoutton.prototype.likepage = function () {
      console.log('likepage');
      MaterializeService.toast('<i class="material-icons red-text">warning</i>&nbsp;&nbsp;Pour signaler cette page </span><a class="waves-effect waves-light btn red"; href=&quot;#!&quot;>Cliquez ici<a>', this.toastTime);
    };

    return GrosBoutton;
  });
