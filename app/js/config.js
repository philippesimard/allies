'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'angularjsapp';
  var applicationModuleVendorDependencies = ['config', 'ngMask', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMessages', 'uuid', 'elasticui', 'leseulsteve.angular-user-auth', 'leseulsteve.angular-mongoose', 'angular.img', '720kb.tooltips', 'ui.materialize', 'ngMorph', 'ngCart', 'angular-loading-bar', 'ngAnimate', 'mailchimp'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular
      .module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular
      .module(applicationModuleName)
      .requires
      .push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
