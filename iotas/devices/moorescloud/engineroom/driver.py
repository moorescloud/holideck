#!/usr/bin/python
#
"""
Driver implementation for EngineRoom by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

import subprocess

class EngineRoom:
	def __init__(self, address):
		self.address = address
		self.numleds = 96
		self.pipename = "/run/pipelights.fifo"
		self.leds = []			# Array of LED values. This may actually exist elsewhere eventually.
		try:
			self.pipe = open(self.pipename,"w+")
		except:
			print "Couldn't open the pipe, there's gonna be trouble!"
		ln = 0
		while (ln < self.numleds):
			self.leds.append([0x00, 0x00, 0x00])	# Create and clear an array of RGB LED values
			ln = ln + 1
		return

	def get_devices(self):
		l = { "device_type": "LEDs", "number": 96, "version": 4.1 }
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

	def render(self):
		"""Render the LED array to the Light"""
		"""This version is safe because it renders to a string in memory"""
		echo = ""
		ln = 0
		while (ln < self.numleds):
			tripval = (self.leds[ln][0] * 65536) + (self.leds[ln][1] * 256) + self.leds[ln][2]
			#echo = echo + "%6X" % tripval + "\\" + "\\" + "x0a"  # magic pixie formatting eh?
			echo = echo + "%6X\n" % tripval
			ln = ln+1
		#print echo
		#os.system("""%s""" % echo)
		self.pipe.write(echo)
		self.pipe.flush()
		#os.system("""%s | /srv/http/cgi-bin/setlights""" % echo)
		return

		
	def on(self):
		return set_light_values([127,127,127])
		
	def off(self):
		return set_light_values([0,0,0])