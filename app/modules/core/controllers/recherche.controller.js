'use strict';

angular.module('core').controller('RechercheController',
  function ($scope, $http) {

    var url = 'http://acommealliees.ca/cdn/data/wp-json/posts';

    $http.jsonp(url)
      .success(function (data) {
        console.log(data.found);
        $scope.content = data;
      });

  });

// Http.get --> Articles récent: http://acommealliees.ca/cdn/data/wp-json/posts
