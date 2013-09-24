function updates() {
	
	console.log("function updates()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;

	// Start App
	function appStart() {
		console.log("updates.appStart");
		$("head").append('<link rel="stylesheet" href="updates.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("updates.appQuit");
	}
	
}
