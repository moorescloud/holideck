#!/usr/bin/python
#
"""
Driver implementation for Hue by Philips

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

import requests

class Hue:
	def __init__(self, key, address, index):
		self.key = {"username": key}
		self.address = address
		self.index = index
		self.onjson = json.dumps({'on': True, 'bri': 254})
		self.offjson = json.dumps({'on': True, 'bri': 0})
		self.url = "http://%s/api/" % self.address + self.key['username'] + "/lights/%s/state" % self.index
		return
		
	def on(self):
		#print "Hue ON"
		r = requests.put(self.url, data=self.onjson)
		return
		
	def off(self):
		#print "Hue OFF"
		r = requests.put(self.url, data=self.offjson)
		return
