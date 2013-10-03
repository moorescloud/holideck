/*
	@file: apps/colorwheel/colorwheel.js
*/

function colorwheel() {
	
	// canvas & context
	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	
	//this.mouseX = 0;
	//this.mouseY = 0;
	
	// pick & complement globals 
	this.pickR = 0;
	this.pickG = 0;
	this.pickB = 0;
	this.complementR = 0;
	this.complementG = 0;
	this.complementB = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	
	//this.fillPick = fillPick;
	//this.fillComp = fillComp;
	//this.onMouseMove = onMouseMove;
	//this.onMouseClick = onMouseClick;
	//this.onCompClick = onCompClick;
	//this.onTouchMove = onTouchMove;
	//this.onTouchStart = onTouchStart;
	
	function appStart() {
		console.log("colorwheel.appStart");
		$("head").append('<link rel="stylesheet" href="colorwheel.css" />');
		setCanvasImage()
	}
	
	function appQuit() {
		// log the function
		console.log("colorwheel.appQuit");
	}
	
	function setCanvasImage() {
		console.log("colorwheel.setCanvasImage");
		var canvasImage = new Image();
		canvasImage.onload = function() {
			var x = 0;
			var y = 0;
			var wh = $('.selector').innerWidth();
			$('#canvas').attr('width', wh);
			$('#canvas').attr('height', wh);
			theApp.context.drawImage(canvasImage, x, y, wh, wh);
		};
		canvasImage.src="colorwheel.png";
	}
	
	$(window).resize(setCanvasImage);
	
	$('#canvas').mousemove(function(e) {
	  var pos = getPageOffset(this);
	  var x = e.pageX - pos.x;
	  var y = e.pageY - pos.y;
	  var c = this.getContext('2d');
	  var p = c.getImageData(x, y, 1, 1).data; 
	  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	  $('.radar p').html("X: " + x + " Y: " + y + " Hex: " + hex);
	  $(".hover").css('background-color', hex);
	});
	
	$('#canvas').mouseup(function(e) {
	  var pos = getPageOffset(this);
	  var x = e.pageX - pos.x;
	  var y = e.pageY - pos.y;
	  var c = this.getContext('2d');
	  var p = c.getImageData(x, y, 1, 1).data;
	  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	  $(".pick").css('background-color', hex);
	  var hexy = "#" + ("000000" + rgbToHex(255 - p[0], 255 - p[1], 255 - p[2])).slice(-6);
	  $(".complement").css('background-color', hexy);
	  theApp.pickR = p[0]
		theApp.pickG = p[1]
		theApp.pickB = p[2]
	  theApp.complementR = 255 - p[0]
		theApp.complementG = 255 - p[1]
		theApp.complementB = 255 - p[2]
	  currentLight.setlamp(p[0], p[1], p[2]);
	});
	
	$('#canvas').touchstart(function(e) {
		e.preventDefault();
	  var pos = getPageOffset(this);
	  var x = e.pageX - pos.x;
	  var y = e.pageY - pos.y;
	  var c = this.getContext('2d');
	  var p = c.getImageData(x, y, 1, 1).data;
	  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	  $(".pick").css('background-color', hex);
	  var hexy = "#" + ("000000" + rgbToHex(255 - p[0], 255 - p[1], 255 - p[2])).slice(-6);
	  $(".complement").css('background-color', hexy);
	  theApp.pickR = p[0]
		theApp.pickG = p[1]
		theApp.pickB = p[2]
	  theApp.complementR = 255 - p[0]
		theApp.complementG = 255 - p[1]
		theApp.complementB = 255 - p[2]
	  currentLight.setlamp(p[0], p[1], p[2]);
	});
	
/*
	function onTouchStart(e) {
		var touch = e.touches[0];
		var pos = getPageOffset(touch);
		var x = touch.pageX - pos.x;
	  var y = touch.pageY - pos.y;
	  var coord = "x = " + x + ", y = " + y;
	  var c = this.getContext('2d');
	  var p = c.getImageData(x, y, 1, 1).data;
	  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	  $(".pick").css('background-color', hex);
	  var hexy = "#" + ("000000" + rgbToHex(255 - p[0], 255 - p[1], 255 - p[2])).slice(-6);
	  $(".complement").css('background-color', hexy);
	  theApp.pickR = p[0]
		theApp.pickG = p[1]
		theApp.pickB = p[2]
	  theApp.complementR = 255 - p[0]
		theApp.complementG = 255 - p[1]
		theApp.complementB = 255 - p[2]
	  currentLight.setlamp(p[0], p[1], p[2]);
		
/* 		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft; */
/* 		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop; */
/* 		console.log("mouseX " + theApp.mouseX + " mouseY " + theApp.mouseY);   */
/* 		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1); */
/* 		var red = imageData.data[0]; */
/* 		var green = imageData.data[1]; */
/* 		var blue = imageData.data[2]; */
/* 		console.log("onTouchStart: rgb(" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")") */
/* 		fillPick(imageData.data[0], imageData.data[1], imageData.data[2]); */
/* 		fillComp(imageData.data[0], imageData.data[1], imageData.data[2]); */
/* 		currentLight.setlamp(red, green, blue); */
		
/* 		theApp.lastTouch = new Date().getTime();	 */
/* 	} */
/* */ 
	
/*
	function onTouchMove(e) {
		console.log("colorwheel.onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			console.log("Accepting onTouchMove");
			theApp.onTouchStart(e);
		} else {
			console.log("Declining onTouchMove");
		}
	}
*/
	
	$(".pick").click(function(){
		console.log("colorwheel.pickClick");
		currentLight.setlamp( theApp.pickR, theApp.pickG, theApp.pickB );
	})
	
	$(".complement").click(function(){
		console.log("colorwheel.complementClick");
		currentLight.setlamp( theApp.complementR, theApp.complementG, theApp.complementB );
	})
	
	function getPageOffset(obj) {
	  var cursorX = 0, cursorY = 0;
	  if (obj.offsetParent) {
	    do {
	      cursorX += obj.offsetLeft;
	      cursorY += obj.offsetTop;
	    } while (obj = obj.offsetParent);
	    return { x: cursorX, y: cursorY };
	  }
	  return undefined;
	}
	
	function rgbToHex(r, g, b) {
		if (r > 255 || g > 255 || b > 255)
	    throw "Invalid";
		return ((r << 16) | (g << 8) | b).toString(16);
	}
	
	/* 	--- */
		
/* 	function fillPick(red, green, blue){ */
		/*
		redstr = red.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		var pick = "#" + redstr + greenstr + bluestr;
		console.log("fillPick: " + pick);
		$(".pick").css('background-color', pick);
		*/
/* 	} */
	
/* 	function fillComp(red, green, blue){ */
		/*
			theApp.compR = red = 255 - red;
		theApp.compG = green = 255 - green;
		theApp.compB = blue = 255 - blue;
		//console.log(red, green, blue)
		redstr = red.toString(16);
		//console.log(redstr);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		//console.log(redstr);
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		var complement = "#" + redstr + greenstr + bluestr;
		console.log("fillComp: " + complement);
		$(".complement").css('background-color', complement);
		*/
/* 	}	 */
	
/* 	function onMouseMove(e) { */
		
		//theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		//theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);
		
		/*
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
		*/
		
/* 	} */
	
/* 	function onMouseClick(e) { */
		
		//theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		//theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);	
		
		/*
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
		console.log("mouseX: " + theApp.mouseX + ", mouseY: " + theApp.mouseY);  
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = imageData.data[0];
		var green = imageData.data[1];
		var blue = imageData.data[2];
		console.log("onMouseClick: #" + red.toString(16) + green.toString(16) + blue.toString(16));
		fillPick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillComp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
		*/
/* 	} */

/* 	function onCompClick(e) { */
		/*
		var red = compR;
		var green = compG;
		var blue = compB;
		console.log("onCompClick: rgb(" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
		*/
/* 	} */
	
/* 	function onTouchStart(e) { */
		/*
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY);
		//theApp.mouseX = touch.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		//theApp.mouseY = touch.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);
		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop;
		console.log("mouseX " + theApp.mouseX + " mouseY " + theApp.mouseY);  
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		//var red = (imageData.data[0] >> 1);
		//var green = (imageData.data[1] >> 1);
		//var blue = (imageData.data[2] >> 1);
		var red = imageData.data[0];
		var green = imageData.data[1];
		var blue = imageData.data[2];
		console.log("onTouchStart: rgb(" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		fillPick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillComp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
		theApp.lastTouch = new Date().getTime();
		*/
/* 	} */
	
/* 	function onTouchMove(e) { */
/*
		console.log("colorwheel.onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			console.log("Accepting onTouchMove");
			theApp.onTouchStart(e);
		} else {
			console.log("Declining onTouchMove");
		}
*/
/* 	} */
		
	//this.theCanvas.addEventListener("mousemove", this.onMouseMove, false);
	//this.theCanvas.addEventListener("click", this.onMouseClick, false);
	//this.theCanvas.addEventListener("touchstart", this.onTouchStart, false);
	//this.theCanvas.addEventListener("touchmove", this.onTouchMove, false);
	
}

	
