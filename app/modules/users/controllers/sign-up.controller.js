'use strict';

angular.module('users').controller('SignUpController',
  function ($scope) {
    var currentTime = new Date();
    $scope.currentTime = currentTime;
    $scope.month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    $scope.monthShort = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juill', 'août', 'sept', 'oct', 'nov', 'déc'];
    $scope.weekdaysFull = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    $scope.weekdaysLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    $scope.close = 'Fermer';

  });
