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

