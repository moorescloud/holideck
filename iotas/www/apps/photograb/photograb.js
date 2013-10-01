/*
	@file: apps/photograb/photograb.js
*/

var photograb_img = null;

// Every app has an object
function photograb() {

	console.log('instancing photograb object');

	function appStart() {
		console.log("photograb.appStart");
		//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
		//$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
		$('head').append('<link rel="stylesheet" href="photograb.css" />'); // Muy importante!
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
	
	this.theRed = 0;
	this.theGreen = 0;
	this.theBlue = 0;

	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	console.log("Got context");
	console.log(screen.width, screen.height);

	// Fill the canvas area with black methinks
	$("#canvas").css('background-color', '#000');

	this.thePainter = document.getElementById('paintarea');
	this.painterContext = this.thePainter.getContext('2d');
	console.log("Got painter");

	// Fill the painter area with dark gray methinks
	this.drawPaintArea = drawPaintArea;
	this.clr2hex = clr2hex;
	$("#paintarea").css('background-color', '#3f3f3f');
	
	this.theCanvas.addEventListener("mousemove", onSampMouseMove, false);
	this.theCanvas.addEventListener("click", onSampMouseClick, false);
	this.theCanvas.addEventListener("touchstart", onSampTouchStart, false);
	this.theCanvas.addEventListener("touchmove", onSampTouchMove, false);

	this.thePainter.addEventListener("mousemove", onPaintMouseMove, false);
	this.thePainter.addEventListener("click", onPaintMouseClick, false);
	this.thePainter.addEventListener("touchstart", onPaintTouchStart, false);
	this.thePainter.addEventListener("touchmove", onPaintTouchMove, false);	

	function drawPaintArea() {
		// Take the fastlights values and render them to the paint area
		// This should reflect any user strokes to the paint area. We hope.

		// First of all draw the background of the area, hmm?
		var w = theApp.thePainter.width;
		var h = theApp.thePainter.height;

		// Divide the width by 50 to do some layout stuffs
		var i = w / 50.0;

		var startWidth = 0;

		for (var j=0; j < 50; j++) {

			// Go through all the globes, in order
			var clr = currentLight.fastbulbs[j];	// Get the color
			var clh = theApp.clr2hex(clr);	// As a # hex value
			//console.log(clh);

			// Now create a tiny rectangle and fill it with the color of the globe
			theApp.painterContext.beginPath();
			theApp.painterContext.rect(startWidth, 0, i, h);
			theApp.painterContext.fillStyle = clh;
			theApp.painterContext.fill();

			startWidth += i;

		}

		// Now draw an outline box around the paint area, in the current colour selection
		redstr = theApp.theRed.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}

		greenstr = theApp.theGreen.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}

		bluestr = theApp.theBlue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		clh = "#" + redstr + greenstr + bluestr;	
		theApp.painterContext.beginPath();
		theApp.painterContext.rect(0, 0, w, h);
		theApp.painterContext.lineWidth = 4;
		theApp.painterContext.strokeStyle = clh;
		theApp.painterContext.stroke();

	}

	function clr2hex(clr) {
	
		r = clr >> 16;
		redstr = r.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}

		g = (clr >> 8) & 0xff;
		greenstr = g.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}

		b = clr & 0xff;
		bluestr = b.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}	
		return "#" + redstr + greenstr + bluestr;
	}

	function onPaintMouseMove(e) {
		console.log('onPaintMouseMove');
	}

	function onPaintMouseClick(e) {
		console.log('onPaintMouseClick');
		console.log(theApp.theRed, theApp.theGreen, theApp.theBlue);

		// Figure out where we are in order to know what globe to light up.
		theApp.mouseX = e.clientX - theApp.thePainter.offsetLeft;
		theApp.mouseY = e.clientY - theApp.thePainter.offsetTop;

		// First of all draw the background of the area, hmm?
		var w = theApp.thePainter.width;
		var h = theApp.thePainter.height;

		// Divide the width by 50 to do some layout stuffs
		var i = w / 50.0;

		// Now the mouseX should be some integer multiple of i, we'd hope...
		var theGlobe = Math.floor(theApp.mouseX / i)
		//console.log(theApp.mouseX, i, Math.floor(theApp.mouseX / i));

		// Put the current colour into the globe, then referesherate everything.
		if (theGlobe >= 0 && theGlobe < 50) {
			currentLight.fastset(theApp.theRed, theApp.theGreen, theApp.theBlue, theGlobe);
		}

		theApp.drawPaintArea();
		currentLight.fastlights();

	}

	function onPaintTouchStart(e) {

		var touch = e.touches[0];
		console.log("onPaintTouchStart", touch.clientX, touch.clientY );
		theApp.mouseX = touch.clientX - theApp.thePainter.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.thePainter.offsetTop;

		console.log("paint touch: " + theApp.mouseX + "," + theApp.mouseY);

		// First of all draw the background of the area, hmm?
		var w = theApp.thePainter.width;
		var h = theApp.thePainter.height;

		// Divide the width by 50 to do some layout stuffs
		var i = w / 50.0;

		// Now the mouseX should be some integer multiple of i, we'd hope...
		var theGlobe = Math.floor(theApp.mouseX / i)
		//console.log(theApp.mouseX, i, Math.floor(theApp.mouseX / i));

		var currTouch = new Date().getTime();

		// Put the current colour into the globe, then referesherate everything.
		if (theGlobe >= 0 && theGlobe < 50) {
			if ((currTouch - theApp.lastTouch) > 50 ) {	// Max 20hz refresh rate
				currentLight.fastset(theApp.theRed, theApp.theGreen, theApp.theBlue, theGlobe);
				theApp.lastTouch = currTouch;
			}
		}

		theApp.drawPaintArea();
		currentLight.fastlights();

	}

	function onPaintTouchMove(e) {
		console.log('onPaintTouchMove');
		event.preventDefault();
		onPaintTouchStart(e);
		/*curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			onSampTouchStart(e);
		} else {
			console.log("ignoring");
		}*/
	}

	function onSampMouseMove(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;

	}
	
	function onSampMouseClick(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;

		console.log("click: " + theApp.mouseX + "," + theApp.mouseY);   
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = theApp.theRed = imageData.data[0];
		var green = theApp.theGreen = imageData.data[1];
		var blue = theApp.theBlue = imageData.data[2];
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		//currentLight.setlamp(red, green, blue);
		theApp.drawPaintArea();
	}

	function onSampTouchStart(e) {
		event.preventDefault();
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY );
		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop;
		console.log("touch: " + theApp.mouseX + "," + theApp.mouseY);
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = theApp.theRed = imageData.data[0];
		var green = theApp.theGreen = imageData.data[1];
		var blue = theApp.theBlue = imageData.data[2];
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		//currentLight.setlamp(red, green, blue);
		theApp.drawPaintArea();
		theApp.lastTouch = new Date().getTime();
	}
	
	function onSampTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 50) {
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

// function photograb_imageLoaded() {

// 	console.log("imageLoaded");

// 	// Should we maybe resize based on the image size?
// 	//console.log(photograb_img);
// 	console.log(photograb_img.width, photograb_img.height);

// 	// OK let's try a little resizery here
// 	// First, figure out which dimension ain't gonna scale.
// 	/*var scale_width = theApp.theCanvas.width / photograb_img.width;
// 	var scale_height = theApp.theCanvas.height / photograb_img.height;

// 	// The smaller of the ratios is the one that should command our attention
// 	if (scale_width <= scale_height) {*/

// 		//var scale = theApp.theCanvas.width / photograb_img.width;
// 		//photograb_img.setAttribute('width', Math.floor(photograb_img.width * scale));
// 		//photograb_img.height = Math.floor(photograb_img.height * scale);

// 	} else {

// 		var scale = theApp.theCanvas.height / photograb_img.height;
// 		photograb_img.setAttribute('width', Math.floor(photograb_img.width * scale));
// 		photograb_img.height = Math.floor(photograb_img.height * scale);

// 	}

// 	console.log(photograb_img.width, photograb_img.height);

// 	// Need to do something hear to clear the canvas to transparent...
// 	theApp.context.fillStyle = "rgba(0, 0, 0, 1)";
// 	theApp.context.fillRect(0, 0, theApp.theCanvas.width, theApp.theCanvas.width);
// 	theApp.context.fillStyle = "rgba(255, 255, 255, 0)";
// 	theApp.context.fillRect(0, 0, theApp.theCanvas.width, theApp.theCanvas.width);
// 	//theApp.context.drawImage(photograb_img, 0, 0, 290, 290);
// 	theApp.context.drawImage(photograb_img, 0, 0, photograb_img.width, photograb_img.height,
// 		0, 0, theApp.theCanvas.width, theApp.theCanvas.height);


// 	theApp.drawPaintArea();
	
// }
	
/*function handlefiles(tf){
	console.log("handlefiles got ", tf.length, " files");	

	photograb_img = new Image();
	photograb_img.name = "a_photo";
	photograb_img.classList.add("obj");
	photograb_img.file = tf[0];
	$(photograb_img).load(photograb_imageLoaded);
	//console.log("grabbing ", photograb_img.file);
	 
	var reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(photograb_img);
	reader.readAsDataURL(tf[0]);
	while (reader.readyState == false) {
		var x = 1;
	}

	//console.log(photograb_img);
	return;
}*/

function handlefiles(tf){
	console.log("handlefiles got ", tf.length, " files");	

	var file = tf[0];
	var mpImg = new MegaPixImage(file);

	var resCanvas1 = document.getElementById('canvas');
	console.log("dimensions: ", theApp.theCanvas.width, theApp.theCanvas.height)
	mpImg.render(resCanvas1, { maxWidth: theApp.theCanvas.width, maxHeight: theApp.theCanvas.height });
	theApp.drawPaintArea();

	return;
}