'use strict';

angular.module('core').config(
	function($rootScope) {

		$rootScope.$on('$stateChangeSuccess', function() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		});
	});