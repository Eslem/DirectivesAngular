'user strict';

angular.module('sl-directives')
.directive('slInputFile', function(){
	var directive = {};

	directive.scope = {
		scopeVar: "=",
		onFilePicked: "="
	};

	directive.link = function(scope, element, attributes) {
		element.bind("change", function (changeEvent) {
			var file = this.files[0];
			scope.$apply(function () {
				scope.scopeVar = file;
				if(typeof scope.onFilePicked === 'function'){
					scope.onFilePicked(file);
				}
			});
		});
	};

	return directive;
});

