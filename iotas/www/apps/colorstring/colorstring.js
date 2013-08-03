function colorstring() {
	
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

	this.globe = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.colorstringLoaded = colorstringLoaded;
	this.changeString = changeString;
	this.onMouseMove = onMouseMove;
	this.onMouseClick = onMouseClick;
	this.onTouchMove = onTouchMove;
	this.onTouchStart = onTouchStart;
	
	function appStart() {
		console.log("colorstring.appStart");
		this.tileSheet=new Image();
		$(this.tileSheet).load(colorstringLoaded);
		this.tileSheet.src="colorstring.png";
	}
	
	function appQuit() {
		console.log("colorstring.appQuit");
	}
	
	function colorstringLoaded() {
		console.log("colorstring.colorstringLoaded");
		theApp.context.drawImage(theApp.tileSheet, 0, 0);	
	}	
	
	function changeString(r, g, b) {

		// if globe is 0, we'll set the entire string
		// if globe is set to another value, we'll only set a single globe
		// then we render it
		// Simple, no?
		if (theApp.globe == 0) {
			currentLight.fastsetall(r,g,b);
		} else {
			currentLight.fastset(r, g, b, theApp.globe - 1);
		}
		currentLight.fastlights();	
	}

	function onMouseMove(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
	}
	
	function onMouseClick(e) {	
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;
		//console.log("mouseX: " + theApp.mouseX + ", mouseY: " + theApp.mouseY);  
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1);
		var green = (imageData.data[1] >> 1);
		var blue = (imageData.data[2] >> 1);
		//console.log("onMouseClick: #" + red.toString(16) + green.toString(16) + blue.toString(16));
		theApp.changeString(red, green, blue);
	}
	
	function onTouchStart(e) {
		var touch = e.touches[0];
		//console.log("onTouchStart", touch.clientX, touch.clientY);
		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop;
		console.log("mouseX " + theApp.mouseX + " mouseY " + theApp.mouseY);  
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1);
		var green = (imageData.data[1] >> 1);
		var blue = (imageData.data[2] >> 1);
		//console.log("onTouchStart: rgb(" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		theApp.changeString(red, green, blue);
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
	
	$('#globe').change(function() {
		console.log('Menu changed');
		console.log($(this).val());
		theApp.globe = $(this).val();
	})
}

	
