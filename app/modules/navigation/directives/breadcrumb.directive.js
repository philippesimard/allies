'use strict';

angular.module('navigation-module').directive('pageBanner',
  function () {

    return {
      restrict: 'A',
      compile: function (tElement) {
        tElement.parent().append('<ui-breadcrumbs displayname-property="data.displayName" abstract-proxy-property="data.proxy" template-url="modules/navigation/views/breadcrumb.html"></ui-breadcrumbs>');
      }
    };

  });
