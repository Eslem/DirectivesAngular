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
				fixedSize:fixedSize,
				file:file
			};
			callback(obj);
		}
	}
}