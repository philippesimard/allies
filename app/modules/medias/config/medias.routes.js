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
      templateProvider: function ($http, media, MediaSection, ENV, $q, $templateCache) {
        return MediaSection.getFicheTemplateUrl(media.sectionId).then(function (templateUrl) {
          if (ENV === 'prod') {
            var deffered = $q.defer();
            deffered.resolve($templateCache.get(templateUrl));
            return deffered.promise;
          } else {
            return $http.get(templateUrl).then(function (response) {
              return response.data;
            });
          }
        });

      },
      controller: function ($scope, media) {
        $scope.media = media;
      }
    });
  });
