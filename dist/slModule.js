angular.module('sl', []);
angular.module('sl-directives', []);
angular.module('sl-services', []);
'use strict';

angular.module('sl-directives')
.directive('slClickedOutside', ["$document", function($document) {
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
}]);

'use strict';

angular.module('sl-directives')
.directive('slDropContainer', function(){
	return {
		scope: {
			scopeVar: "=",
			onFilePicked: "=",
			canvasHeight:"=",
			canvasWidth:"=",
			showThumbnail:"="
		},
		template :'<div class="centerDiv">\
		<div class="sfloo-drop-container">\
		<h1 class="sfloo-drop-plus">+</h1>\
		</div>\
		<input class="sfloo-drop-input" type="file">\
		</div>',
		link: function (scope, element, attributes) {
			var input = element.find('input');
			var container = element.find('div')[1];

			var showPreview = true;				
			if(attributes.showThumbnail !=='undefined' && attributes.showThumbnail !== undefined){
				showPreview = false;
			}

			var setCanvasSize = (function(){
				if(!scope.canvasHeight && !scope.canvasWidth){
					inputToCanvas.config({
						MAX_WIDTH:container.offsetWidth,
						MAX_HEIGHT:container.offsetHeight
					});
				}else{
					if(scope.canvasWidth){
						inputToCanvas.config({MAX_WIDTH:scope.canvasWidth});
					}
					if(scope.canvasHeight){
						inputToCanvas.config({MAX_WIDTH:scope.canvasHeight});					
					}
				}
			})();

			var onFileSelect = function(){
				var files = this.files;
				handleFile(files[0]);
			};
			input.bind("change", onFileSelect);

			
			function handleFile(file){
				inputToCanvas.init(file, function(obj){
					scope.$apply(function () {
						if(showPreview){
							$(container).empty();
							container.appendChild(obj.canvas);
							container.style.height = obj.fixedSize.height+'px';
							container.style.width = obj.fixedSize.width+'px';
						}
						scope.scopeVar = obj;
						if(typeof scope.onFilePicked === 'function'){
							scope.onFilePicked(obj);
						}
					});
				});
			};
			
			
			function handleDragOver(evt) {
				$(evt.target).addClass("over");
				evt.stopPropagation();
				evt.preventDefault();
				evt.dataTransfer.dropEffect = 'copy'; 
			}
			function handleDragEnter(evt) {
				evt.stopPropagation();
				$(evt.target).addClass("over");
			}
			function handleDragLeave(evt){
				evt.stopPropagation();
				$(evt.target).removeClass("over");
			}
			function hanldeDroped(evt){
				evt.preventDefault();
				var files = evt.dataTransfer.files;
				handleFile(files[0]);
				$(evt.target).removeClass("over");
			};

			container.addEventListener('dragover', handleDragOver, false);
			container.addEventListener('dragenter', handleDragEnter, false);
			container.addEventListener('dragleave', handleDragLeave, false);
			container.addEventListener('drop', hanldeDroped, false);


		}
	};
});


var inputToCanvas = {};
inputToCanvas.previewContainer = document.body;
inputToCanvas.MAX_HEIGHT = 1000;
inputToCanvas.MAX_WIDTH = 1000;

inputToCanvas.config = function(obj){
	for(var attr in obj){
		inputToCanvas[attr] = obj[attr];
	}
};

inputToCanvas.init = function(file, callback){
	var canvas = document.createElement('canvas'); 
	this.fileImgToCanvas(file, canvas, callback);
};

inputToCanvas.getFixedSize = function(img){
	var width = img.width;
	var height = img.height;
	if (width > height) {
		if (width > this.MAX_WIDTH) {
			height *= this.MAX_WIDTH / width;
			width = this.MAX_WIDTH;
		}
	} else {
		if (height > this.MAX_HEIGHT) {
			width *= this.MAX_HEIGHT / height;
			height = this.MAX_HEIGHT;
		}
	}

	return {
		width:width,
		height:height
	};
};
inputToCanvas.thumbnail;
inputToCanvas.fileImgToCanvas = function(file, canvas, callback){
	var img = document.createElement("img");
	var reader = new FileReader();  
	reader.onload = function(e) {
		img.src = e.target.result
	};
	reader.readAsDataURL(file);
	img.onload = function () {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var fixedSize = inputToCanvas.getFixedSize(img);
		var width = fixedSize.width;
		var height = fixedSize.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		var dataurl = canvas.toDataURL("image/png");
		inputToCanvas.thumbnail=dataurl;

		if(callback){
			var obj = {
				name:file.name,
				img:img,
				canvas:canvas,
				thumbnailURL:dataurl,
				fixedSize:fixedSize
			};
			callback(obj);
		}
	}
}
'use strict';
angular.module('sl-directives').
directive('slImgFullScreen', ["$document", "$http", function($document, $http) {
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
}]);

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