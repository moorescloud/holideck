function lightcompass() {
	
	console.log("function lightcompass()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.startLightCompass = startLightCompass;
	this.deviceOrientationHandler = deviceOrientationHandler;
	this.rotation = null;
	this.updateTimer = null;
	//this.cca = cca;

	// Start App
	function appStart() {
		console.log("lightcompass.appStart");
		$("head").append('<link rel="stylesheet" href="lightcompass.css" />');
		startLightCompass();
	}
	
	// Quit App
	function appQuit() {
		console.log(theApp.cca);
		console.log("lightcompass.appQuit");
		window.clearInterval(theApp.updateTimer);		// And clear the timer
	}
	
	// We'll check the compass every 10th of a second
	// That is, if we can check it at all.
	function startLightCompass() {

		// Test for DeviceOrientationEvent
		if (window.DeviceOrientationEvent) {
		 console.log("DeviceOrientation is supported");
		} else {
			console.log("DeviceOrientation not supported");
			window.alert("LightCompass not supported.");
			return;
		}

		// Set up the something something here
		// Listen for the event and handle DeviceOrientationEvent object
  		window.addEventListener('deviceorientation', function(eventData) {
		    // gamma is the left-to-right tilt in degrees, where right is positive
		    var tiltLR = eventData.gamma;

		    // beta is the front-to-back tilt in degrees, where front is positive
		    var tiltFB = eventData.beta;

		    // alpha is the compass direction the device is facing in degrees
		    var dir = eventData.alpha

		    // call our orientation event handler
		    theApp.deviceOrientationHandler(tiltLR, tiltFB, dir);
		  }, false);

  		// And start an update timer at 1 hz to begin with
  		theApp.updateTimer = window.setInterval(lightCompassUpdate, 1000);

	}

	// The DeviceOrientationEvents are sent here for processing
	// Ignore the left/right front/back events at the moment.
	function deviceOrientationHandler(lr, fb, dir) {
		console.log("deviceOrientationHandler", lr, fb, dir);
		if (dir != null) {
			theApp.rotation = Math.floor(dir);
			grees = theApp.rotation.toString();
		} else {
			var grees = 'null';
		}
		$('#degrees').text(grees);
	}
	
	function lightCompassUpdate() {
		console.log('lightCompassUpdate');

		var cca = [
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 255, 0, 0 ],
			[ 255, 0, 0 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],	
			[ 0, 0, 255 ],
			[ 0, 0, 255 ],			
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 255, 255, 0 ],
			[ 255, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],
			[ 0, 255, 0 ],	
			[ 0, 255, 0 ],
			[ 0, 255, 0 ]	
		];

		// here we translate the rotation value (0 - 360) into a colour
		// Then send that along to the Holiday.  Too easy. 
		if (theApp.rotation == null) {
			var rgb = cca[0];
		} else {
			var rgb = cca[theApp.rotation];
		}
		console.log(rgb);
		currentLight.fastsetall(rgb[0], rgb[1], rgb[2]);
		currentLight.fastlights();
	}
	


}
