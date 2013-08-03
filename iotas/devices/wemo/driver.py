#!/usr/bin/python
#
"""
Driver implementation for WeMo by Belkin

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

class WeMo:
	def __init__(self, address, port):
		self.address = address
		self.port = port
		self.soapHeader = """POST /upnp/control/basicevent1 HTTP/1.1
SOAPAction: "urn:Belkin:service:basicevent:1#SetBinaryState"
Host: %s:%s
Content-Type: text/xml
Content-Length: """ % (self.address, self.port)
		self.soapRequestOn = """<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
        <m:SetBinaryState xmlns:m="urn:Belkin:service:basicevent:1">
<BinaryState>1</BinaryState>
        </m:SetBinaryState>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>"""
		self.soapRequestOff = """<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
<SOAP-ENV:Body>
        <m:SetBinaryState xmlns:m="urn:Belkin:service:basicevent:1">
<BinaryState>0</BinaryState>
        </m:SetBinaryState>
</SOAP-ENV:Body>
</SOAP-ENV:Envelope>"""
		return

	def send_soap(self, soapRequest):
		sh = self.soapHeader + "%s\r\n\r\n" % len(soapRequest)
		fullRequest = sh + soapRequest
		#print "fullRequest %s" % fullRequest
		#Send data and run away
		sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
		sock.connect((self.address,self.port))		
		sock.send(fullRequest)
		data = sock.recv(8192)			# Get the response
		sock.close()
		#print "Reply: %s" % data		# And print it
	
	def on(self):
		self.send_soap(self.soapRequestOn)
		return
		
	def off(self):
		self.send_soap(self.soapRequestOff)
		return