function developer() {
	
	console.log("function developer()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.checkDevMode = checkDevMode;
	this.gotDevMode = gotDevMode;
	this.devModeOn = devModeOn;
	this.devModeOff = devModeOff;

	// Start App
	function appStart() {
		console.log("developer.appStart");
		$("head").append('<link rel="stylesheet" href="developer.css" />');
		theApp.checkDevMode();
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
		var mode = currentLight.getdevmode(theApp.gotDevMode);
		return;
	}

	function gotDevMode(mode) {
		// Callback executed when we know what the mode actually is.
		console.log('developer.gotDevMode')
		console.log(mode);

		// Flip the switch to reflect the current state of things, shall we?
		if (mode == false) {
			console.log('Forcing slider off');
			$('#developer-flip').val('off');
			$('#developer-flip').slider('refresh');
		} else {
			console.log('Forcing slider on');
			$('#developer-flip').val('on');
			$('#developer-flip').slider('refresh');
		}

	}

	function devModeOn() {
		console.log("devModeOn");
		if (currentLight.setdevmode(true) == false) {
			theApp.checkDevMode();			// Reset to actual state if failure
		}
		return;
	}

	function devModeOff() {
		console.log("devModeOff");
		if (currentLight.setdevmode(false) == false) {
			theApp.checkDevMode();			// Rest to actual state if failure
		}
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
