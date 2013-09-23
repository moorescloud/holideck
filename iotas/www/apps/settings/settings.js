function settings() {
	
	console.log("function settings()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	
	// Start App
	function appStart() {
		console.log("settings.appStart");
		//$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
		//$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
		$('head').append('<link rel="stylesheet" href="settings.css" />'); // Muy importante!
	}
	
	// Quit App
	function appQuit() {
		console.log("settings.appQuit");
	}
}
