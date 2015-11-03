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
        section: function (MediaSection, $stateParams) {
          return MediaSection.findOne({
            shortName: $stateParams.mediaSectionName
          });
        }
      },
      templateUrl: 'modules/medias/views/media.section.html',
      controller: function ($scope, section) {
        $scope.section = section;
      }
    })

    .state('media-fiche', {
      url: '/mediagraphie/media/:mediaId',
      resolve: {
        media: function (Media, $stateParams) {
          return Media.findOne({
            _id: $stateParams.mediaId
          });
        }
      },
      templateUrl: 'modules/medias/views/media.fiche.html',
      controller: function ($scope, media) {
        $scope.media = media;
      }
    });
  });
