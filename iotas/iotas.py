#!/usr/bin/python
#
"""
Internet of Things Access Server - MooresCloud preliminary implementation for Holiday

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.02-dev'
__license__ = 'MIT'

import json, socket, os, sys
import drawlight, setlights
from bottle import Bottle, run, static_file, post, request

app = Bottle()
app.devices = []
app.licht = 0
app.toggleState = False

#docroot = '/home/mpesce/iotas'
docroot = os.path.join(os.getcwd(), 'iotas') 		# Hopefully we startup in this directory
print "Startup directory %s" % docroot
default_name = 'index.html'

# Let's do the basic page loadery here
@app.route('/')
def server_root():
	global docroot
	#print docroot
	return static_file('index.html', root=docroot+'/www')

# Everything will need to be adjusted appropriately, but whatevs.
@app.route('/apps/<filepath:path>')
def server_static(filepath):
	global docroot, default_name
	#print filepath[-1]
	if (filepath[-1] == """/"""):
		filepath = filepath + default_name
	#print docroot, filepath
	return static_file(filepath, root=docroot+'/www/apps')

@app.route('/stylesheets/<filepath:path>')
def server_static(filepath):
	global docroot
	return static_file(filepath, root=docroot+'/www/stylesheets')

@app.route('/assets/<filepath:path>')
def server_static(filepath):
	global docroot
	return static_file(filepath, root=docroot+'/www/assets')

@app.route('/css/<filepath:path>')
def server_static(filepath):
	global docroot
	return static_file(filepath, root=docroot+'/www/css')

@app.route('/js/<filepath:path>')
def server_static(filepath):
	global docroot
	return static_file(filepath, root=docroot+'/www/js')


# And here begin the IoTAS RESTful interfaces
@app.get('/iotas')
def do_iotas_info():

	#for thingy in request.headers:
	#	print thingy, request.headers[thingy]

	# Getting the internal IP address is kind of easy.  Kind of.
	hostname = socket.gethostname()
	#internal_ip = socket.gethostbyname(hostname)
	external_ip = request.headers['Host']
	# import urllib, re, string
	# url = urllib.URLopener()
	# resp = url.open('http://checkip.dyndns.org')
	# html = resp.read()
	# end = html.find("</body>")
	# start = html.find("Address:") + 9
	# external_ip = html[start:end].strip() 
	resp = { "version": "0.1a", "apis": [], "host_name": hostname, "ip": external_ip }
	return json.dumps(resp)

@app.get('/devices')
def do_devices():
	try:
		thename = socket.gethostname()
	except:
		thename = "unknown"
	devs = app.licht.get_devices()
	for devi in app.devices:
		devs.append(app.licht.get_info())
	resp = { "block": "EngineRoom by MooresCloud", "devices": devs, "name": thename }
	return json.dumps(resp)

# THESE API CALLS ARE DEPRECATED
# YOU REALLY OUGHT TO USE THE NEW FORMAT API
# WE WILL STOP SUPPORTING THIS BEFORE VERY LONG
# YOU HAVE BEEN WARNED
# A few commands that either get or set the state of the entire Light

@app.get('/device/light/value')
def read_light_values():
	value = app.licht.get_light_values()
	return json.dumps(value)

@app.put('/device/light/value')
def set_light_values():
	d = request.body.read()
	if len(d) == 0:
		return json.dumps({"value": False})
	print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})
	if 'value' in dj:
		print "there is a value"
		triplet = dj['value']
	else:
		return json.dumps({"value": False})
			
	print "set_light_values %s" % triplet
	retval = app.licht.set_light_values(triplet)
	return json.dumps(retval)

@app.put('/device/light/setlights')
def do_setlights():
	d = request.body.read()
	print "Received %s" % d
	try:
		dj = json.loads(d)
		print len(dj['lights'])
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})
	resp = setlights.setlights(app.licht, dj)
	return json.dumps(resp)	

@app.put('/device/light/setvalues')
def do_setvalues():
	d = request.body.read()
	#print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})
	resp = app.licht.do_setvalues(dj['values'])
	return json.dumps(resp)	

# Now some individual LED manipulations

@app.get('/device/led/<num>/value')
def read_led_value(num):
	print "read_led_value %s" % num
	value = app.licht.get_led_value(int(num))
	return """{"led": %s, "value": %s}""" % (num, value)
	
@app.put('/device/led/<num>/value')
def set_led_value(num):
	d = request.body.read()
	print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})
	if 'value' in dj:
		print "there is a value"
		triplet = dj['value']
	else:
		return json.dumps({"value": False})
			
	print "set_led_value %s %s" % (int(num), triplet)
	app.licht.set_led_value(int(num), triplet)
	return """{"led": %s, "value": %s}""" % (num, triplet)

# And add some animation effects (this needs revising)

@app.put('/device/light/gradient')
def gradient():
	d = request.body.read()
	#print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})

	if 'begin' in dj:
		#print "there is a beginning"
		begin = dj['begin']
	else:
		return json.dumps({"value": False})

	if 'end' in dj:
		#print "there is a ending"
		end = dj['end']
	else:
		return json.dumps({"value": False})

	if 'steps' in dj:
		#print "and some steps"
		steps = dj['steps']
	else:
		return json.dumps({"value": False})
					
	print "gradient %s %s %s" % (begin, end, steps)
	resp = app.licht.gradient(begin, end, int(steps))
	return json.dumps(resp)

@app.put('/device/holiday/app/nrl')
def nrl():
	d = request.body.read()
	#print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})	

	# Ok, so we should have the team nubmer now
	# Pass that along to wherever it needs to go
	resp = app.licht.nrl(dj)
	return json.dumps(resp)

@app.put('/device/holiday/app/afl')
def afl():
	d = request.body.read()
	#print "Received %s" % d
	try:
		dj = json.loads(d)
	except:
		print "Bad JSON data, aborting..."
		return json.dumps({"value": False})	

	# Ok, so we should have the team nubmer now
	# Pass that along to wherever it needs to go
	resp = app.licht.afl(dj)
	return json.dumps(resp)
    

def run():
	"""invoke run when loading as a module"""
	# Instance the devices that we're going to control
	# Add each to the control ring. For no very good reason.
	#
	ourname = "%s.local" % socket.gethostname()
	discover = False	# No discovery right now

	# Now we're using our newfangled IoTAS code to find the device
	if discover == True:
		import devices.moorescloud.holiday.discover as discover
		disc = discover.Discovery()
		print "Scanning for Holidays..."
		disc.discover()

		if len(discover.discovered) < 1:
			print "We got nuthin, going to use the simulator"
			lichtname = 'sim'
			lichtremote = False
			lichtapiname = 'sim'
		else:
			lichtname = "%s:%s" % (discover.discovered[0][0], discover.discovered[0][1])
			lichtremote = True
			lichtapiname = discover.discovered[0][0]
		print "Using %s" % lichtname
	else:
		lichtname = 'sim'
		lichtremote = False
		lichtapiname = 'sim'		

	#app.licht = devices.holiday.driver.Holiday(ourname)
	#app.licht = devices.moorescloud.holiday.driver.Holiday('sim')			# Connect to the simulator
	#app.licht = devices.moorescloud.holiday.driver.Holiday(remote=True, address='yule.local')	# Connect to a real device
	import devices.moorescloud.holiday.driver as driver
	#app.licht = driver.Holiday(remote=lichtremote, address=lichtname, name=lichtapiname)	# Connect to a real device
	app.licht = driver.Holiday(remote=False, address='sim', name='sim')
	app.licht.create_routes(app)										# Adds in all the routes for device

	#the_srv = 'wsgiref'  
	the_srv = 'cherrypy'
	#print app.licht

	print 'Routes'
	for rt in app.routes:
		print rt.method, rt.rule, rt.callback
	
	print "Running..."
	# Try to run on port 80, if that fails, go to 8080
	try:
		app.run(host='0.0.0.0', port=80, debug=False, server=the_srv)
	except socket.error as msg:

		# Starting with port 8080, try to grab a port!
		starting = True
		socknum = 8080
		while starting:
			try:	
				app.run(host='0.0.0.0', port=socknum, server=the_srv, debug=False)  # Start the server
				starting = False
			except socket.error as msg:
				print("Port %s not available, trying another" % socknum)
				socknum += 1

if __name__ == '__main__':
	run()