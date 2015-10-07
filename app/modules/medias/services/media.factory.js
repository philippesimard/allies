'use strict';

angular.module('medias').factory('Media',
  function (Schema, MediaSection) {

    var Media = new Schema('media');

    Media.prototype.toString = function () {
      return this.name;
    };

    Media.findBySectionShortName = function (sectionShortName) {
      return MediaSection.find({
        shortName: sectionShortName
      }).then(function (mediaSection) {
        return Media.find({
          sectionId: mediaSection._id
        });
      });
    };

    Media.post('find', function (next) {
      if (!_.startsWith(this.img, 'http')) {
        this.img = 'img/' + this.img;
      }
      next();
    });

    return Media;

  });
