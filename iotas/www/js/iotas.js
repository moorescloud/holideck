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
	console.log(this.urlbase);

	var ip_addr = '';
	var vers = '';
	var hostnm = '';
	var apis = null;
	
	this.ip_addr = ip_addr;
	this.vers = vers;
	this.hostnm = hostnm;
	this.apis = apis;
	this.get_status = get_status;
		
	// Get the status of IoTAS, config information, etc.
	function get_status() {
		$.ajax({
			type: "GET",
			url: this.urlbase + 'iotas', 
			success: function(data) {
				jd = JSON.parse(data)
				console.log(jd);
				this.ip_addr = jd.ip;
				this.vers = jd.version;
				this.hostnm = jd.hostname;
				this.apis = jd.apis;
			}
		});
	}

}

