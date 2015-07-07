'use strict';

angular.module('core').directive('likeButton',
  function (MaterializeService, FavoritePagesService, UserAuth, $rootScope) {

    var toastTime = 3000;

    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: 'modules/favorite-pages/views/like.button.html',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function (scope) {

        $rootScope.$on('$stateChangeSuccess',
          function () {
            scope.hideButton = !UserAuth.isAuthentified();
          });

        scope.addToFavorites = function () {
          FavoritePagesService.addContenu().then(function () {
            MaterializeService.toast('Cette page à été ajoutée à vos favoris', toastTime);
          });
        };

        scope.signaler = function () {
          console.log('signaler');
          MaterializeService.toast('<span>Pour signaler cette page </span><a class="btn-flat red-text"; href=&quot;#!&quot;>Cliquez ici<a>', toastTime);
        };

        scope.contribuer = function () {
          console.log('contrib');
        };
      },
      // controller: function ($scope) {},
    };
  });
