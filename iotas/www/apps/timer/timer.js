function timer() {
	
	console.log("function timer()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
		
	// Start App
	function appStart() {
		console.log("timer.appStart");
	}
	
	// Quit App
	function appQuit() {
		console.log("timer.appQuit");
	}
	
	// Set Timer
	function setTimer(x, y) {
		
		console.log("timer.setTimer(" + x + ", " + y + ")");
		
		//
		// Insert IoTAS Code
		//
		// Unknown what time format the iPhone will send, at this stage
		// Also need to think about what signals IoTAS sends back
		// With a view to making the UI behave sensibly
		
	}
	
	// Timer Listener
	$("#timerset").click(function(){
		
		console.log("Set Timer Clicked");
		
		var time_start = $("#time_start").val();
		console.log(time_start);
		
		var time_stop = $("#time_stop").val();
		console.log(time_stop);
		
		// Send
		setTimer(time_start, time_stop);
		
		// Disable the Set Timer button
		// Tick tock the Timer in some visual way
		// Respond to a time_stop event …
		
	});
	
}
