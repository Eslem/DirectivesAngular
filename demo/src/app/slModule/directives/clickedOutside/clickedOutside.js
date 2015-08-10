'use strict';

angular.module('sl-directives')
.directive('slClickedOutside', function($document) {
  var directiveDefinitionObject = {
        link: {
            post: function (scope, element, attrs, controller) {
                var onClick = function (event) {
                    var isChild = element.has(event.target).length > 0;
                    var isSelf = element[0] == event.target;
                    var isInside = isChild || isSelf;
                    if (!isInside) {
                        scope.$apply(attrs.clickedOutside);
                    }
                };
                $document.click(onClick);
            }
        }
    };
    return directiveDefinitionObject;
});
