#!/usr/bin/python
#
"""Integration of drawlight with IoTAS for the Light by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)"""

__author__ = 'Mark Pesce'
__version__ = '0.01.dev'
__license__ = 'MIT'

awt_colors = dict( black=0x808080, blue=0x8080FF, cyan=0x80FFFF, darkGray=0x818181, gray=0x848484, 
green=0x80FF80, lightGray=0x8f8f8f, magenta=0xFF80FF, orange=0xFF9780, pink=0xFF90EF, 
red=0xFF8080, white=0xFFFFFF, yellow=0xFFFF80, BLACK=0x808080, BLUE=0x8080FF, CYAN=0x80FFFF, 
DARK_GRAY=0x818181, GRAY=0x848484,GREEN=0x80FF80, LIGHT_GRAY=0x8f8f8f, MAGENTA=0xFF80FF, 
ORANGE=0xFF9780, PINK=0xFF90EF, RED=0xFF8080, WHITE=0xFFFFFF, YELLOW=0xFFFF80 )

testjson = """{ "lights": [
{ "light": "all", "color": "white" },
{ "light": "outerTop", "color": "green" },
{ "light": "outerTop", "part": "frontRow", "color": "red" },
{ "light": "outerLeft", "color": "blue" },
{ "light": "outerLeft", "part": "leftCol", "color": "0x808080" },
{ "light": "outerBottom", "color": "magenta" },
{ "light": "outerBottom", "part": "centerRow", "color": "orange" },
{ "light": "outerRight", "color": "orange" },
{ "light": "outerRight", "part": "rightCol", "color": "yellow" },
{ "light": "innerTop", "color": "green" },
{ "light": "innerTop", "part": "frontRow", "color": "red" },
{ "light": "innerRight", "color": "cyan" },
{ "light": "innerRight", "part": "rearRow", "color": "orange" },
{ "light": "innerBottom", "color": "blue" },
{ "light": "innerBottom", "part": "leftCol", "color": "black" },
{ "light": "innerLeft", "color": "magenta" },
{ "light": "innerLeft", "part": "rightCol", "color": "white" }
]
}"""

# Indices for bulbs on outer faces
top_outside = [ 27, 28, 29, 30, 31, 32, 33, 34, 35 ]
right_outside = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
bottom_outside = [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ]
left_outside = [ 18, 19, 20, 21, 22, 23, 24, 25, 26 ]

# Indices for bulbs on inner faces
right_inside = [ 36, 37, 38, 39 ]
bottom_inside = [ 40, 41, 42, 43 ]
left_inside = [ 44, 45, 46, 47 ]
top_inside = [ 48, 49, 50, 51 ]

# Storage for all the bulbs in a light
bulbs = [ 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080 ]  

def bulbstolicht(licht):
	"""Copies the array of bulbs to the licht, correctly formatted"""
	y = 0
	while (y < licht.numleds):
		licht.leds[y][0] = (bulbs[y] & 0xFF0000) >> 16  # red
		licht.leds[y][1]= (bulbs[y] & 0xFF00) >> 8	# green
		licht.leds[y][2] = (bulbs[y] & 0xFF)		# blue
		y = y + 1
	return

# Draw all the bulbs the same color
def drawAll(licht, colorstr):
	#print "drawAll %s" % colorstr

	if colorstr in awt_colors:
		#print "matching color"
		colorval = awt_colors[colorstr]
	else:
		colorval = int(colorstr[1:], 16)
	#print "colorval %6X" % colorval

	y = 0;
	while (y < len(bulbs)):
		bulbs[y] = colorval
		y = y + 1	
	#print bulbs

def drawInnerFace(licht, face, colorstr):
	#print "drawFace %s %s" % (face, colorstr)

	# Get the indices of the face to fill
	if (face == u'innerTop'):
		map = top_inside
	if (face == u'innerLeft'):
		map = left_inside
	if (face == u'innerBottom'):
		map = bottom_inside		
	if (face == u'innerRight'):
		map = right_inside		

	if colorstr in awt_colors:
		#print "matching color"
		colorval = awt_colors[colorstr]
	else:
		colorval = int(colorstr[1:], 16)

	y = 0;
	while (y < len(map)):
		bulbs[map[y]] = colorval
		y = y + 1	
	#print bulbs

