#!/usr/bin/python
#
"""
Internet of Things Access Server - GUID generator

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'

def make_guid_from_ipv6(addr):
	"""Given a 128-bit IPv6 address, generate a 160-bit GUID"""

	# IPv6 addresses are 16 bytes in length, which suits our needs perfectly 