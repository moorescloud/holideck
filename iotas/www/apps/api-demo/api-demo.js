function apidemo() {
	
	console.log("function apidemo()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.demoStart = demoStart;
	this.demoStop = demoStop;
	this.randcv = randcv;
	this.randflip = randflip;
	this.randtrey = randtrey;		
	this.randquint = randquint;
	this.timer = timer;
	this.counter = null;
	this.redwhite = redwhite;	
	
	// Timer 
	function timer() {
	
		theApp.fillarray[theApp.fillindex]();	// Do the appropriate filling algorithm
		/*var c = [0, 0, 0];
		for (var j = 0; j < 52; j++ ) {
			c[0] = theApp.randcv();
			c[1] = theApp.randcv();
			c[2] = theApp.randcv();
			var index = Math.floor((Math.random()*2)+1);
			c[index] = 0;
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();*/
	
	}
	this.greenwhite = greenwhite;
	this.bluewhite = bluewhite;
	this.allcolors = allcolors;
	this.fillarray = [ redwhite, greenwhite, bluewhite, allcolors ];
	this.fillindex = 3;		// Default to allcolors generator

	// Start App
	function appStart() {
		console.log("api-demo.appStart");
		//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
		//$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
		$("head").append('<link rel="stylesheet" href="api-demo.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("api-demo.appQuit");
		if (theApp.counter != null) {
			clearInterval(theApp.counter);
		}
		theApp.counter = null;
	}

	function randcv() { 
		return Math.floor((Math.random()*255)+1); 
	}
	
	// Binary, returns zero or one
	function randflip() {
		return Math.floor(Math.random()*2); 
	}
	
	// Trinary, returns zero, one or two
	function randtrey() {
		return Math.floor(Math.random()*3); 
	}
	
	// Quintary, returns zero, one, two, three, or four
	function randquint() {
		return Math.floor(Math.random()*5); 
	}
		
	function redwhite() {
		var c = [0, 0, 0];
		for (var j = 0; j < 50; j++ ) {
			if (theApp.randquint() == 4) {	// White
				c[0] = 0xe0;
				c[1] = 0xe0;
				c[2] = 0xe0;
			} else {
				if (theApp.randquint() == 3) { // Black
					c[0] = 0x80;
					c[1] = 0x80;
					c[2] = 0x80;
				} else {
					c[0] = 0xff;
					c[1] = 0x00;
					c[2] = 0x00;
				}
			}
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();
	}
	
	function greenwhite() {
		var c = [0, 0, 0];
		for (var j = 0; j < 50; j++ ) {
			if (theApp.randquint() == 4) {	// White
				c[0] = 0xe0;
				c[1] = 0xe0;
				c[2] = 0xe0;
			} else {
				if (theApp.randquint() == 3) { // Black
					c[0] = 0x80;
					c[1] = 0x80;
					c[2] = 0x80;
				} else {
					c[1] = 0xff;
					c[0] = 0x00;
					c[2] = 0x00;
				}
			}
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();
	}
	
	function bluewhite() {
		var c = [0, 0, 0];
		for (var j = 0; j < 50; j++ ) {
			if (theApp.randquint() == 4) {	// White
				c[0] = 0xe0;
				c[1] = 0xe0;
				c[2] = 0xe0;
			} else {
				if (theApp.randquint() == 3) { // Black
					c[0] = 0x80;
					c[1] = 0x80;
					c[2] = 0x80;
				} else {
					c[2] = 0xff;
					c[1] = 0x00;
					c[0] = 0x00;
				}
			}
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();
	}
	
	function allcolors() {
		var c = [0, 0, 0];
		for (var j = 0; j < 50; j++ ) {
			c[0] = theApp.randcv();
			c[1] = theApp.randcv();
			c[2] = theApp.randcv();
			var index = Math.floor((Math.random()*2)+1);
			c[index] = 0;
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();
	}

	// Start Demo 
	function demoStart() {
		
		//
		// Insert IoTAS Code
		//
		console.log("api-demo.demoStart");
		theApp.counter = setInterval(theApp.timer, 500); // run every 500 msec
		
	}
	
	// Stop Demo 
	function demoStop() {
		
		//
		// Insert IoTAS Code
		//
		console.log("api-demo.demoStop");
		clearInterval(theApp.counter);
		theApp.counter = null;
		
	}
	
	function timer() {
	
		theApp.fillarray[theApp.fillindex]();	// Do the appropriate filling algorithm
		/*var c = [0, 0, 0];
		for (var j = 0; j < 52; j++ ) {
			c[0] = theApp.randcv();
			c[1] = theApp.randcv();
			c[2] = theApp.randcv();
			var index = Math.floor((Math.random()*2)+1);
			c[index] = 0;
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();*/
	
	}

	// Flip Listener	
	$("#flip").on("change", function(e){
		
		var flipValue = $("#flip").val();
		
		if(flipValue == "start") {
			//console.log("switch start");
			theApp.demoStart();
		} else if(flipValue == "stop") {
		  //console.log("switch stop");
		  theApp.demoStop();
		} else {
			console.log("switch error");
		}
	});
	
}
