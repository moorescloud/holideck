function settings() {
	
	console.log("function settings()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.settingsGet = settingsGet;
	this.settingsSet = settingsSet;
	this.scan = scan;
	this.join = join;
	
	// Start App
	function appStart() {
		console.log("settings.appStart");
		settingsGet();
	}
	
	// Quit App
	function appQuit() {
		console.log("settings.appQuit");
	}
	
	// Get Settings 
	function settingsGet() {
		console.log("settings.settingsGet");
		//
		// Insert IoTAS Code
		//
		scan();
	}
	
	// Set Settings 
	function settingsSet() {
		console.log("settings.settingsSet");
		//
		// Insert IoTAS Code
		//
	}
	
	function scan() {
		console.log("settings.scan");
		$.ajax({
			url: '/iotas/swift/scan',
			success: function(data) {
				console.log("scan success");
				//console.log(data)
				scan_data = JSON.parse(data);
				scans = scan_data.scan;
				console.log(scans);
				var m = scans.length;
				console.log(m);
				for (j=0; j < m; j++) {
					console.log(scans[j].signal);
					var apnd_html = '';
					if (scans[j].encryption == "on") {
						var apnd_html = '<a href="#password" class="network" data-role="button" data-icon="alert" data-rel="popup">' + scans[j].ssid + '</a>';
					} else {
						var apnd_html = '<a href="#password" class="network" data-role="button" data-icon="star" data-rel="popup">' + scans[j].ssid + '</a>';
					}
					$("#network_list").append(apnd_html);
					$("#network_list").trigger('create');
				}
			},
			error: function() {
				console.log("scan failure");
				var apnd_html = '<a href="" class="network" data-role="button" data-icon="alert" data-rel="popup">Scan failure</a>';
				$("#network_list").prepend(apnd_html);
				$("#network_list").trigger('create');
			},
			beforeSend: function() {
				console.log("beforeSend scan");
			}
		});
	}

	function join() {
		console.log("join");
		$.ajax({
			url: '/iotas/swift/scan',
			success: function(data) {
				console.log("join success");
			},
			error: function() {
				console.log("join failure");
			},
			beforeSend: function() {
				console.log("beforeSend join");
			}
		});
	}

	// Click Join
	$("#join").click(function () {
		$("#password").popup( "close" );
		theApp.join();
	});
	
}
