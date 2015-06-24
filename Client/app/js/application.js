'use strict';

angular
  .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
  .module(ApplicationConfiguration.applicationModuleName)
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
  ]);

//Then define the init function for starting up the application
function bootStrap() {
  if (window.location.hash === '#_=_') {
    window.location.hash = '#!';
  }
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
}

if (document.URL.indexOf('http://') === -1) {
  document.addEventListener('deviceready', function () {
    bootStrap();
  }, false);
} else {
  angular.element(document).ready(function () {
    bootStrap();
  });
}
