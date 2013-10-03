/*
	@file: apps/settings/about/about.js
*/

function about() {
	
	console.log("function about()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.getVersionInfo = getVersionInfo;
	this.holidayProcData = holidayProcData;
	this.swiftProcData = swiftProcData;

	// Start App
	function appStart() {
		console.log("about.appStart");
		$("head").append('<link rel="stylesheet" href="about.css" />');
		theApp.getVersionInfo();
	}
	
	// Quit App
	function appQuit() {
		console.log("about.appQuit");
	}

	// Process the response to the holiday version
	function holidayProcData(replyData) {
		$('#release-version').text('Holiday version: ' + replyData.version.toString());
		return;
	}

	function swiftProcData(replyData) {
		$('#swift-version').text('SWIFT version: ' + replyData.version.toString());
		return;
	}

	function getVersionInfo() {
		$('#iotas-version').text('IoTAS version: ' + iotasrv.vers.toString())
		currentLight.getHolidayVersion(theApp.holidayProcData);
		currentLight.getSwiftVersion(theApp.swiftProcData);
		return;
	}
	
}
