'use strict';

angular.module('medias').factory('MediaFactory',
  function ($injector) {

    return {

      getMedias: function (query) {

        var factory;

        switch (query.mediaType) {
          default: factory = $injector.get('Film');
        }

        return factory.find();
      }
    };
  });
