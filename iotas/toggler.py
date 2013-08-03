#!/usr/bin/python
#
"""
Poll the switch on GPIO0, when changes, send an event out via HTTP.

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'# 
#
# Implementation specific to Light by MooresCloud 2nd generation prototype hw
# Poll the switch on GPIO0, when pressed, turn the devices on.
# When pressed again, turn it off.  Lather, rinse, repeat.
#
import urllib2, time, requests, json

switch_gpio = """/sys/class/gpio/gpio0/value"""
toggleurl = """http://indigo.local:8080/toggle"""
gradon = json.dumps({ "begin": [0,0,0], "end": [255,255,255], "steps": 25 })
gradoff = json.dumps({ "begin": [255,255,255], "end": [0,0,0], "steps": 25 })

def read_switch():
	fd = open(switch_gpio, "r")
	val = fd.read()
	fd.close()
	if val[:1] == "1":
		return False		# Reverse logic for Light
	else:
		return True

def change_state(new_state):
	global m, p, w
	if (new_state):
		print "On"
		try:
			r = requests.put("http://indigo.local:8080/device/light/gradient", data=gradon)
		except:
			print "Error on request"
	else:
		print "Off"
		try:
			r = requests.put("http://indigo.local:8080/device/light/gradient", data=gradoff)
		except:
			print "Error on reqeust"

if __name__ == '__main__':
# 	curr_state = read_switch()	# Set starting state
# 	print "Ready..."
# 	while 1:
# 		switch_state = read_switch()
# 		if (curr_state != switch_state):	# State change?
# 			curr_state = switch_state
# 			change_state(curr_state)
# 		time.sleep(.04)		# 25 hz
		
	curr_state = False
	flip_flop = False
	print "Ready..."
	while 1:
		switch_state = read_switch()
		if (curr_state == False) and (switch_state == True):
			if (flip_flop):
				flip_flop = False
			else:
				flip_flop = True
			change_state(flip_flop)
		curr_state = switch_state
		time.sleep(.04)
	
