'use strict';

angular.module('ressources').provider('RemoteStoreFactory',
  function () {

    var storeConfig;

    return {

      config: function (value) {
        storeConfig = value;
      },

      $get: function ($http, $q, CacheFactory) {

        return {

          getStore: function (apiUrl, idProp, config) {

            _.merge(storeConfig, config);

            var cache = CacheFactory.getCache(apiUrl);

            function getHeaders(ressource) {
              return {
                headers: {
                  'If-Modified-Since': cache.getCachedDate(ressource)
                }
              };
            }

            function find(identifiant) {
              return cache.find(identifiant).then(function (cachedRessource) {
                if (cachedRessource) {
                  return $http.get(identifiant, getHeaders(cachedRessource))
                    .then(function (response) {
                      return cache.put(response.data, identifiant);
                    }).catch(function (response) {
                      if (response.status === 304) {
                        var deffered = $q.defer();
                        deffered.resolve(cachedRessource);
                        return deffered.promise;
                      }
                    });
                } else {
                  return $http.get(identifiant)
                    .then(function (response) {
                      return cache.put(response.data, identifiant);
                    });
                }
              });
            }

            function getCacheId(ressource) {
              return apiUrl + '/' + ressource[idProp];
            }

            return {

              findOne: function (id) {
                return find(apiUrl + '/' + id);
              },

              find: function () {
                return find(apiUrl);
              },

              create: function (ressource) {
                return $http.post(apiUrl, ressource)
                  .then(function (response) {
                    return cache.put(response.data, getCacheId(response.data));
                  });
              },

              update: function (ressource) {
                var identifiant = getCacheId(ressource);
                return $http.put(identifiant, ressource)
                  .then(function (response) {
                    return cache.put(response.data, identifiant);
                  });
              },

              destroy: function (ressource) {
                var identifiant = getCacheId(ressource);
                cache.remove(identifiant);
                return $http.delete(identifiant);
              }
            };
          }
        };
      }
    };
  });
