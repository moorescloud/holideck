#!/usr/bin/python
"""
A sound level meter for the MooresCloud Holiday. 
Requires PyAudio.

Copyright (c) 2013, Josh Deprez
License: MIT (see LICENSE for details)
"""

__author__ = 'Josh Deprez'
__version__ = '0.01-dev'
__license__ = 'MIT'

import pyaudio
import audioop
import struct
import math
import holiday
import sys
import time

def render(hol, value):
	for i in xrange(value):
		alpha = i / 50.0
		beta = 1.0 - alpha
		hol.setglobe(i, alpha * 0xFF, beta * 0xFF, 0x00) # Green -> Red
		
	# Black remaining lights
	for i in xrange(value,50):
		hol.setglobe(i, 0x00, 0x00, 0x00)
		
	hol.render()
	return
	
if __name__ == '__main__':
	if len(sys.argv) > 1:
		the_hostname = sys.argv[1]
		print the_hostname
	else:
		# Assume the holiday is the simulator
		the_hostname = 'localhost:8080'

	hol = holiday.Holiday(remote=True,addr=the_hostname)
	render(hol, 0)

	# Do PyAudio stuff
	FORMAT = pyaudio.paInt16
	CHANNELS = 2
	RATE = 44100
	INPUT_BLOCK_TIME = 0.02
	BUFFER = 4096 #Seems to work... 
	
	# How do we select the appropriate input device?
	input_device = 0 #Built-in Microphone (seems good for OSX)
	#input_device = 3 # this seems to be correct for juno
	
	pa = pyaudio.PyAudio()     
	
	stream = pa.open(format = FORMAT, 
			 channels = CHANNELS,
			 rate = RATE,
			 input = True,
			 input_device_index = input_device,
			 frames_per_buffer = BUFFER)

 	SCALE = 100 # Probably need to tweak this
 	MAX_LIGHT = 50
	errorcount = 0
	print "Press Ctrl-C to quit"
	while True:
		try:
			block = stream.read(BUFFER)  
		except IOError, e:
			errorcount += 1
			print( "(%d) Error recording: %s"%(errorcount,e))
	
		amplitude = audioop.rms(block, 2)
		#print amplitude
		render(hol, min(amplitude / SCALE, MAX_LIGHT))

		