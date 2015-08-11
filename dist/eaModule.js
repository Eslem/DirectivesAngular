angular.module('ea-services', []);
angular.module('ea-directives', []);
angular.module('eaModule', ['ea-directives', 'ea-services']);
'use strict';
angular.module('ea-directives').
directive('eaBlocksFilter', function() {
  return directive;
});

var directive = {}; 
var iElement;
var loaded =0, needLoad=0;
directive.link = function(scope, element, attrs){
  $(element).addClass("ea-block-filt");
  $(element).addClass("ea-block-no-filt");
  scope.$watch(attrs.listItems, function(before, after){
    if(after.length > 0 ){
      initLoad(element);
    }
  });

  scope.filtering = '';
  var divs = element.children('div');
  scope.filter = function (filter) {
    scope.filtering = filter;
    $(divs).show();
    $(element).addClass("ea-block-filtering").removeClass("ea-block-no-filt");
    var count = 1;
    $(element).children().each(function () {
      var data = $(this).attr("data-group");
      if (data.indexOf(filter) != -1) {
        $(this).show();
        $(this).attr("data-position", count++);
      } else {
        $(this).hide();
        $(this).attr("data-position", 0);
      }
    });
  };

  scope.noFilter = function () {
    scope.filtering = '';
    $(element).removeClass("ea-block-filtering").addClass("ea-block-no-filt");
    $(element).children().show();
  }

}

function initLoad(iElement){
  needLoad=0;
  var elements = iElement.children();
  var length = elements.length;
  if(length>0){
    prepareLoad(elements);
  }
}

var filtElements;
function prepareLoad(elements){
  filtElements = elements;
  needLoad = elements.length;
  for(var i=0, elem; i<elements.length; i++, elem= elements[i]){
    var imgs = $(elem).children('img');
    var hasImg =(imgs &&  imgs.length>0)?true:false;
    if(hasImg){
      imgs[0].onload = function(){
        elemLoaded();
      }
    }else{
      elemLoaded();
    }
  }
}

function elemLoaded(){
  loaded++;
  if(loaded===needLoad){
    createStyles(".ea-block-filtering div[data-position='{0}']");
    createStyles(".ea-block-no-filt div:nth-child({0})");
  }
}

function createStyles(rulePattern){
  var rules = [], index = 0;
  for(var i=0; i<filtElements.length; i++){
    var elem = filtElements[i];
    var position =$(elem).offset();
    var x = position.left+'px';
    var y  = position.top+'px';
    var transforms = '{ -webkit-transform: translate3d(' + x + ', '+ y + ', 0); transform: translate3d(' + x + ', '+ y + ', 0); position:absolute}';
    rules.push(rulePattern.replace("{0}", ++index) + transforms);
  }  
  appendStyles(rules);
}


function appendStyles(rules){
  var headElem = document.getElementsByTagName("head")[0];
  var styleElem = $("<style>").attr("type", "text/css").appendTo(headElem)[0];
  if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = rules.join("\n");
  } else {
    styleElem.textContent = rules.join("\n");
  }
}


'use strict';

angular.module('ea-directives')
.directive('eaOnClickOutside', ["$document", function($document) {
  var directiveDefinitionObject = {
        link: {
            post: function (scope, element, attrs, controller) {
                var onClick = function (event) {
                    var isChild = element.has(event.target).length > 0;
                    var isSelf = element[0] == event.target;
                    var isInside = isChild || isSelf;
                    if (!isInside) {
                        scope.$apply(attrs.eaOnClickOutside);
                    }
                };
                $document.click(onClick);
            }
        }
    };
    return directiveDefinitionObject;
}]);

'use strict';

angular.module('ea-directives')
.directive('eaDropContainer', function(){
	return {
		scope: {
			scopeVar: "=",
			onFilePicked: "=",
			canvasHeight:"=",
			canvasWidth:"=",
			showThumbnail:"="
		},
		template :'<div class="centerDiv">\
		<div class="ea-drop-container">\
		<h1 class="ea-drop-plus">+</h1>\
		</div>\
		<input class="ea-drop-input" type="file">\
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
angular.module('ea-directives').
directive('eaImgFullScreen', ["$document", "$http", function($document, $http) {
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
                '<i class="fa fa-2x fa-close close" ng-click="hide()">X</i>'+
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
}]);

'user strict';

angular.module('ea-directives')
.directive('eaInputFile', function(){
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
'use strict';

angular.module('eaModule')
.constant('toastr', toastr)
.config(["toastr", function(toastr){
	toastr.options.timeOut = 3000;
	toastr.options.positionClass = 'toast-top-right';
	toastr.options.preventDuplicates = true;
	toastr.options.progressBar = true;
}]);