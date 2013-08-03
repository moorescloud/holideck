#!/usr/bin/python
#
"""
Virtual superclass for all devices

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

class Device:

	def __init__(self, dev):
		self.dev = dev
		return
		
	def on(self):
		self.dev.on()
		return
	
	def off(self):
		self.dev.off()
		return
		
	def value(self):
		try:
			val = self.dev.value()
		except:
			raise Error("Method does not exist")
		return val