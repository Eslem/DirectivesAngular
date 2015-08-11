(function() {
	'use strict';

	angular
	.module('src')
	.controller('EventsController', EventsController);

	/** @ngInject */
	function EventsController($scope) {
		$scope.onOutClicked = function(){
			alert('clicked out');
		}
	}
})();
