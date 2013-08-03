#!/usr/bin/python
#
"""
Random Pattern generator for EngineRoom by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'

import random, json, requests


class EngineRoom:
	def __init__(self, address):
		self.address = address
		self.numleds = 96
		self.leds = []			# Array of LED values. This may actually exist elsewhere eventually.
		ln = 0
		while (ln < self.numleds):
			self.leds.append([0x00, 0x00, 0x00])	# Create and clear an array of RGB LED values
			ln = ln + 1
		return

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

	def rand(self):
		"""Fill the array with random color values"""
		ln = 0
		while (ln < self.numleds):
			self.leds[ln][0] = random.randint(0,127)
			self.leds[ln][1] = random.randint(0,127)
			self.leds[ln][2] = random.randint(0,127)
			self.leds[ln][random.randint(0,2)] = 0
			ln = ln + 1
		self.render()
		return { "lights": self.leds }	

	def render(self):
		"""Render the LED array to the Light"""
		"""This version is safe because it uses the IoTAS API"""
		payload = json.dumps({ "values": self.leds })
		#print payload
		theurl = """http://%s/device/light/setvalues""" % self.address
		r = requests.put(theurl,data=payload)
		return r

if __name__ == '__main__':
	er = EngineRoom('cloud0.local:8080')
	while (True):
		r = er.rand()
