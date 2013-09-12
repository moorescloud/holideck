#!/usr/bin/python
#
"""
Device-specific implementation for Holiday by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

import subprocess, time, os
import requests 
import json
from multiprocessing import Queue 
from bottle import request, abort

class Holiday:
# 	def old__init__(self, remote=False, address='sim', name='nameless'):
# 		self.numleds = 50
# 		self.leds = []			# Array of LED values. This may actually exist elsewhere eventually.
# 		self.address = ''
# 		self.name = name
# 		self.isSim = False
# 
# 		if remote == False:
# 			self.remote = False
# 			if address == 'sim':
# 				self.pipename = os.path.join(os.path.expanduser('~'), 'pipelights.fifo')
# 				self.address = address
# 			else:
# 				self.pipename = "/run/pipelights.fifo"
# 				self.address = address
# 			try:
# 				self.pipe = open(self.pipename,"wb")
# 			except:
# 				print "Couldn't open the pipe, there's gonna be trouble!"
# 			ln = 0
# 		else:
# 			self.address = address
# 			self.remote = True
# 
# 		for ln in range(self.numleds):
# 			self.leds.append([0x00, 0x00, 0x00])	# Create and clear an array of RGB LED values
# 
# 		return

	def __init__(self, remote=False, address='sim', name='nameless', queue=None):
		self.numleds = 50
		self.leds = []			# Array of LED values. This may actually exist elsewhere eventually.
		self.address = ''
		self.name = name
		self.isSim = False

		if remote == False:
			self.remote = False
			if address == 'sim':
				self.queue = queue
				self.isSim = True
				#print "IoTAS Queue at %s" % (self.queue,)
			else:
				self.pipename = "/run/pipelights.fifo"
				self.address = address
				try:
					self.pipe = open(self.pipename,"wb")
				except:
					print "Couldn't open the pipe, there's gonna be trouble!"
			ln = 0
		else:
			self.address = address
			self.remote = True

		for ln in range(self.numleds):
			self.leds.append([0x00, 0x00, 0x00])	# Create and clear an array of RGB LED values

		return

	def __str__(self):
		ret = 'name           = %s\n' % self.name
		ret = 'remote           = %s\n' % self.remote
		ret += 'address          = %s\n' % self.address
		ret += 'leds:   [R, G, B]\n'
		for i in range(self.numleds):
			ret += "      %d %s\n" % (i, self.leds[i])
		return ret

	def create_routes(self,theapp):
		"""Create the bottle routes for the instance of this class
		This is weird but apparently works due to the magic of Python

		There is a URL schema for IoTAS.  You should follow its guidelines."""

		routebase = """/iotas/0.1/device/moorescloud.holiday/%s/""" % self.name

		@theapp.get(routebase + 'hostname')
		def get_hostname():
			"""Return the hostname as nicely formatted JSON"""
			import socket
			n = { "hostname": socket.gethostname() }
			return json.dumps(n)

		@theapp.put(routebase + 'hostname')
		def set_hostname():
			"""Sets the hostname for the device, 
			triggers a script in /home/holiday/util to do the work"""
			d = request.body.read()
			print "Received %s" % d
			try:
				dj = json.loads(d)
			except:
				print "Bad JSON data, aborting"
				abort(400, "Bad JSON")
				return

			if 'hostname' in dj:
				try:
					c = subprocess.check_output(['/home/holiday/util/set_hostname.sh', dj['hostname']])
				except subprocess.CalledProcessError:
					abort(500, "Hostname change failed")
			else:
				abort(400, "No hostname provided")
				return
			return

		@theapp.get(routebase)
		def get_holidays():
			return json.dumps(self.get_devices())


		@theapp.put(routebase + 'setlights')
		def do_setlights():
			d = request.body.read()
			print "Received %s" % d
			try:
				dj = json.loads(d)
				print len(dj['lights'])
			except:
				print "Bad JSON data, aborting..."
				return json.dumps({"value": False})
			resp = self.setlights(dj)
			return json.dumps(resp)	

		@theapp.put(routebase + 'setvalues')
		def do_setvalues():
			d = request.body.read()
			#print "Received %s" % d
			try:
				dj = json.loads(d)
			except:
				print "Bad JSON data, aborting..."
				return json.dumps({"value": False})
			resp = self.do_setvalues(dj['values'])
			return json.dumps(resp)	

		@theapp.get(routebase + 'led/<num>/value')
		def read_led_value(num):
			print "read_led_value %s" % num
			value = self.get_led_value(int(num))
			return """{"led": %s, "value": %s}""" % (num, value)

		@theapp.put(routebase + 'led/<num>/value')
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
			self.set_led_value(int(num), triplet)
			return """{"led": %s, "value": %s}""" % (num, triplet)

		@theapp.put(routebase + 'gradient')
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
			resp = self.gradient(begin, end, int(steps))
			return json.dumps(resp)

	def get_devices(self):
		l = { "device_type": "Holiday", "number": 50, "version": 0.1 }
		return [ l ]

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

	def setlights(self,jsondata):
		global awt_colors

		if 'lights' not in jsondata:
			return { "value": False }
		
		ln = 0
		for bulb in jsondata['lights']:
			if bulb in awt_colors:
				#print "Got a match!"
				colorval = awt_colors[bulb]
			else:
				#print bulb[1:]
				colorval = int(bulb[1:], 16)
			self.leds[ln][0] = (colorval & 0xFF0000) >> 16
			self.leds[ln][1] = (colorval & 0xFF00) >> 8
			self.leds[ln][2] = colorval & 0xFF
			ln += 1
	
		self.render()
		return { "value": True }


	def do_setvalues(self, values):
		ln = 0
		while (ln < self.numleds):
			self.leds[ln][0] = values[ln][0]	# White please
			self.leds[ln][1] = values[ln][1]
			self.leds[ln][2] = values[ln][2]
			ln = ln + 1
		self.render()
		return { "lights": self.leds }			

	def gradient(self, begin, end, steps):
		"""Do it the new-fashioned way"""
		steps = float(steps)
		base = [0.0,0.0,0.0]
		base[0] = begin[0]
		base[1] = begin[1]
		base[2] = begin[2]

		incr = [0.0,0.0,0.0]
		incr[0] = float((end[0]-begin[0]) / steps)
		incr[1] = float((end[1]-begin[1]) / steps)
		incr[2] = float((end[2]-begin[2]) / steps)
		print "r-incr %f g-incr %f b-incr %f" % (incr[0],incr[1],incr[2])

		s = 0.0
		gr = [0,0,0]
		while (s < steps):
			gr[0] = int(base[0] + (incr[0] * s))
			gr[1] = int(base[1] + (incr[1] * s))
			gr[2] = int(base[2] + (incr[2] * s))
			self.set_light_values(gr)
			s = s + 1
			time.sleep(.02)
		return { "value": True }

	def nrl(self, data):
		"""Set the NRL team colours based on the passed value"""
		team_num = int(data['team'])
		print "team_num %d" % team_num
		if (team_num < 1) or (team_num > 16):
			return { 'value': False }
		try:
			resp = subprocess.call(['/home/mpesce/sport/nrl', str(team_num)])
		except:
			return { 'value': False }
		return { 'value': True }

	def afl(self, data):
		"""Set the NRL team colours based on the passed value"""
		team_num = int(data['team'])
		if (team_num < 1) or (team_num > 18):
			return { 'value': False }
		try:
			resp = subprocess.call(['/home/mpesce/sport/afl', str(team_num)])
		except:
			return { 'value': False }
		return { 'value': True }

	def old_render(self):
		"""Render the LED array to the Light"""
		"""This version is safe because it renders to a string in memory"""
		if (self.remote == True):
			hol_vals = []
			for glz in self.leds:
				hol_vals.append("#%02x%02x%02x" % (glz[0], glz[1], glz[2]))
			hol_msg = { "lights": hol_vals }
			hol_msg_str = json.dumps(hol_msg)
			print hol_msg_str
			urlstr = 'http://%s/device/light/setlights' % self.address
			r = requests.put(urlstr, data=hol_msg_str)
		else:
			echo = ""
			ln = 0
			while (ln < self.numleds):
				tripval = (self.leds[ln][0] * 65536) + (self.leds[ln][1] * 256) + self.leds[ln][2]
				#echo = echo + "%6X" % tripval + "\\" + "\\" + "x0a"  # magic pixie formatting eh?
				echo = echo + "%06X\n" % tripval
				ln = ln+1
			#print echo
			#os.system("""%s""" % echo)
			self.pipe.write(echo)
			self.pipe.flush()
			#os.system("""%s | /srv/http/cgi-bin/setlights""" % echo)
		return

	def render(self):
		"""Render the LED array to the Light"""
		"""This version is safe because it renders to a string in memory"""
		if (self.remote == True):
			hol_vals = []
			for glz in self.leds:
				hol_vals.append("#%02x%02x%02x" % (glz[0], glz[1], glz[2]))
			hol_msg = { "lights": hol_vals }
			hol_msg_str = json.dumps(hol_msg)
			print hol_msg_str
			urlstr = 'http://%s/device/light/setlights' % self.address
			r = requests.put(urlstr, data=hol_msg_str)
		else:
			echo = ""
			ln = 0
			slist = []
			while (ln < self.numleds):
				tripval = (self.leds[ln][0] * 65536) + (self.leds[ln][1] * 256) + self.leds[ln][2]
				#echo = echo + "%6X" % tripval + "\\" + "\\" + "x0a"  # magic pixie formatting eh?
				#echo = echo + "%06X\n" % tripval
				slist.append("%06X\n" % tripval)
				ln = ln+1
			#print echo
			echo = ''.join(slist)	# Meant to be very much faster
			if self.isSim == True:
				self.queue.put(echo, block=False)
			else:
				self.pipe.write(echo)
				self.pipe.flush()
		return
		
	def on(self):
		return set_light_values([255,255,255])
		
	def off(self):
		return set_light_values([0,0,0])	

awt_colors = dict( black=0x808080, blue=0x8080FF, cyan=0x80FFFF, darkGray=0x818181, gray=0x848484, 
green=0x80FF80, lightGray=0x8f8f8f, magenta=0xFF80FF, orange=0xFF9780, pink=0xFF90EF, 
red=0xFF8080, white=0xFFFFFF, yellow=0xFFFF80, BLACK=0x808080, BLUE=0x8080FF, CYAN=0x80FFFF, 
DARK_GRAY=0x818181, GRAY=0x848484,GREEN=0x80FF80, LIGHT_GRAY=0x8f8f8f, MAGENTA=0xFF80FF, 
ORANGE=0xFF9780, PINK=0xFF90EF, RED=0xFF8080, WHITE=0xFFFFFF, YELLOW=0xFFFF80 )

# Do some unit tests when invoked from the command line
if __name__ == '__main__':
	hol = Holiday(remote=True, address='lithia.local')
	print hol






