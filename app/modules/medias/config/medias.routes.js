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
      controller: function ($scope, sections, Film) {
        $scope.section = sections[0];
        Film.find().then(function (films) {
          $scope.films = films;
        });
      }
    });
  });
