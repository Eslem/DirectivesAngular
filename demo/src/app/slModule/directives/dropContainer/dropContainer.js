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
		<div class="sl-drop-container">\
		<h1 class="sl-drop-plus">+</h1>\
		</div>\
		<input class="sl-drop-input" type="file">\
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

