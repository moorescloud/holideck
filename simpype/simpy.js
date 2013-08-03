// simpy.js - javascript for simulator using Python
//
// Implements three classes
// Holiday class implements basic JS API for Holiday by MooresCloud
// Sim class implements the simulator 
// Sing class implements the sing Processing-like framework
// In order to make it all work, you instance a Sing object.
//
function Holiday() {
	
	console.log("Instancing simulated Holdiay");

	this.rgbtocolor = rgbtocolor;
	this.rgb2hex = rgb2hex;
	this.bulb2hex = bulb2hex;
	this.setlamp = setlamp;
	this.gradient = gradient;

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

	function bulb2hex(num) {
		r = (this.fastbulbs[num] & 0xFF0000) >> 16;
		g = (this.fastbulbs[num] & 0xFF00) >> 8;
		b = this.fastbulbs[num] & 0xFF;
		return this.rgb2hex(r,g,b);
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
			output = output + "\"" + "#" + this.fastbulbs[j].toString(16) + "\"";
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
}

function Sim() {
	console.log("instancing sim");

	this.theCanvas = document.getElementById("canvas");
	this.theContext = this.theCanvas.getContext("2d");
	this.canvasWidth = 1000;
	this.canvasHeight = 200;
	this.theContext.fillStyle="black";
	this.theContext.fillRect(0,0,this.canvasWidth,this.canvasHeight);
	this.drawscreen = drawscreen;
	this.holiday = new Holiday();

	this.logo = new Image();
	this.logo.src = 'logo.jpg';

	// Array of globe locations, eventually goes here
	this.NUM_GLOBES = 50;
	this.globe_advance = (Math.PI *2) / 50;

	// Initialize everything
	this.globe = new Array();
	for (j = 0; j < this.NUM_GLOBES; j++) {

		// We want to establish an X, Y position for each globe
		// Arranging them all neatly in a circle.
		// This means each is separated by 2pi / 50
		elements = new Array();
		//elements['x'] = 245 + (180 * Math.sin(this.globe_advance * j));
		elements['x'] = (j * 17) + 125;
		//elements['y'] = 245 - (180 * Math.cos(this.globe_advance * j));
		elements['y'] = 80;
		//elements['rgb'] = "#ffffff";
		this.globe[j] = elements;

	}
	this.holiday.fastsetall(0, 0x00, 0xff);
	this.drawscreen();

	function drawscreen() {

		// draw the line connecting the globes
		this.theContext.beginPath();
		this.theContext.moveTo(50, 80);
		this.theContext.lineTo(125 + (49*17), 80); 
		//this.theContext.closePath();
		this.theContext.strokeStyle="white";
		this.theContext.stroke();

		// draw in the logo
		this.theContext.drawImage(this.logo, 20, 40);

		for (j = 0; j < this.NUM_GLOBES; j++) {
			//this.theContext.fillRect(this.globe[j].x, this.globe[j].y, 5, 5);

			//draw a circle
			this.theContext.beginPath();
			this.theContext.arc(this.globe[j].x, this.globe[j].y, 6, 0, Math.PI*2, true); 
			this.theContext.closePath();
			this.theContext.fillStyle = this.holiday.bulb2hex(j);
			this.theContext.fill();
		}
	}
}

function Sing() {

	console.log("Instancing Sing");

	this.setup = setup;
	this.loop = loop;
	this.sim = new Sim();
	this.bulby = 0;
	this.r = 0xFF;
	this.g = 0xFF;
	this.b = 0XFF;

	// In the style of Processing, here's the setup function
	function setup() {
		// Make the initial stuffs here
		app.bulby = 0;
	}

	function loop() {
		// Make a JSON request and expect something like a reasonable reply
		$.ajax({
			type: "GET",
			url: '/bulbs/'
		}).done(function ( data ) {
    		d = $.parseJSON(data);
    		//console.log(d.values);
    		for (j = 0; j < app.sim.NUM_GLOBES; j++) {
    			app.sim.holiday.fastset(d.values[j][0],d.values[j][1],d.values[j][2], j);
    		}
    		app.sim.drawscreen();
  		});
	}

}
// Kick everything off
var app = new Sing();


// Call the setup function once
app.setup();

// Call loop repeatedly
setInterval(function(){app.loop();}, 100);			// 10hz update rate



