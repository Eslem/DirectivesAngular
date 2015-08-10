'use strict';
angular.module('sl-directives')
.directive('slOnSrcError', function () {
	return {
		restrict: 'EA',
		link: function (scope, iElement, attrs) {
			iElement.bind('error', function() {
				angular.element(this).attr("src", attrs.slOnSrcError);
			});
		}
	};
});