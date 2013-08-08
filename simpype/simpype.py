#!/usr/bin/python
#
"""
Holiday simulator server and Python development platform
Using a named pipe to pass data locally (for IoTAS testing mostly)

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'

import os, sys, json, random, threading, time, string, socket 
from fcntl import ioctl
from termios import FIONREAD
import holiday
from bottle import Bottle, run, static_file, post, request
app = Bottle()
hol = holiday.Holiday()

# There's only one call, it returns the JSON-formatted bulb values
@app.route('/')
def server_root():
	return static_file('simpy.html', root='simpype')

@app.route('/<filepath:path>')
def server_static(filepath):
	return static_file(filepath, root='simpype')

@app.route('/bulbs/')
def send_bulbs():
	resp = { 'values': hol.globes }
	return json.dumps(resp)

class APIServer(threading.Thread):
	"""If you want to run the web server as its own thread, use this"""
	def run(self):
		global app
		app.run(host='0.0.0.0', port=8080, debug=True)

class Sing(threading.Thread):
	""" Once again, borrowed from the Processing framework
	    This thread calls setup() once
	    Then calls loop at 50hz"""	

	exiting = False			# When set to true by join() causes run() to exit
	fifoname = os.path.join(os.path.expanduser('~'), 'pipelights.fifo')

	def setup(self):
		"""Create & initialize any instance variables and any other setup here"""
		"""This is where we want to open the named pipe"""
		if os.path.exists(self.fifoname):
			os.remove(self.fifoname)
			print "Deleted FIFO..."
		try:
			print "Creating and opening FIFO..."
			os.mkfifo(self.fifoname)
			#self.fifo = os.open(self.fifoname, os.O_RDONLY | os.O_NONBLOCK)
			self.fifo = os.open(self.fifoname, os.O_RDONLY)
			print "FIFO created successfully"
		except:
			self.fifo = False
			print "FIFO not created"
		return

	def loop(self):
		"""Check the FIFO, and block if we're waiting for input."""
		while True:
			s = os.read(self.fifo, 350)		# That should read in a whole blast, I would think
			if len(s) == 0:					# Read repeatedly until we get nothing from the FIFO
				return
			else:
				size = len(s)
				#print "We have a message of length %d" % size
				if size == 350:		# Do we have a whole message?
					#print s
					ssplit = string.split(s,'\n')
					#ssplit = ssplit[:-1]
					#print ssplit
					global hol
					lednum = 0
					for gloz in ssplit[:-1]:
						rgb = string.atoi(gloz, 16)
						hol.globes[lednum][0] = rgb >> 16
						hol.globes[lednum][1] = (rgb >> 8) & 0xFF
						hol.globes[lednum][2] = rgb & 0xFF
						lednum = lednum + 1
				else:
					print "Message too short!"
		return


	def run(self):
		self.setup()
		while True:
			if self.fifo == False:
				self.setup()				# Keep trying to open the FIFO
			if self.exiting == True:		# Et tu, Brutae?
				if self.fifo:
					os.close(self.fifo)		# close the FIFO if it exists
				return 						# Then fall, Caesar!
			self.loop()						# And let it loop
			time.sleep(.2)					# At 50 hz	

	def join(self):
		"""We join when it's time to die"""
		self.exiting = True		# Set an exit flag

def run(port):
	"""So this can be loaded as a module and run"""
	print "Port = %d" % port
	singer = Sing()				# Initialize Sing
	singer.start()				# And get it going

	starting = True
	socknum = port
	while starting:
		try:	
			app.run(host='0.0.0.0', port=socknum, server='cherrypy', debug=False)  # Start the server
			starting = False
		except socket.error as msg:
			print("Port %s not available, trying another" % socknum)
			socknum += 1

	singer.join()				# When server terminates, signal the Sing thread to exit

if __name__ == '__main__':	
	run(port=8888)



