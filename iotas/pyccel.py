#!/usr/bin/python
#
"""Reads the MMA7660 accelerometer and returns its (yaw, pitch, roll) values as a tuple

To use this module, the following lines should be sufficient:

from pyccel import read_accelerometer
values = read_accelerometer()

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)"""

__author__ = 'Mark Pesce'
__version__ = '0.01.dev'
__license__ = 'MIT'


import socket, itertools, sys, time, math, os

pyccelsock = "/tmp/mma7760.sock"

def read_accelerometer():
	
	s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
	s.connect(pyccelsock)

	try:
		s.send("\n")
		resp = s.recv(12)
		yaw = ord(resp[0])
		if (yaw > 31):
			yaw = yaw - 64
		pitch = ord(resp[1])
		if (pitch > 31):
			pitch = pitch - 64
		roll = ord(resp[2])
		if (roll > 31):
			roll = roll - 64

		# We might want to massage the data here.  Just saying.
		s.close()
		return ({ "values": { "yaw": yaw, "pitch": pitch, "roll": roll }})
	
	except socket.error:
		s.close()
		return ({ "values": False })		# We didn't get a read

if __name__ == '__main__':
	print read_accelerometer()