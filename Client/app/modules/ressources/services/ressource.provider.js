'use strict';

angular.module('ressources').provider('Ressource',
  function () {

    var globalConfig,
      isLocal = false,
      StoreFactory;

    return {

      config: function (value) {
        globalConfig = value;
      },

      $get: function ($q, PrePost, $injector) {

        function getStore(config) {

          var idProp = config.idProp || '_id';

          try {
            StoreFactory = $injector.get('LocalStoreFactory');
            isLocal = true;
          } catch (err) {
            StoreFactory = $injector.get('RemoteStoreFactory');
          }

          return StoreFactory.getStore(config.api, idProp, config);
        }

        var Iamressource = function (config) {

          _.merge(config, globalConfig);

          var Store = getStore(config);
          var PrePostProcessor = PrePost.getProcessor();

          this.pre = function (operation, callback) {
            PrePostProcessor.register('pre', operation, callback);
          };

          this.post = function (operation, callback) {
            PrePostProcessor.register('post', operation, callback);
          };

          /**
           * Retourne une ressource.
           */
          this.findOne = function (id) {
            return Store.findOne(id).then(function (item) {
              return wrapRessource(item).then(function (wrappedRessource) {
                return PrePostProcessor.process('pre', 'return', wrappedRessource);
              });
            });
          };

          /**
           * Retourne toutes les ressources.
           */
          this.find = function () {
            return Store.find().then(function (items) {
              var promises = [];
              _.forEach(items, function (item) {
                promises.push(wrapRessource(item).then(function (wrappedRessource) {
                  return PrePostProcessor.process('pre', 'return', wrappedRessource);
                }));
              });
              return $q.all(promises).then(function () {
                return items;
              });
            });
          };

          /**
           * Crée une nouvelle ressource.
           */
          this.create = function (params) {
            return PrePostProcessor.process('pre', 'create', params).then(function (ressource) {
              return Store.create(ressource).then(function (createdRessource) {
                return wrapRessource(createdRessource).then(function (wrappedRessources) {
                  return PrePostProcessor.process('post', 'create', wrappedRessources).then(function (postCreatedRessource) {
                    return PrePostProcessor.process('pre', 'return', postCreatedRessource);
                  });
                });
              });
            });
          };

          this.sync = function () {
            if (isLocal) {
              return Store.sync();
            }
          };

          function wrapRessource(ressource) {

            var deffered = $q.defer();

            /**
             * Modifie la ressource 
             */
            ressource.update = function () {
              return PrePostProcessor.process('pre', 'update', this).then(function (ressource) {
                return Store.update(unWrapRessource(ressource)).then(function (updatedRessource) {
                  return wrapRessource(updatedRessource).then(function (wrappedRessources) {
                    return PrePostProcessor.process('post', 'update', wrappedRessources).then(function (postUpdatedRessource) {
                      return PrePostProcessor.process('pre', 'return', postUpdatedRessource);
                    });
                  });
                });
              });
            };

            /**
             * Supprime la ressource 
             */
            ressource.destroy = function () {
              return PrePostProcessor.process('pre', 'destroy', this).then(function (ressource) {
                return Store.destroy(unWrapRessource(ressource)).then(function (destroyedRessource) {
                  return PrePostProcessor.process('post', 'destroy', destroyedRessource);
                });
              });
            };

            function unWrapRessource(ressource) {
              ressource.update = undefined;
              ressource.destroy = undefined;
              return ressource;
            }

            deffered.resolve(ressource);
            return deffered.promise;
          }
        };

        return Iamressource;
      }
    };
  });
