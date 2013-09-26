function updates() {
	
	console.log("function updates()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.checkUpdates = checkUpdates;
	this.updatesChecked = updatesChecked;
	this.doUpdates = doUpdates;
	this.updatesDone = updatesDone;

	// Start App
	function appStart() {
		console.log("updates.appStart");
		$("head").append('<link rel="stylesheet" href="updates.css" />');
		$("#updatebutton").button('disable');
		theApp.checkUpdates();
		return;
	}
	
	// Quit App
	function appQuit() {
		console.log("updates.appQuit");
		//console.trace();
		return;
	}

	function checkUpdates() {
		console.log("updates.checkUpdates");
		$("#updatetext").text("Checking for updates...");
		console.log("starting loading animation");
		$.mobile.loading( "show", {
		  text: "Checking for updates...",
		  textVisible: true,
		  theme: "a",
		  html: ""
		});		
		currentLight.getUpdates(theApp.updatesChecked);
		return;
	}

	function updatesChecked(success) {
		console.log("updates.updatesChecked");
		console.log("stopping loading animation");
		$.mobile.loading("hide");
		console.log(success);
		if (success == true) {
			$("#updatebutton").button('enable');
			$("#updatetext").text("Updates are available.");
		} else {
			$("#updatetext").text("No updates at this time.");
		}
		return;
	}
	
	function doUpdates() {
		console.log("updates.doUpdates");
		$("#updatetext").text("Performing update...");
		$.mobile.loading( "show", {
		  text: "Performing update.  This could take a few minutes...",
		  textVisible: true,
		  theme: "a",
		  html: ""
		});			
		currentLight.doUpdates(theApp.updatesDone);
		return;
	}

	function updatesDone(success) {
		console.log("updates.updatesDone");
		$.mobile.loading('hide');
		if (success == true) {
			$("#updatetext").text("Update successful.");
		} else {
			$("#updatetext").text("Update failed.");
		}
		$("#updatebutton").button('disable');
		console.log(success);
		return;
	}

	// Update button Listener	
	$("#updatebutton").click(function(e){
		theApp.doUpdates();		
	});
}

