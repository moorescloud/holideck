/*
	@file: apps/settings/settings.js
*/

function settings() {
	
	console.log("function settings()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	
	// Start App
	function appStart() {
		console.log("settings.appStart");
		$('head').append('<link rel="stylesheet" href="settings.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("settings.appQuit");
	}
}
