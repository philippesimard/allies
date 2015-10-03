'use strict';

angular.module('medias').directive('mediaSectionPreview',
  function ($state) {
    return {
      restrict: 'E',
      scope: {
        section: '='
      },
      templateUrl: 'modules/medias/views/media-section.preview.html',
      link: function (scope, element) {
        angular.element(element.find('div')[0]).css('background-image', 'url(' + scope.section.img + ')');

        scope.toToMediaSection = function (section) {
          $state.go('media-section', {
            mediaSectionName: section.shortName
          });
        };
      }
    };
  });
