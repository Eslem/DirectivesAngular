'use strict';
angular.module('ea-directives')
.directive('eaOnSrcError', function () {
	return {
		restrict: 'EA',
		link: function (scope, iElement, attrs) {
			iElement.bind('error', function() {
				angular.element(this).attr("src", attrs.eaOnSrcError);
			});
		}
	};
});