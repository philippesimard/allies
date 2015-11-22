'use strict';

angular.module('users').controller('ContactController',
  function ($rootScope, $scope, Mailer, MaterializeService) {

    function initContactForm() {
      if ($rootScope.currentUser.isAuthentified()) {
        $scope.message = {
          name: $rootScope.currentUser.firstname + ' ' + $rootScope.currentUser.lastname,
          email: $rootScope.currentUser.email
        };
      }
    }

    initContactForm();

    $scope.send = function (contactForm) {

      if (contactForm.$valid) {

        $scope.message.from = $scope.message.name + ' <' + $scope.message.email + '>';
        $scope.message.to = 'info';

        Mailer.send($scope.message).then(function () {
          $scope.message = {};
          $scope.mail = {};
          contactForm.$setPristine();
          MaterializeService.toast('Le message à été envoyé. Merci!', 3000);
          initContactForm();
        });
      }
    };
  });