def drawFace(licht, face, colorstr):
	#print "drawInnerFace %s %s" % (face, colorstr)

	# Get the indices of the face to fill
	if (face == u'outerTop'):
		map = top_outside
	if (face == u'outerLeft'):
		map = left_outside
	if (face == u'outerBottom'):
		map = bottom_outside		
	if (face == u'outerRight'):
		map = right_outside		

	if colorstr in awt_colors:
		#print "matching color"
		colorval = awt_colors[colorstr]
	else:
		colorval = int(colorstr[1:], 16)

	y = 0;
	while (y < len(map)):
		bulbs[map[y]] = colorval
		y = y + 1	
	#print bulbs

def drawFacePart(licht, face, part, colorstr):
	#print "drawFacePart"

	# Get the indices of the face to fill
	if (face == u'outerTop'):
		map = top_outside
	if (face == u'outerLeft'):
		map = left_outside
	if (face == u'outerBottom'):
		map = bottom_outside		
	if (face == u'outerRight'):
		map = right_outside		

	if colorstr in awt_colors:
		#print "matching color"
		colorval = awt_colors[colorstr]
	else:
		colorval = int(colorstr[1:], 16)

	# Now fill in the correct part
	if (part == u'frontRow'):
		bulbs[map[2]] = bulbs[map[5]] = bulbs[map[8]] = colorval
	if (part == u'centerRow'):
		bulbs[map[1]] = bulbs[map[4]] = bulbs[map[7]] = colorval
	if (part == u'rearRow'):
		bulbs[map[0]] = bulbs[map[3]] = bulbs[map[6]] = colorval
	if (part == u'leftCol'):
		bulbs[map[0]] = bulbs[map[1]] = bulbs[map[2]] = colorval
	if (part == u'centerCol'):
		bulbs[map[3]] = bulbs[map[4]] = bulbs[map[5]] = colorval
	if (part == u'rightCol'):
		bulbs[map[6]] = bulbs[map[7]] = bulbs[map[8]] = colorval

	#print bulbs

def drawInnerFacePart(licht, face, part, colorstr):
	#print "drawFacePart"

	# Get the indices of the face to fill
	if (face == u'innerTop'):
		map = top_inside
	if (face == u'innerLeft'):
		map = left_inside
	if (face == u'innerBottom'):
		map = bottom_inside		
	if (face == u'innerRight'):
		map = right_inside			

	if colorstr in awt_colors:
		#print "matching color"
		colorval = awt_colors[colorstr]
	else:
		colorval = int(colorstr[1:], 16)

	# Now fill in the correct part
	if (part == u'frontRow'):
		bulbs[map[1]] = bulbs[map[3]] = colorval
	if (part == u'rearRow'):
		bulbs[map[0]] = bulbs[map[2]] = colorval
	if (part == u'leftCol'):
		bulbs[map[0]] = bulbs[map[1]] = colorval
	if (part == u'rightCol'):
		bulbs[map[2]] = bulbs[map[3]] = colorval

	#print bulbs
	
def drawlight(licht,jsoncmds):
	"""Parses the string (hopefully good JSON) passed and sets the light's bulbs appropriately.
	   Returns a JSON-ready object with 'value' equals True if it all works, otherwise False""" 

	if 'lights' not in jsoncmds:		# Do we have something to work with?
		return { "value": False }
	
	# Walk through the list of commands in the file
	for cmd in jsoncmds['lights']:
		theCmd = cmd['light']
		if (theCmd == u'all'):
			drawAll(licht, cmd['color'])
		if ((theCmd == u'outerTop') or (theCmd == u'outerLeft') 
		or (theCmd == u'outerBottom') or (theCmd == u'outerRight')):
			if 'part' in cmd:
				drawFacePart(licht, theCmd, cmd['part'], cmd['color'])
			else:
				drawFace(licht, theCmd, cmd['color'])
		if ((theCmd == u'innerTop') or (theCmd == u'innerLeft')
		or (theCmd == u'innerBottom') or (theCmd == u'innerRight')):
			if 'part' in cmd:
				drawInnerFacePart(licht, theCmd, cmd['part'], cmd['color'])
			else:
				drawInnerFace(licht, theCmd, cmd['color'])

	# And now render them to the Light
	bulbstolicht(licht)
	licht.render()
	return { "value": True }