// JavasScript library for communication with IoTAS, the Internet of Things Access Server
//
// REQUIRES JQuery - so make sure you have included it!
//

// Constructor method for the holiday
// Requires a string 'address' (i.e. IP address 192.168.0.20) or resolvable name (i.e. 'light.local')
function iotas(address) {

	console.log("Instancing iotas");

	this.address = address;
	if (address.length == 0) {
		this.urlbase = "";
	} else {
		this.urlbase = this.address;
	}
	console.log("urlbase: " + this.urlbase);
	
	this.ip_addr = null;
	this.vers = null;
	this.hostnm = null;
	this.apis = null;
	this.get_status = get_status;
		
	// Get the status of IoTAS, config information, etc.
	// Bit sneaky in its use of global variables, but whatevs.
	function get_status() {
		$.ajax({
			type: "GET",
			async: false,
			url: iotasrv.urlbase + 'iotas', 
			success: function(data) {
				jd = JSON.parse(data)
				console.log(jd);
				iotasrv.ip_addr = jd.ip;
				iotasrv.vers = jd.version;
				iotasrv.hostnm = jd.host_name;
				iotasrv.apis = jd.apis;
				iotasrv.local_device = jd.local_device;
				iotasrv.local_name = jd.local_name;
				iotasrv.device_url = iotasrv.urlbase + 'iotas/0.1/device/' + jd.local_device + '/' + jd.local_name + '/';
				console.log("iotas.device_url is " + iotasrv.device_url);
				console.log(iotasrv);
			},
			error: function() {
				console.log("iotas.get_status failed");
			}
		});
	}

}

