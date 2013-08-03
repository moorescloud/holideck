#!/usr/bin/python
#
"""
API implementation for Light by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

import subprocess, time, os

class Light:
	def __init__(self, address):
		from pyccel import read_accelerometer
		self.address = address
		self.onurl = """http://%s/cgi-bin/ajaxcolor?color=0xFFFFFF""" % self.address
		self.offurl = """http://%s/cgi-bin/ajaxcolor?color=0x808080""" % self.address
		self.numleds = 52
		self.leds = []			# Array of LED values. This may actually exist elsewhere eventually.
		ln = 0
		while (ln < self.numleds):
			self.leds.append([0x00, 0x00, 0x00])	# Create and clear an array of RGB LED values
			ln = ln + 1
		#print self.leds
		return

	def get_devices(self):
		l = { "device_type": "LEDs", "number": 52, "version": 4.1 }
		a = { "device_type": "accelerometer", "version": 4.1 }
		b = { "device_type": "battery", "version": 4.1 }
		return [ l, a, b ]

	def get_led_value(self, lednum):
		if lednum < self.numleds:
			return self.leds[lednum]
		else:
			raise IndexError("Illegal LED number")


	def set_led_value(self, lednum, value):
		if lednum < self.numleds:
			self.leds[lednum][0] = value[0]
			self.leds[lednum][1] = value[1]
			self.leds[lednum][2] = value[2]
			self.render()
			#print self.leds
			return self.leds[lednum]
		else:
			raise IndexError("Illegal LED number")

	def get_light_values(self):
		return { "lights": self.leds }		

	def set_light_values(self, value):
		ln = 0
		while (ln < self.numleds):
			self.leds[ln][0] = value[0]	# White please
			self.leds[ln][1] = value[1]
			self.leds[ln][2] = value[2]
			ln = ln + 1
		self.render()
		return { "lights": self.leds }	

	def get_accelerometer_raw(self):
		"""Read in the value from the accelerometer and return it as a dictionary"""
		values = read_accelerometer()
		return values

	def get_accelerometer_cooked(self):
		"""Read in the value from the accelerometer and return as degrees"""
		rv = read_accelerometer()
		yaw = rv['values']['yaw']
		pitch = rv['values']['pitch']
		roll = rv['values']['roll']

		scalar = math.sqrt((yaw*yaw)+(pitch*pitch)+(roll*roll))
		yaw_cooked = math.degrees(math.acos(yaw/scalar))
		if (yaw < 0):
			yaw_cooked = 0 - yaw_cooked
		pitch_cooked = math.degrees(math.acos(pitch/scalar))
		if (pitch < 0):
			pitch_cooked = 0 - pitch_cooked
		roll_cooked = math.degrees(math.acos(roll/scalar))
		if (roll < 0):
			roll_cooked = 0 - roll_cooked
		return { "values": {"yaw": yaw_cooked, "pitch": pitch_cooked, "roll": roll_cooked} }

	def get_power_source(self):
		dirname = """/sys/class/gpio/gpio25/value"""
		fd = open(dirname, "r")
		val = fd.read()
		fd.close()
		if val[:1] == "1":
			return { "value": True }
		else:
			return { "value": False }		
		
	def get_charge_state(self):
		dirname = """/sys/class/gpio/gpio3/value"""
		fd = open(dirname, "r")
		val = fd.read()
		fd.close()
		if val[:1] == "1":
			return { "value": True }
		else:
			return { "value": False }		

	def get_battery_level(self):
		import subprocess
		try:
			adc = subprocess.check_output(['adc'])
			retval = int(adc, 16) * 0.0009	# Convert to volts
			return retval
		except:
			return False

	def gradient(self, begin, end, steps):
		"""For now do it the old-fashioned way"""
		b = (begin[1] * 65536) + (begin[0] * 256) + begin[2]
		e = (end[1] * 65536) + (end[0] * 256) + end[2]
		cmd = """export QUERY_STRING="b=0x%06X&e=0x%06X&s=%d";/srv/http/cgi-bin/gradiencgi > /dev/null""" % (b, e, steps)
		#print cmd
		os.system(cmd)
		return { "value": True }

	## def render_old(self):
		## """Render the LED array to the Light"""
		## """Using a temporary file like this is not recommended because of Flash memory wear"""
		## tf = tempfile.NamedTemporaryFile()
		## ln = 0
		## while (ln < self.numleds):
			## #print "rendering %2X%2X%2X" % (self.leds[ln][0],self.leds[ln][1],self.leds[ln][2])
			## tripval = (self.leds[ln][0] * 65536) + (self.leds[ln][1] * 256) + self.leds[ln][2]
			## tf.write("%6X\n" % tripval)
			## ln = ln+1
		## tf.flush()
		## os.system("""cat %s | /srv/http/cgi-bin/setlights""" % (tf.name))
		## tf.close()
		## return

	def render(self):
		"""Render the LED array to the Light"""
		"""This version is safe because it renders to a string in memory"""
		echo = "echo -e "
		ln = 0
		while (ln < self.numleds):
			tripval = (self.leds[ln][0] * 65536) + (self.leds[ln][1] * 256) + self.leds[ln][2]
			echo = echo + "%6X" % tripval + "\\" + "\\" + "x0a"  # magic pixie formatting eh?
			ln = ln+1
		#print echo
		#os.system("""%s""" % echo)
		os.system("""%s | /srv/http/cgi-bin/setlights""" % echo)
		return

		
	def on(self):
		return set_light_values([127,127,127])
		
	def off(self):
		return set_light_values([0,0,0])

	def do_legacy_ajaxcolor(self, colorval):
		"""Yes, we started out with a truly horrible API.  Get over it."""
		
		clr = int(colorval, 16)	# convert to integer value
		g = (clr & 0xFF0000) >> 16
		r = (clr & 0xFF00) >> 8
		b = (clr & 0xFF)

		# Set the bulbs to that color, and render away.
		ln = 0
		while (ln < self.numleds):
			self.leds[ln][0] = r	
			self.leds[ln][1] = g
			self.leds[ln][2] = b
			ln = ln + 1
		self.render()
		return { "value": True }
	
	def do_legacy_fastlights(self, jsondata):
		"""This is a horrible bit of code that's meant to be super fast. We'll try."""
		
		if len(jsondata) < (self.numleds-1):
			return { "value": False }	# Bad data, reject it.
		
		ln = 0
		while (ln < self.numleds):
			self.leds[ln][0] = (jsondata[ln] & 0xFF0000) >> 16 # red
			self.leds[ln][1] = (jsondata[ln] & 0xFF00) >> 8 #green
			self.leds[ln][2] = jsondata[ln] & 0xFF # blue
			ln = ln + 1
		self.render()
		return { "value": True }			
		
class Hue:
	def __init__(self, key, address, index):
		import requests
		self.key = {"username": key}
		self.address = address
		self.index = index
		self.onjson = json.dumps({'on': True, 'bri': 254})
		self.offjson = json.dumps({'on': True, 'bri': 0})
		self.url = "http://%s/api/" % self.address + self.key['username'] + "/lights/%s/state" % self.index
		return
		
	def on(self):
		r = requests.put(self.url, data=self.onjson)
		return
		
	def off(self):
		r = requests.put(self.url, data=self.offjson)
		return