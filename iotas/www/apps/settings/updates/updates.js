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
		theApp.checkUpdates();
	}
	
	// Quit App
	function appQuit() {
		console.log("updates.appQuit");
	}

	function checkUpdates() {
		console.log("updates.checkUpdates");
		$("#updatetext").text("Checking for updates...");
		currentLight.getUpdates(theApp.updatesChecked);
	}

	function updatesChecked(success) {
		console.log("updates.updatesChecked");
		console.log(success);
	}
	
	function doUpdates() {
		console.log("updates.doUpdates");
		$("#updatetext").text("Performing update...");
		currentLight.doUpdates(theApp.updatesDone);
	}

	function updatesDone(success) {
		console.log("updates.updatesDone");
		console.log(success);
	}

}
