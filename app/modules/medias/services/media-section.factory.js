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

    return MediaSection;

  });
