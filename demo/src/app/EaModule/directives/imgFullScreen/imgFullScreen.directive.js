'use strict';
angular.module('ea-directives').
directive('eaImgFullScreen', function($document, $http) {
  var directiveDefinitionObject = {
    link: {
      post: function(scope, element, attrs, controller) {

        var button;
        scope.showFullScreen = function(evt){
          button = evt.target;
          createElementIfNoExist();
        }

        var changeImg = function(){
          var src = element.attr('src');
          if(attrs.bigImg)
            src = attrs.bigImg;
          $("#eaimgFullScreenImg").attr("src", src);
        };

        var createElementIfNoExist = function() {
          if ($("#eaimgFullScreen").length === 0) {
            createElement();
          }else{
            $(".eaimgFullScreen").fadeIn();
            changeImg();
          }
        };

        var createElement = function(){
            var html = '<div class="eaimgFullScreen" id="eaimgFullScreen">'+
            '  <div class="wrap-image">'+
                '<i class="fa fa-2x fa-close close" ng-click="hide()"></i>'+
              '  <img alt="" id="eaimgFullScreenImg">'+
            '  </div>'+
          '  </div>';
            var imgElement = angular.element(html);
            $document.find('body').append(imgElement);
            changeImg();
        }

        var onClick = function(event) {
          var isChild = element.has(event.target).length > 0;
          var isSelf = element[0] == event.target;
          var isImg = event.target.id == 'eaimgFullScreenImg';
          var isButton = event.target === button;
          var isInside = isChild || isSelf || isImg || isButton;
          if (!isInside) {
            $("#eaimgFullScreen").fadeOut();
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
