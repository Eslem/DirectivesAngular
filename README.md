# SlemDirectives
Library of angular directives

#Usage
### Install

##### Install with bower:
```
bower install https://github.com/Eslem/DirectivesAngular
```

##### Add module:
```
angular.module('appName', ['sfloo.directives'])
```


#Directives
## Forms
### sl-input-file
Create and handle the file input

##### Usage
* scope-var: Scope var that will be replaced with the file once is selected.
* on-file-picked: Function executed when a file is selected.

```html
<input type="file" sfloo-input-file file-read="scopeVar" filePicked="onFilePicked">
```


===
### sl-drop-container
Create a drop container for images, handle the file input and create a thumbnail from canvas.

##### Usage
* scope-var: Scope var that will be replaced with the file once is selected.
* on-file-picked: Function executed when a file is selected.
* canvas-width: Max width for the thumbnain.
* canvas-height: Max height for the thumbnail.
* show-thumbnail: Boolean value default true, if true render the canvas in the drop container.

```html
<input type="file" sfloo-input-file file-read="scopeVar" filePicked="onFilePicked">
```

##### Styles
* .sl-drop-container
* .sl-drop-plus
* .drop
* .drop input

---
## Images

### sl-on-src-error
Change the src of the image if is not found

##### Usage
```html
<img src="image.jpg" sl-on-src-error="noImage.jpg">

```
### sl-img-full-screen
Change the src of the image if is not found

##### Usage
* [big-img]: image to show in full screen

```html
<img src="thumnail.png" alt="" sl-img-full-screen big-img="imgBig.png">

```