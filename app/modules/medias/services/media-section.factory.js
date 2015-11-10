'use strict';

angular.module('medias').factory('MediaSection',
  function (Schema) {

    var MediaSection = new Schema('media-section');

    /*MediaSection.create({
      name: 'Document',
      shortName: 'document',
      description: 'description',
      position: 4
    });*/

    MediaSection.prototype.toString = function () {
      return this.name;
    };

    MediaSection.getFicheTemplateUrl = function (mediaSectionId) {
      return MediaSection.findById(mediaSectionId).then(function (mediaSection) {
        return 'modules/medias/views/' + mediaSection.shortName + '.fiche.html';
      });
    };

    return MediaSection;

  });
