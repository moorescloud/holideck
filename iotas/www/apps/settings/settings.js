function settings() {
	
	console.log("function settings()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.settingsGet = settingsGet;
	this.settingsSet = settingsSet;
	
	// Start App
	function appStart() {
		console.log("settings.appStart");
	}
	
	// Quit App
	function appQuit() {
		console.log("settings.appQuit");
	}
	
	// Get Settings 
	function settingsGet() {
		console.log("settings.settingsGet");
		//
		// Insert IoTAS Code
		//
	}
	
	// Set Settings 
	function settingsSet() {
		console.log("settings.settingsSet");
		//
		// Insert IoTAS Code
		//
	}
	
	// Click Join
	$("#join").click(function () {
		$("#password").popup( "close" );
	});
	
}
