'use strict';
angular.module('sl-directives').
directive('slImgFullScreen', function($document, $http) {
  var directiveDefinitionObject = {
    link: {
      post: function(scope, element, attrs, controller) {
        var changeImg = function(){
          var src = element.attr('src');
          if(attrs.bigImg)
            src = attrs.bigImg;
          $("#imgFullScreenImg").attr("src", src);
        };

        var createElementIfNoExist = function() {
          if ($("#imgFullScreen").length === 0) {
            createElement();
          }else{
            $(".imgFullScreen").fadeIn();
            changeImg();
          }
        };

        var createElement = function(){
            var html = '<div class="imgFullScreen" id="imgFullScreen">'+
            '  <div class="wrap-image">'+
                '<i class="fa fa-2x fa-close close" ng-click="hide()">X</i>'+
              '  <img alt="" id="imgFullScreenImg">'+
            '  </div>'+
          '  </div>';
            var imgElement = angular.element(html);
            $document.find('body').append(imgElement);
            changeImg();
        }

        var onClick = function(event) {
          var isChild = element.has(event.target).length > 0;
          var isSelf = element[0] == event.target;
          var isImg = event.target.id == 'imgFullScreenImg';
          var isInside = isChild || isSelf || isImg;
          if (!isInside) {
            $("#imgFullScreen").fadeOut();
          }
        };
        $document.click(onClick);

        element.bind('click', function(evt) {
          evt.stopPropagation();
          createElementIfNoExist();
        });
      }
    }
  };
  return directiveDefinitionObject;
});
