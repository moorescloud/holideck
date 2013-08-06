#!/usr/bin/python
#
"""
Holideck - Simulation and development enviornment for Holiday by MooresCloud

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2013, Mark Pesce.
License: MIT (see LICENSE for details)
"""

__author__ = 'Mark Pesce'
__version__ = '0.01-dev'
__license__ = 'MIT'

import sys, time

# Multiprocessing requires Python 2.6 or better
v = sys.version_info
if v[0] != 2 or v[1] < 6:
	print("holideck requires Python 2.6.x or Python 2.7.x -- aborting")
	sys.exit(0)

from multiprocessing import Process
import iotas.iotas 
import simpype.simpype

if __name__ == '__main__':

	# Start the simpype Process
	spp = Process(target=simpype.simpype.run)
	spp.start()

	time.sleep(1)

	# Start the iotas Process and join it
	iop = Process(target=iotas.iotas.run)
	iop.start()

	# Now we wait.  When we get a control-C, we exit -- hopefully.
	while True:
		try:
			time.sleep(.1)
		except KeyboardInterrupt:
			print("\nTerminating simulator...")
			iop.terminate()
			spp.terminate()
			print("Exiting.")
			sys.exit(0)


