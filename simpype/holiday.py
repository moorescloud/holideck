#!/usr/bin/python
#
"""
Holiday class implementation for Holiday by Moorescloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'

class Holiday:

	remote = False
	addr = ''
	NUM_GLOBES = 50

	# Storage for all 50 globe values
	# 
	globes = [ [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00],
	[ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00], [ 0x00, 0x00, 0x00] ]

	def __init__(self, remote=False, addr=''):
		"""If remote, you better supply a valid address.  
		We'll throw an exception when you don't do this."""
		#print "init init init"
		self.remote = remote
		if (self.remote == True):
			#if len(addr) == 0:
			#	throw self.KeyboardInterrupt # Kinda vague, eh?
			self.addr = addr


	def setglobe(self, globenum, r, g, b):
		"""Set a globe"""
		if (globenum < 0) or (globenum >= NUM_GLOBES):
			return
		self.globes[globenum][0] = r
		self.globes[globenum][0] = g
		self.globes[globenum][0] = b

	def getglobe(self, globenum):
		"""Return a tuple representing a globe's RGB color value"""
		if (globenum < 0) or (globenum >= NUM_GLOBES):
			return False
		return (self.globes[globenum][0], self.globes[globenum][1], self.globes[globenum][2])

	def chase(self, direction="True"):
		"""Rotate all of the globes around - up if TRUE, down if FALSE"""
		return

	def rotate(self, newr, newg, newb, direction="True", ):
		"""Rotate all of the globes up if TRUE, down if FALSE
		   Set the new start of the string to the color values"""
		return

	def render(self):
		"""The render routine varies depending on where it's running.
		If it's running locally on a Holiday then it uses pipeligths/compositor
		And sends the globe values out directly.
		If it's running on a remote machine, it has to use IoTAS (and requests) to send it"""

		if (self.remote == True):
			import requests

		else:
			"""Render the LED array to the Holiday"""
			"""This version is safe because it renders to a string in memory"""
			echo = ""
			ln = 0
			while (ln < self.NUM_GLOBES):
				tripval = (self.globes[ln][0] * 65536) + (self.globes[ln][1] * 256) + self.globes[ln][2]
				echo = echo + "%6X\n" % tripval
				ln = ln+1
			print echo
			#self.pipe.write(echo)
			#self.pipe.flush()
			return


if __name__ == '__main__':
	hol = Holiday(remote=False)
	print hol
	hol.render()

