function developer() {
	
	console.log("function apidemo()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.devModeOn = devModeOn;
	this.devModeOff = devModeOff;

	// Start App
	function appStart() {
		console.log("developer.appStart");
		$("head").append('<link rel="stylesheet" href="developer.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("developer.appQuit");
		if (theApp.counter != null) {
			clearInterval(theApp.counter);
		}
		theApp.counter = null;
	}

	function checkDevMode() {
		// Make an IoTAS call to return the state of device's developer mode
		// Use that result to flip the switch so it's reflective of the device state.

	}

	function devModeOn() {
		console.log("devModeOn");
		return;
	}

	function devModeOff() {
		console.log("devModeOff");
		return;
	}

	// Flip Listener	
	$("#developer-flip").on("change", function(e){
		
		var flipValue = $("#developer-flip").val();
		
		if(flipValue == "on") {
			//console.log("switch start");
			theApp.devModeOn();
		} else if(flipValue == "off") {
		  //console.log("switch stop");
		  theApp.devModeOff();
		} else {
			console.log("switch error");
		}
	});
	
}
