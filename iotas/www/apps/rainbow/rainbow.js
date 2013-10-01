/*
	@file: apps/rainbow/rainbow.js
*/

function rainbow() {
	
	console.log("function rainbow()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.demoStart = demoStart;
	this.demoStop = demoStop;
	this.running = false;
	this.loadTest = loadTest;
		
	// Start App
	function appStart() {
		console.log("rainbow.appStart");
		$("head").append('<link rel="stylesheet" href="rainbow.css" />');
		loadTest();
	}
	
	// Quit App
	function appQuit() {
		console.log("rainbow.appQuit");
		if (theApp.running) {
			currentLight.rainbow(false);
			theApp.running = false;
		}
	}

	function loadrx() {
		console.log("loadrx");
	}

	// Have some fun with JSONP.  What's the worst that could happen?
	function loadTest() {
		console.log("loadTest");
		$.ajax({
	        url: 'http://repo.moorescloud.com/holiday/apps/appoftheday/appoftheday.js',
	        dataType: 'jsonp',
	        crossDomain: true,
	        success: function(data) {
	        	var d = data;
	        	console.log("SUCCESS data:");
	        	console.log(data);
	        },
	        error: function(e) {
	        	console.log("Error on loadTest JSONP");	 // This is happening, who knows why?
	        }
	       });
	}	
	
	// Start Demo 
	function demoStart() {

		//
		// Insert IoTAS Code
		//
		console.log("rainbow.demoStart");
		if (theApp.running == false) {
			theApp.running = true;
			currentLight.rainbow(true);
		}
	}
	
	// Stop Demo 
	function demoStop() {
		
		//
		// Insert IoTAS Code
		//
		console.log("rainbow.demoStop");
		currentLight.rainbow(false);
		theApp.running = false;

	}
	
	// Flip Listener	
	$("#flip").on("change", function(e){
		
		var flipValue = $("#flip").val();
		
		if(flipValue == "start") {
			//console.log("switch start");
			theApp.demoStart();
		} else if(flipValue == "stop") {
		  //console.log("switch stop");
		  theApp.demoStop();
		} else {
			console.log("switch error");
		}
	});
	
}
