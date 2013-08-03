#!/usr/bin/python
#
"""Discovery for GPIOs in IoTAS

We should be able to use various techniques
To poke around and find out how many GPIO ports
Can be poked and prodded on this device.

If so, they can be returned in a list, which is very useful.

This code is made to run on Linux critters like Raspberry Pi and MooresCloud
But it should run on other devices that have similar types of hardware.

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.1a'
__license__ = 'MIT'

class Discover(object):
    """Basic discovery for GPIOS.
    We should be able to instance this object, and, well it should do things."""

    def __init__(self):
        self.ports = []         # No GPIO ports, sad sad sad
        self.gpio_base = '/sys/class/gpio'

    def __str__(self):
        return str(self.ports)  # Returns some ports maybe

    def build_list(self):
        import os
        try:
            lst = os.listdir(self.gpio_base)
            for l in lst:
                if l[0:4] == 'gpio':
                    print l
        except:
            print "No GPIOs found, sorry."


    def probe(self, portnum): 
        """Probes a GPIO port for reality"""


if __name__ == '__main__':
    # Run some tests here.
    disc = Discover()
    print disc
    disc.build_list()


