/*
	@file: apps/settings/moorescloud/moorescloud.js
*/

function moorescloud() {
	
	console.log("function about()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;

	// Start App
	function appStart() {
		console.log("about.appStart");
		$("head").append('<link rel="stylesheet" href="moorescloud.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("about.appQuit");
		if (theApp.counter != null) {
			clearInterval(theApp.counter);
		}
		theApp.counter = null;
	}
	
}
