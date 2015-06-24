'use strict';

angular.module('ressources').provider('PrePost', function () {

  var allowedOperations = {};

  return {

    config: function (config) {
      allowedOperations.pre = config.pre.allowedOperations;
      allowedOperations.post = config.post.allowedOperations;
    },

    $get: function ($q) {

      return {

        getProcessor: function () {

          var operations = {
            pre: [],
            post: []
          };

          return {

            register: function (moment, operation, callback) {
              if (!_.contains(allowedOperations.pre, operation)) {
                throw new Error('Operation "' + operation + '" n\'est pas prise en charge par la fonction "' + moment + '"');
              }
              if (_.isUndefined(operations[moment][operation])) {
                operations[moment][operation] = [];
              }
              operations[moment][operation].push(callback);
            },

            process: function (moment, operation, item) {
              if (operations[moment][operation]) {
                var promises = [];
                _.forEach(operations[moment][operation], function (callback) {
                  promises.push($q.when(callback(item)));
                });
                return $q.all(promises).then(function () {
                  return item;
                });
              } else {
                var deffered = $q.defer();
                deffered.resolve(item);
                return deffered.promise;
              }
            }
          };
        }
      };
    }
  };
});
