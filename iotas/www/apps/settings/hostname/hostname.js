function hostname() {
	
	console.log("function hostname()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.gethostname = gethostname;
	this.sethostname = sethostname;

	// Start App
	function appStart() {
		console.log("hostname.appStart");
		$("head").append('<link rel="stylesheet" href="hostname.css" />');
		theApp.gethostname();
	}
	
	// Quit App
	function appQuit() {
		console.log("hostname.appQuit");
		if (theApp.counter != null) {
			clearInterval(theApp.counter);
		}
		theApp.counter = null;
	}

	function gethostname() {
		// Make an IoTAS call to return the state of device's hostname mode
		// Use that result to flip the switch so it's reflective of the device state.
		console.log('gethostname');
		$.ajax({
			type: "GET",
			url: currentLight.urlbase + '/iotas/0.1/device/moorescloud.holiday/localhost/hostname', 
			success: function(data, status, settings) 
			{ 
				dj = JSON.parse(data); 
				theApp.thehostname = dj.hostname;
				console.log("Received hostname " + theApp.thehostname);

				// Now set the value of the field to that.
				$('#hostnametext').val(theApp.thehostname);
			},
			error: function() 
			{
				console.log("gethostname did not end well.");
			}
		});
	}
	
	function sethostname(theName)
	{
		console.log("Will be setting hostname to " + theName);
		var payload = new Object();
		payload.hostname = theName;
		console.log(payload);

		$.ajax({
			type: "PUT",
			url: currentLight.urlbase + '/iotas/0.1/device/moorescloud.holiday/localhost/hostname', 
			data: JSON.stringify(payload),
			success: function() 
			{ 
				console.log("Device name successfully changed to " + theName);
			},
			error: function() 
			{
				console.log("sethostname did not end well.");
				// We should throw up an error dialog here.
			}
		});
		return;
	}

	// Button Listener	
	$("#setbutton").on("click", function(e){
		
		console.log("setbutton.click");
		var newhostname = $('#hostnametext').val();
		theApp.sethostname(newhostname);

	});


}
