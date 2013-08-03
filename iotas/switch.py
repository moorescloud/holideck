#!/usr/bin/python
#
# Make the control a Belkin WeMo
#
# Poll the tactile switch, when pressed, turn the WeMo on.
# When pressed again, turn it off.  Lather, rinse, repeat.
#
import subprocess, time, os, socket

switch_gpio = """/sys/class/gpio/gpio0/value"""

soapHeader = """POST /upnp/control/basicevent1 HTTP/1.1
SOAPAction: "urn:Belkin:service:basicevent:1#SetBinaryState"
Host: 192.168.0.105:49153
Content-Type: text/xml
Content-Length: """

soapRequestOn = """<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
        <m:SetBinaryState xmlns:m="urn:Belkin:service:basicevent:1">
<BinaryState>1</BinaryState>
        </m:SetBinaryState>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>"""

soapRequestOff = """<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
        <m:SetBinaryState xmlns:m="urn:Belkin:service:basicevent:1">
<BinaryState>0</BinaryState>
        </m:SetBinaryState>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>"""

def send_soap(host, port, soapRequest):
	sh = soapHeader + "%s\r\n\r\n" % len(soapRequest)
	fullRequest = sh + soapRequest
	#print "send_soap %s" % fullRequest
	#Send data and run away
	sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
	sock.connect((host,port))		
	sock.send(fullRequest)
	data = sock.recv(8192)			# Get the response
	sock.close()
	#print "Reply: %s" % data		# And print it

def read_switch():
	fd = open(switch_gpio, "r")
	val = fd.read()
	fd.close()
	if val[:1] == "1":
		return False
	else:
		return True

def change_state(new_state):
	if (new_state):
		print "On"
		send_soap("192.168.0.105", 49153, soapRequestOn)
	else:
		print "Off"
		send_soap("192.168.0.105", 49153, soapRequestOff)
		
if __name__ == '__main__':
	curr_state = False
	flip_flop = False
	while 1:
		switch_state = read_switch()
		#print switch_state
		if (curr_state == False) and (switch_state == True):
			if (flip_flop):
				flip_flop = False
			else:
				flip_flop = True
			change_state(flip_flop)
		curr_state = switch_state
		time.sleep(.1)
	
#host send X controllee basicevent SetBinaryState	