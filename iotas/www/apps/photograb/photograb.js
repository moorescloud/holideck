/*
	@file: apps/photograb/photograb.js
*/

var photograb_img = null;

// Every app has an object
function photograb() {

	console.log('instancing photograb object')

	function appStart() {
		console.log("photograb.appStart");
		sampApp();
	}
	
	function appQuit() {
		console.log("photograb.appQuit");
	}
		
	this.lastTouch = null;
	this.appStart = appStart;
	this.appQuit = appQuit;
	
	this.mouseX = 0;
	this.mouseY = 0;
			
	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	console.log("Got context");
	console.log(screen.width, screen.height);
	
	this.theCanvas.addEventListener("mousemove", onSampMouseMove, false);
	this.theCanvas.addEventListener("click", onSampMouseClick, false);
	this.theCanvas.addEventListener("touchstart", onSampTouchStart, false);
	this.theCanvas.addEventListener("touchmove", onSampTouchMove, false);

	
	function onSampMouseMove(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;

	}
	
	function onSampMouseClick(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;

//		console.log("click: " + theApp.mouseX + "," + theApp.mouseY);   
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
	}

	function onSampTouchStart(e) {
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY );
		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop;
		console.log("touch: " + theApp.mouseX + "," + theApp.mouseY);
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
		theApp.lastTouch = new Date().getTime();
	}
	
	function onSampTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			onSampTouchStart(e);
		} else {
			console.log("ignoring");
		}
	}
		
	
	function sampSupport () {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			return true;
		} else {
			return false;
		}
	}
	
	function sampApp(){
	
		if (sampSupport() == false) {
			alert("HTML5 file upload not fully supported!");
			return;
		} else {
			console.log("HTML5 file upload fully supported.");
		}
	}
	

}

function photograb_imageLoaded() {

	console.log("imageLoaded");

	// Should we maybe resize based on the image size?
	console.log(photograb_img.width, photograb_img.height);

	// Need to do something hear to clear the canvas to transparent...
	theApp.context.fillStyle = "rgba(0, 0, 0, 1)";
	theApp.context.fillRect(0, 0, theApp.theCanvas.width, theApp.theCanvas.width);
	theApp.context.fillStyle = "rgba(255, 255, 255, 0)";
	theApp.context.fillRect(0, 0, theApp.theCanvas.width, theApp.theCanvas.width);
	theApp.context.drawImage(photograb_img, 0, 0);
	
}
	
function handlefiles(tf){
	console.log("handlefiles got ", tf.length, " files");	

	photograb_img = new Image();
	photograb_img.name = "thingy";
	photograb_img.classList.add("obj");
	photograb_img.file = tf[0];
	$(photograb_img).load(photograb_imageLoaded);
	console.log("grabbing ", photograb_img.file);
	 
	var reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(photograb_img);
	reader.readAsDataURL(tf[0]);
	while (reader.readyState == false) {
		var x = 1;
	}
	console.log(photograb_img);
	return;
}