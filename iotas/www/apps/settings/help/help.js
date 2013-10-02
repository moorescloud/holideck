/*
	@file: apps/settings/help/help.js
*/

function help() {
	
	console.log("function help()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;

	// Start App
	function appStart() {
		console.log("help.appStart");
		$("head").append('<link rel="stylesheet" href="help.css" />');
	}
	
	// Quit App
	function appQuit() {
		console.log("help.appQuit");
	}
	
}
