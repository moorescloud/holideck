function settings() {
	
	console.log("function settings()");
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.settingsGet = settingsGet;
	this.settingsSet = settingsSet;
	this.scan = scan;
	this.doPopup = doPopup;
	this.selected_network = -1;
	var scans;
	this.scans = scans;		// We store the scan data somewhere safe 
	this.doJoin = doJoin;
	this.join = join;
	
	// Start App
	function appStart() {
		console.log("settings.appStart");
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');
		$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
		$('head').append('<link rel="stylesheet" href="settings.css" />'); // Muy importante!
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

	// Here's what happens when we tap to join a network
	function doPopup(index) {
		i = parseInt(index);
		theApp.selected_network = i;
		console.log("doPopup plus", theApp.selected_network);

		// Add in the network name we're joining
		var apnd_str = '<span id="askname">Are you sure you want to join the wireless network' + theApp.scans[i].ssid + "?</span>";
		$("#askname").replaceWith(apnd_str);

		// If there's no password, hide the field.
		if (theApp.scans[i].encryption == 'off') {
			console.log("We should be hiding the password field, shouldn't we?")
		}

		// Clear out the password field
		$("#pw").val('');

		// Then open the dialog
		$( "#password" ).popup( "open" );
	}
	
	function buildButton(scanEntry, index) {
		console.log("buildButton ", index);

		// Start the button build
		var html_btn = '<a onclick="theApp.doPopup($(this).attr(\'id\'));" class="network" data-role="button" data-rel="popup" ';
		html_btn = html_btn + 'id="' + index + '" ';	// Add entry number index for later retrieval
		if (scanEntry.encryption == "on") {				// Indicate encryption level
			var html_btn = html_btn + ' data-icon="alert">'; 
		} else {
			var html_btn = html_btn + ' data-icon="star">'; 
		}

		// Add the name
		html_btn = html_btn + scans[j].ssid + "  ";

		// Add the signal strength
		if (scanEntry.signal > 70) {
			html_btn = html_btn + '- <span style="color: green;">Strong</span>' + "  ";
		} else {
			if (scanEntry.signal > 50) {
				html_btn = html_btn + '- <span style="color: orange;">Fair</span>' + "  ";
			} else {
				html_btn = html_btn + '- <span style="color: red;">Weak</span>' + "  ";
			}
		}

		// And finish things off
		html_btn = html_btn + '</a>';

		return html_btn;
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
				theApp.scans = scans;
				console.log(scans);
				var m = scans.length;
				console.log(m);
				for (j=0; j < m; j++) {
					var apnd_html = buildButton(scans[j], j);
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

	function doJoin() {
		console.log("We are about to join network ", theApp.selected_network);
		var passwd = $("#pw").val();
		console.log("With the password ", passwd)
		theApp.join(theApp.scans[theApp.selected_network].ssid, passwd);
	}

	function join(ssid, passwd) {
		datastr = '{ "ssid": "' + ssid + '", "password": "' + passwd + '" }';
		console.log("join " + datastr);
		$.ajax({
			url: '/iotas/swift/join',
			type: "PUT",
			data: datastr,
			contentType:"application/json; charset=utf-8",
  			dataType:"json",
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
