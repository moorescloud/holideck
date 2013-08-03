#!/usr/bin/python
#
"""Valid JSON - parsed and set LEDs appropriately

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)"""

__author__ = 'Mark Pesce'
__version__ = '0.01.dev'
__license__ = 'MIT'

import json

awt_colors = dict( black=0x808080, blue=0x8080FF, cyan=0x80FFFF, darkGray=0x818181, gray=0x848484, 
green=0x80FF80, lightGray=0x8f8f8f, magenta=0xFF80FF, orange=0xFF9780, pink=0xFF90EF, 
red=0xFF8080, white=0xFFFFFF, yellow=0xFFFF80, BLACK=0x808080, BLUE=0x8080FF, CYAN=0x80FFFF, 
DARK_GRAY=0x818181, GRAY=0x848484,GREEN=0x80FF80, LIGHT_GRAY=0x8f8f8f, MAGENTA=0xFF80FF, 
ORANGE=0xFF9780, PINK=0xFF90EF, RED=0xFF8080, WHITE=0xFFFFFF, YELLOW=0xFFFF80 )

def setlights(licht, jsondata):
	
	if 'lights' not in jsondata:
		return { "value": False }
	
	ln = 0
	for bulb in jsondata['lights']:
		if bulb in awt_colors:
			#print "Got a match!"
			colorval = awt_colors[bulb]
		else:
			#print bulb[1:]
			colorval = int(bulb[1:], 16)
		licht.leds[ln][0] = (colorval & 0xFF0000) >> 16
		licht.leds[ln][1] = (colorval & 0xFF00) >> 8
		licht.leds[ln][2] = colorval & 0xFF
		ln = ln + 1
	
	licht.render()
	return { "value": True }
