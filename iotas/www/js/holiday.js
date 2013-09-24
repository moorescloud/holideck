// JavasScript library for Holiday by MooresCloud
//
// Simple object definitions to make it easy to use the Light from Javascript
// REQUIRES JQuery - so make sure you have included it!
//

// Constructor method for the holiday
// Requires a string 'address' (i.e. IP address 192.168.0.20) or resolvable name (i.e. 'light.local')
function Holiday(address) {
	this.address = address;
	if (address.length == 0) {
		this.urlbase = "";
	} else {
		this.urlbase = "http://" + this.address;
	}
	
	this.rgbtocolor = rgbtocolor;
	this.rgb2hex = rgb2hex;
	this.setlamp = setlamp;
	this.gradient = gradient;
	this.sendcmd = sendcmd;
	this.sendcmdparam = sendcmdparam;
	this.gethostname = gethostname;
	this.sethostname = sethostname;
	this.getdevmode = getdevmode;
	this.setdevmode = setdevmode;
	this.getUpdates = getUpdates;
	this.doUpdates = doUpdates;

 	this.fastlights = fastlights;
	var fastbulbs = [ 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
 						0x000000, 0x000000 ];
 	this.fastbulbs = fastbulbs;
 	this.fastset = fastset;
 	this.fastsetall = fastsetall;
 	this.fast2json = fast2json;
 	this.nrl = nrl;
 	this.afl = afl;
 	this.rainbow = rainbow;
 
	function rgbtocolor(r, g, b) {
	
		redstr = r.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = g.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = b.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}	
		return "0x" + greenstr + redstr + bluestr;
	}

	// Properly
	function rgb2hex(r, g, b) {
	
		redstr = r.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = g.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = b.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}	
		return "#" + redstr + greenstr + bluestr;
	}

	function fastset(r, g, b, bulb) {
		value = (r << 16) + (g << 8) + b;
		this.fastbulbs[bulb] = value;
	}

	function fastsetall(r, g, b) {
		for (var j = 0; j < this.fastbulbs.length; j++) {
			this.fastset(r, g, b, j);
		}	
	}
	
	// Return the array as correctly formatted JSON
	function fast2json() {
		output = "{ \"lights\": [ ";
		for (var j = 0; j < this.fastbulbs.length; j++) {

			// fixed this to yield a full-length string every time
			o_r = (this.fastbulbs[j] >> 16);
			o_g = (this.fastbulbs[j] >> 8) & 0xff;
			o_b = (this.fastbulbs[j] & 0xff);
			output = output + "\"" + rgb2hex(o_r, o_g, o_b) + "\"";
			if ((j+1) != this.fastbulbs.length) {
				output = output + ", ";
			}
		}
		output = output + " ] }";
		return output;
	}
		
	// Send the current bulb values to the light
	function fastlights() {
		var fbulbs = this.fast2json();
		console.log(fbulbs);
		$.ajax({
			type: "PUT",
			processData: false,
			url: this.urlbase + '/device/light/setlights', 
			data: fbulbs 
		});
	}


	// Set the whole lamp to a single color
	function setlamp(r, g, b) {
		var culas = JSON.stringify({"value": [r, g, b]});
		$.ajax({
			type: "PUT",
			url: this.urlbase + '/device/light/value',
			data: culas
		});
	}

	// Run a gradient from the start color to the end color
	// Steps are measured in 1/50th of a second
	function gradient(startR, startG, startB, endR, endG, endB, steps) {
		var grajson = JSON.stringify({"begin": [startR, startG, startB], "end": [endR, endG, endB], "steps": steps})
		$.ajax({
			type: "PUT",
			url: this.urlbase + '/device/light/gradient', 
			data: grajson
		});	
	}

	function nrl(team_number) {
		nrljson = JSON.stringify({"team": team_number});
		$.ajax({
			type: "PUT",
			url: this.urlbase + '/device/holiday/app/nrl', 
			data: nrljson
		});		
	}

	function afl(team_number) {
		nrljson = JSON.stringify({"team": team_number});
		$.ajax({
			type: "PUT",
			url: this.urlbase + '/device/holiday/app/afl', 
			data: nrljson
		});		
	}

	function rainbow(team_number) {
		nrljson = JSON.stringify({"running": team_number});
		$.ajax({
			type: "PUT",
			url: this.urlbase + '/device/holiday/app/rainbow', 
			data: nrljson
		});		
	}

	// Here are Holiday device-specific functions relating to MooresCloud OS
	function gethostname() {
		// Make an IoTAS call to return the state of device's hostname mode
		// Use that result to flip the switch so it's reflective of the device state.
		console.log('holiday.gethostname');
		var rest_url = iotasrv.device_url +  'hostname';


		$.ajax({
			type: "GET",
			async: false,
			url: rest_url, 
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
		console.log('holiday.sethostname');
		console.log("Will be setting hostname to " + theName);
		var payload = new Object();
		payload.hostname = theName;
		console.log(payload);
		var rest_url = iotasrv.device_url +  'hostname';


		$.ajax({
			type: "PUT",
			async: false,
			url: rest_url, 
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

	function getdevmode(doWhenDone) {
		// Make an IoTAS call to return the state of device's developer mode
		// Use that result to flip the switch so it's reflective of the device state.
		// It returns the value of dev mode, a boolean.
		//
		console.log('holiday.getdevmode');
		var rest_url = iotasrv.device_url +  'devmode';
		console.log(rest_url);
		$.ajax({
			type: "GET",
			async: false,
			url: rest_url,
			success: function(data, status, settings) 
			{ 
				var dj = JSON.parse(data); 
				if (dj.devmode == false) {
					console.log("devmode is off")
				} else {
					console.log("devmode is on")
				}
				doWhenDone(dj.devmode);
			},
			error: function() 
			{
				console.log("getdevmode did not end well.");
				// Throw up an error dialog?
			}
		});
	}

	function setdevmode(newMode) {
		console.log('holiday.setdevmode');
		console.log(newMode);
		var payload = new Object();
		payload.devmode = newMode;
		console.log(payload);
		var rest_url = iotasrv.device_url +  'devmode';

		$.ajax({
			type: "PUT",
			async: false,
			url: rest_url,
			data: JSON.stringify(payload),
			success: function() 
			{ 
				console.log("Developer mode successfully changed");
				return true;
			},
			error: function() 
			{
				console.log("setdevmode did not end well.");
				return false;
				// We should throw up an error dialog here.
			}
		});
		return;
	}

	function getUpdates(doWhenDone) {
		// Make an IoTAS call to return the state of device's developer mode
		// Use that result to flip the switch so it's reflective of the device state.
		// It returns the value of dev mode, a boolean.
		//
		console.log('holiday.getUpdates');
		var rest_url = iotasrv.device_url +  'update';
		console.log(rest_url);
		$.ajax({
			type: "GET",
			async: true,
			url: rest_url,
			success: function(data, status, settings) 
			{ 
				var dj = JSON.parse(data); 
				if (dj.update_ready == false) {
					console.log("update test failed");
				} else {
					console.log("update test succeeded");
				}
				if (doWhenDone != null) {
					doWhenDone(dj.update_ready);
				}
			},
			error: function() 
			{
				console.log("getUpdates did not end well.");
				// Throw up an error dialog?
			}
		});
	}

	function doUpdates(doWhenDone) {
		console.log('holiday.setUpdates');
		var rest_url = iotasrv.device_url +  'update';
		console.log(rest_url);
		$.ajax({
			type: "PUT",
			async: true,
			url: rest_url,
			success: function(data, status, settings) 
			{ 
				var dj = JSON.parse(data); 
				if (dj.update_done == false) {
					console.log("updating failed")
				} else {
					console.log("updating succeeded")
				}
				if (doWhenDone != null) {
					doWhenDone(dj.update_done);
				}
			},
			error: function() 
			{
				console.log("setUpdates did not end well.");
				return false;
				// We should throw up an error dialog here.
			}
		});
		return;
	}

	// Legacy, ignored
	//
	function sendcmd(cmdname) {
		return;
	}

	// Legacy, ignored
	//
	function sendcmdparam(cmdname, paramname, paramval) {
		return;
	}
}

