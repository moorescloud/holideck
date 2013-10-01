/*
	@file: apps/countdown/countdown.js
*/

function countdown() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.drawCountdown = drawCountdown;
	this.resetCountdown = resetCountdown;
	this.secs_to_time = secs_to_time;
	this.startLight = startLight;
	this.fireLight = fireLight;
	this.timer = timer;
	this.currentLight = currentLight;
	
	function appStart() {
		console.log("countdown.appStart");
		$("head").append('<link rel="stylesheet" href="countdown.css" />');
		this.theCanvas = document.getElementById('canvas');
		this.context = this.theCanvas.getContext('2d');
		this.startcount = 35;
		this.count = this.startcount;
		this.counter = null;
		this.resetCountdown();
	}
	
	function appQuit() {
		console.log("countdown.appQuit");
	}
		
	function drawCountdown() {
		this.context.fillStyle = "black";
		this.context.fillRect(0, 0, this.theCanvas.width, this.theCanvas.height);
		this.context.font = "240px 'Droid Sans'";
		this.context.fillStyle = "white";
		this.context.fillText(this.secs_to_time(this.count), 15, 180);
	}

	function resetCountdown() {
		this.startcount = parseInt($("#countdown-secval").val());
		this.count = this.startcount;
		this.drawCountdown();
	}

	function secs_to_time(t) {
	
		var mins = Math.floor(t/60);
		var secs = t % 60;
		var ss = secs.toString();
		if (ss.length < 2) {
			ss = "0" + ss;
		}
		return mins.toString() + ":" + ss;
	}

	function startLight() {
		currentLight.setlamp(0, 255, 0);
	}

	function fireLight(t) {
	
		if (t == 120) {
			console.log("yellow");
			this.currentLight.gradient(0, 255, 0, 255, 255, 0, 300);
		} else {
			if (t == 60) {
				console.log("red");
				this.currentLight.gradient(255, 255, 0, 255, 0, 0, 300);
			} else {
				if (t <= 30) {
					console.log("flashing");
					if ((t % 2) == 0) {
						this.currentLight.gradient(255, 0, 0, 0, 0, 0, 45);
					} else {
						this.currentLight.gradient(0, 0, 0, 255, 0, 0, 45);
					}
				}
			}
		}
	}

	function timer()
	{
	  theApp.count = theApp.count - 1;
	  if (theApp.count <= 0)
	  {
		clearInterval(theApp.counter);
		theApp.drawCountdown();
		this.currentLight.gradient(255, 0, 0, 0, 0, 0, 45);
		return;
	  }
	 theApp.fireLight(theApp.count);
	 theApp.drawCountdown();
	}
}

function countdown_startbutton(e) {
	console.log("countdown_startbutton");
	theApp.counter=setInterval(theApp.timer, 1000); //1000 will  run it every 1 second
	if (theApp.count == theApp.startcount) {
		theApp.startLight();
	}
}

function countdown_resetbutton(e) {
	console.log("countdown_resetbutton");
	clearInterval(theApp.counter);
	theApp.resetCountdown();
}

function countdown_stopbutton(e) {
	console.log("countdown_stopbutton");
	clearInterval(theApp.counter);
}

function countdown_secinput(e) {
	console.log("countdown_secinput");
	theApp.startcount = parseInt($("#countdown-secval").val());
	console.log(theApp.startcount);
	theApp.resetCountdown();
}