# EaModule
Library of angular directives and services

#Usage
### Install

##### Install with bower:
```
bower install https://github.com/Eslem/EaModule
```

##### Add module:
```
angular.module('appName', ['ea-directives', 'ea-services'])
```


#Directives

## Types
* [Forms](#iorms)
* [Images](#images)
* [Events](#events)
* [Filters](#filters)

## Forms

### ValueMatch
Compare to values and add it in the form validation

##### Usage
* ea-value-match: Name of the other value.

```html
<input type="text" name="input1" ng-model="input1">
<input type="text" name="input2" ng-model="input2" ea-value-match="input1">
<div class="form-group has-error">
	<p class="help-block" ng-show="form.input2.$error.valueMatch">
		Values different
	</p>
</form>
```

===

### InputFile
Create and handle the file input

##### Usage
* scope-var: Scope var that will be replaced with the file once is selected.
* on-file-picked: Function executed when a file is selected.

```html
<input type="file" sfloo-input-file scope-var="scopeVar" on-file-picked="onFilePicked">
```


===
### DropContainer
Create a drop container for images, handle the file input and create a thumbnail from canvas.

##### Usage
* scope-var: Scope var that will be replaced with the file once is selected.
* on-file-picked: Function executed when a file is selected.
* canvas-width: Max width for the thumbnain.
* canvas-height: Max height for the thumbnail.
* show-thumbnail: Boolean value default true, if true render the canvas in the drop container.

```html
<input type="file" sfloo-input-file file-read="scopeVar" on-file-picked="onFilePicked">
```
##### Styles
* .ea-drop-container
* .ea-drop-plus
* .drop
* .drop input




---
## Images

### OnSrcError
Change the src of the image if is not found

##### Usage
```html
<img src="image.jpg" ea-on-src-error="noImage.jpg">

```

### ImgFullScreen
Change the src of the image if is not found

##### Usage
* [big-img]: image to show in full screen
* [showFullScreen($event)]: when is clicked will show the fullscreen image

```html
<img src="thumnail.png" alt="" ea-img-full-screen big-img="imgBig.png">
<button class="btn btn-primary" ng-click="showFullScreen($event)">FullScreen</button>

```
##### Styles
* .eaimgFullScreen

---
## Events

### OnClickOutside
Execute a function when is clicked outside the element

##### Usage
```html
<div ea-on-click-outside="eventHandler()">
</div>
```


---
## Filters

### Block Filter
Filter of componets with animation when change

##### Usage
* ea-block-filter: Parent of collection on element
* list: collection to $whatch and recompute the styles
* data-group:array of the groups: 

```html
<nav>
	<a ng-class="{active: (filtering=='')}" ng-click="noFilter()">All</a>
	<a ng-class="{active: (filtering=='filter')}" ng-click="filter('filter')">Filter</a>
</nav>
<div ea-blocks-filter list-items="items">
	<div class="col-md-1" ng-repeat="item in items" data-group="{{item.filter}}">
	</div>
</ul>
```