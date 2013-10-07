/*
	@file: apps/colorwheel/colorwheel.js
*/

function colorwheel() {
	
	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	
	this.pickR = 0;
	this.pickG = 0;
	this.pickB = 0;
	this.complementR = 0;
	this.complementG = 0;
	this.complementB = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.getPageOffset = getPageOffset;
	
	function appStart() {
		console.log("colorwheel.appStart");
		$("head").append('<link rel="stylesheet" href="colorwheel.css" />');
		setCanvasImage()
	}
	
	function appQuit() {
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
		console.log('colorwheel.mousemove');
		e.preventDefault();
	  var pos = getPageOffset(this);
	  var x = e.pageX - pos.x;
	  var y = e.pageY - pos.y;
	  var c = this.getContext('2d');
	  var p = c.getImageData(x, y, 1, 1).data; 
	  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	  $('.radar p').html("X: " + x + " Y: " + y + " Hex: " + hex);
	  $(".hover").css('background-color', hex);
	});
	
	$('#canvas').bind('vmousedown', function(e) {
		console.log('colorwheel.vmousedown');
		e.preventDefault();
	  var pos = theApp.getPageOffset(this);
	  var x = e.pageX - pos.x;
	  var y = e.pageY - pos.y;
	  var p = theApp.context.getImageData(x, y, 1, 1).data;
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
	  theApp.lastTouch = new Date().getTime();
	});
	
	$('#canvas').bind('touchmove', function(e) {
		console.log("colorwheel.touchmove");
		console.log(e);
		e.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			  console.log("Accepting touchmove");
	 		  var touchpt = e.originalEvent.touches[0];
			  var pos = theApp.getPageOffset(this);
			  var x = touchpt.pageX - pos.x;
			  var y = touchpt.pageY - pos.y;
			  var c = document.getElementById('canvas').getContext('2d');
			  console.log(x, y);
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
			  theApp.lastTouch = curr;
		} /*else {
			console.log("Declining touchmove");
		}*/
	});
	
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
}

	
