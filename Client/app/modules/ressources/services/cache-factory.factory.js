'use strict';

angular.module('ressources').factory('CacheFactory',
  function ($cacheFactory, $q) {

    return {

      getCache: function (cacheName) {

        var cache = $cacheFactory(cacheName);

        function timeStamp(ressource) {
          if (_.isArray(ressource)) {
            _.forEach(ressource, function (item) {
              item.iamRessourceCachedDate = new Date();
            });
          } else {
            ressource.iamRessourceCachedDate = new Date();
          }
          return ressource;
        }

        return {

          find: function (key) {
            var deffered = $q.defer();
            deffered.resolve(cache.get(key));
            return deffered.promise;
          },

          put: function (ressource, key) {
            var deffered = $q.defer(),
              stampedRessource = timeStamp(ressource);
            cache.put(key, stampedRessource);
            deffered.resolve(stampedRessource);
            return deffered.promise;
          },

          remove: function (key) {
            cache.remove(key);
          },

          flush: function () {
            cache.removeAll();
          },

          getCachedDate: function (ressource) {
            if (_.isArray(ressource) && ressource.length > 0) {
              return ressource[0].iamRessourceCachedDate;
            } else {
              return ressource.iamRessourceCachedDate;
            }
          }
        };
      }
    };
  });
