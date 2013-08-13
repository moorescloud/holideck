function rainbow() {
	
	console.log("function rainbow()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.demoStart = demoStart;
	this.demoStop = demoStop;
	this.running = false;
		
	// Start App
	function appStart() {
		console.log("rainbow.appStart");
		$("head").append('<link rel="stylesheet" href="rainbow.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("rainbow.appQuit");
		if (theApp.running) {
			currentLight.rainbow(false);
			theApp.running = false;
		}
	}
	
	// Start Demo 
	function demoStart() {
		
		//
		// Insert IoTAS Code
		//
		console.log("rainbow.demoStart");
		if (theApp.running == false) {
			theApp.running = true;
			currentLight.rainbow(true);
		}
	}
	
	// Stop Demo 
	function demoStop() {
		
		//
		// Insert IoTAS Code
		//
		console.log("rainbow.demoStop");
		currentLight.rainbow(false);
		theApp.running = false;

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
