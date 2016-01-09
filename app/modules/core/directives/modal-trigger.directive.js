'use strict';

angular.module('core').directive('modalTrigger',
  function ($templateCache, $q, $http, $compile, rfc4122, ENV) {

    var templatePromise;

    return {
      compile: function (tElement, tAttrs) {

        if (ENV === 'prod') {
          var deffered = $q.defer();
          templatePromise = deffered.promise;

          var rawTemplate = $templateCache.get(tAttrs.modalTrigger);

          var modalId = rfc4122.v4(),
            template = angular.element(rawTemplate).attr('id', modalId);
          tElement.parent().append(template);

          tElement.addClass('modal-trigger');

          tElement.attr('href', '#' + modalId);

          $('.modal-trigger').leanModal();

          deffered.resolve(template);

        } else {
          templatePromise = $http.get(tAttrs.modalTrigger).then(function (response) {

            var modalId = rfc4122.v4(),
              template = angular.element(response.data).attr('id', modalId);
            tElement.parent().append(template);

            tElement.addClass('modal-trigger');

            tElement.attr('href', '#' + modalId);

            $('.modal-trigger').leanModal();

            return template;
          });
        }

        return function link(scope) {
          templatePromise.then(function (template) {
            $compile(template)(scope);
          });
        };
      }
    };
  });
