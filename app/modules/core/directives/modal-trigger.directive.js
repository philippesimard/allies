'use strict';

angular.module('core').directive('modalTrigger',
  function ($q, $http, $compile, rfc4122) {

    var templatePromise;

    return {
      compile: function (tElement, tAttrs) {

        templatePromise = $http.get(tAttrs.modalTrigger).then(function (response) {

          var modalId = rfc4122.v4(),
            template = angular.element(response.data).attr('id', modalId);
          tElement.parent().append(template);

          tElement.addClass('modal-trigger');

          tElement.attr('href', '#' + modalId);

          $('.modal-trigger').leanModal();

          return template;
        });

        return function link(scope) {
          templatePromise.then(function (template) {
            $compile(template)(scope);
          });
        };
      }
    };
  });
