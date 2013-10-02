/*
	@file: apps/colorwheel/colorwheel.js
*/

function colorwheel() {
	
	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	
	//this.thePicked = document.getElementById('picked');
	//this.pickcontext = this.thePicked.getContext('2d');
	
	//this.theComplement = document.getElementById('complement');
	//this.compcontext = this.theComplement.getContext('2d');
	
	this.mouseX = 0;
	this.mouseY = 0;
	this.compR = 0;
	this.compG = 0;
	this.compB = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.fillPick = fillPick;
	this.fillComp = fillComp;
	this.onMouseMove = onMouseMove;
	this.onMouseClick = onMouseClick;
	this.onCompClick = onCompClick;
	this.onTouchMove = onTouchMove;
	this.onTouchStart = onTouchStart;
	
	function appStart() {
		console.log("colorwheel.appStart");
		$("head").append('<link rel="stylesheet" href="colorwheel.css" />');
		this.tileSheet=new Image();
		$(this.tileSheet).load(colorwheelLoaded);
		this.tileSheet.src="colorwheel.png";
	}
	
	function appQuit() {
		console.log("colorwheel.appQuit");
	}
	
	function colorwheelLoaded() {
		console.log("colorwheel.colorwheelLoaded");
		theApp.context.drawImage(theApp.tileSheet, 0, 0, theApp.theCanvas.width, theApp.theCanvas.height);	
	}
	
	function fillPick(red, green, blue){
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
		//theApp.pickcontext.fillStyle="#" + redstr + greenstr + bluestr;
		//theApp.pickcontext.fillRect(0,0,350,100);
		var pick = "#" + redstr + greenstr + bluestr;
		console.log("fillPick: " + pick);
		$(".pick").css('background-color', pick);
	}
	
	function fillComp(red, green, blue){
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
		//fs = "#" + redstr + greenstr + bluestr;
		//theApp.compcontext.fillStyle=fs;
		//theApp.compcontext.fillRect(0,0,350,100);
		var complement = "#" + redstr + greenstr + bluestr;
		console.log("fillComp: " + complement);
		$(".complement").css('background-color', complement);
	}	
	
	function onMouseMove(e) {
		//theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		//theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
	}
	
	function onMouseClick(e) {

		//theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		//theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);	
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
		console.log("mouseX: " + theApp.mouseX + ", mouseY: " + theApp.mouseY);  
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		//var red = (imageData.data[0] >> 1);
		//var green = (imageData.data[1] >> 1);
		//var blue = (imageData.data[2] >> 1);
		var red = imageData.data[0];
		var green = imageData.data[1];
		var blue = imageData.data[2];
		console.log("onMouseClick: #" + red.toString(16) + green.toString(16) + blue.toString(16));
		fillPick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillComp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
	}

	function onCompClick(e) {
		//var red = (compR >> 1);
		//var green = (compG >> 1);
		//var blue = (compB >> 1);
		var red = compR;
		var green = compG;
		var blue = compB;
		console.log("onCompClick: rgb(" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
	}
	
	$(".pick").click(function(){
		
		// If the Complement sets the Holiday, the Pick should set it back
		
		//console.log(theApp.compR);
		//console.log(theApp.compG);
		//console.log(theApp.compB);
		
		// WTF Convert what is now fillComp values back to fillPicks!
		
		var oneforthemoneh = (theApp.compR - 255).toString(16);
		if (oneforthemoneh.length < 2) {
			oneforthemoneh = "0" + oneforthemoneh;
		}
		
		var twofortheshow = (theApp.compG - 255).toString(16);
		if (twofortheshow.length < 2) {
			twofortheshow = "0" + twofortheshow;
		}
		
		var threetogetready = (theApp.compB - 255).toString(16);
		if (threetogetready.length < 2) {
			threetogetready = "0" + threetogetready;
		}
		
		console.log("Pick: #" + oneforthemoneh + twofortheshow + threetogetready);
		//currentLight.setlamp(red, green, blue);
		
	})
	
	$(".complement").click(function(){
		
		console.log(theApp.compR);
		console.log(theApp.compG);
		console.log(theApp.compB);
		
		currentLight.setlamp( theApp.compR, theApp.compG, theApp.compB );
		/*var dee = theApp.compR.toString(16);
		if (dee.length < 2) {
			dee = "0" + dee;
		}
		
		var doo = theApp.compG.toString(16);
		if (doo.length < 2) {
			doo = "0" + doo;
		}
		
		var daa = theApp.compB.toString(16);
		if (daa.length < 2) {
			daa = "0" + daa;
		}
		
		console.log("Complement: #" + dee + doo + daa);
		currentLight.setlamp(dee, doo, daa);*/
		
	})
	
	function onTouchStart(e) {
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
	}
	
	function onTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			theApp.onTouchStart(e);
		} else {
			console.log("onTouchMove ignoring");
		}
	}
		
	this.theCanvas.addEventListener("mousemove", this.onMouseMove, false);
	this.theCanvas.addEventListener("click", this.onMouseClick, false);
	this.theCanvas.addEventListener("touchstart", this.onTouchStart, false);
	this.theCanvas.addEventListener("touchmove", this.onTouchMove, false);
	
}

	
