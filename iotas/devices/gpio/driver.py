#!/usr/bin/python
#
"""
Driver implementation for Linux GPIOs

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

class GPIO:
	def __init__(self, number, direction):
		"""The GPIO port number is passed as number,
		   The direction is a boolean, where True = out, False = in"""
		self.number = number
		self.base = "/sys/class/gpio/gpio%s/" % number
		self.create()
		self.direction = direction  # True = out, False = in
		self.set_direction(self.direction)
		#print self.base
		return
	
	def get_info(self):
		resp= {}
		resp['device_type'] = 'gpio'
		resp['num'] = self.number
		resp['direction'] = self.get_direction()
		resp['value'] = self.value()
		return resp
	
	def create(self):
		"""Instance the GPIO port in the OS.
		   If it already exists, don't do anything."""
		if os.path.exists("/sys/class/gpio/gpio%s" % self.number):
			return
		else:
			f = open("/sys/class/gpio/export", "w")
			f.write("%s" % self.number)
			f.close()
		
	def get_direction(self):
		dirname = self.base + "direction"
		f = open(dirname, "r")
		d = f.read()
		d = d[:-1]	# Remove line feed thingy maybe
		#print "Direction is %s" % d
		if (d == "in"):
			return False
		else:
			return True

	def set_direction(self, inout):
		dirname = self.base + "direction"
		f = open(dirname, "w")
		if inout == True:
			f.write("out")
		else:
			f.write("in")
		f.close()
		self.direction = inout

	def on(self):
		"""Raises error if direction is not out"""
		if self.direction == True:
			dirname = self.base + "value"
			f = open(dirname, "w")
			f.write("1")
			f.close()
			#cmd = """echo "1" > %s""" % dirname
			#print cmd
			#os.system(cmd)
		else:
			raise Error("Invalid direction")
		return
		
	def off(self):
		"""Raises error if direction is not out"""
		if self.direction == True:
			dirname = self.base + "value"
			f = open(dirname, "w")
			f.write("0")
			f.close()
		else:
			raise Error("Invalid direction")
		return
	
	def value(self):
		dirname = self.base + "value"
		fd = open(dirname, "r")
		val = fd.read()
		fd.close()
		#print "value read is %s" % val
		if val[:1] == "1":
			return True
		else:
			return False