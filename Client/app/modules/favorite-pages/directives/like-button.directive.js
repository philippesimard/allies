'use strict';

angular.module('core').directive('likeButton',
  function (MaterializeService, FavoritePagesService) {
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'modules/core/views/like.button.html',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function (scope) {

        scope.addToFavorites = function () {
          FavoritePagesService.addContenu().then(function () {
            MaterializeService.toast('Cette page à été ajoutée à vos favoris', 4000);
          });
        };

        scope.signaler = function () {
          console.log('signaler');
          MaterializeService.toast('<span>Pour signaler cette page </span><a class="btn-flat red-text"; href=&quot;#!&quot;>Cliquez ici<a>', 5000);
        };

        scope.contribuer = function () {
          console.log('contrib');
        };
      },
      // controller: function ($scope) {},
    };
  });
