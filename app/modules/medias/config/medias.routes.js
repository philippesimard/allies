'use strict';

angular.module('medias').config(
  function ($stateProvider) {

    $stateProvider

      .state('ressources', {
      url: '/mediagraphie',
      templateUrl: 'modules/medias/views/media-sections.page.html',
      resolve: {
        sections: function (MediaSection) {
          return MediaSection.find();
        }
      },
      controller: function ($scope, sections) {
        $scope.mediaSections = sections;
      }
    })

    .state('media-page', {
      url: '/mediagraphie/film/:filmName',
      template: '<madia-page media="media"></media-page>',
      resolve: {
        secteurs: function (Media, $stateParams) {
          return Media.find({
            shortName: $stateParams.media
          });
        }
      },
    })

    .state('media-section', {
      url: '/mediagraphie/:mediaSectionName',
      resolve: {
        sections: function (MediaSection, $stateParams) {
          return MediaSection.find({
            shortName: $stateParams.mediaSectionName
          });
        }
      },
      templateUrl: 'modules/medias/views/media.section.html',
      controller: function ($scope, sections) {
        $scope.section = sections[0];
      }
    });
  });
