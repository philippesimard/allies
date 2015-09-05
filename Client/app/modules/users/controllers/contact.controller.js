'use strict';

angular.module('users').controller('ContactController',
  function ($rootScope, $scope, Mailer, MaterializeService) {

    $scope.send = function (contactForm) {

      if (contactForm.$valid) {

        $scope.message.from = $rootScope.currentUser.firstname + ' ' + $rootScope.currentUser.lastname + ' <' + $rootScope.currentUser.email + '>';
        $scope.message.to = 'info';

        Mailer.send($scope.message).then(function () {
          $scope.message = {};
          contactForm.$setPristine();
          MaterializeService.toast('Le message à été envoyé!');
        });
      }
    };
  });
