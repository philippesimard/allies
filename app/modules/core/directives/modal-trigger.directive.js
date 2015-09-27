'use strict';

angular.module('core').directive('modalTrigger',
  function ($http, rfc4122) {
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      compile: function (tElement, tAttrs) {

          $http.get(tAttrs.modalTrigger).then(function (response) {

            var modalId = rfc4122.v4(),
              template = angular.element(response.data).attr('id', modalId);
            tElement.parent().append(template);

            tElement.addClass('modal-trigger');

            tElement.attr('href', '#' + modalId);

            $('.modal-trigger').leanModal();
          });

          // return function linking(scope, elm, attrs) {}
        }
        // link: function (scope, element, attrs, ctrl) {}
    };
  });
