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
import ConfigParser

# Multiprocessing requires Python 2.6 or better
v = sys.version_info
if v[0] != 2 or v[1] < 6:
	print("holideck requires Python 2.6.x or Python 2.7.x -- aborting")
	sys.exit(0)

from multiprocessing import Process, Queue
import iotas.iotas 
import simpype.simpype

if __name__ == '__main__':

	# Read the config file for port numbers
	try:
		config = ConfigParser.SafeConfigParser()
		config.read('holideck.config')
		spp_port = int(config.get('simpype', 'port'))
		iop_port = int(config.get('iotas', 'port'))
	except:
		spp_port = 8888		# If any error use default values
		iop_port = 8080

	# Create a Queue instance so the processes can share the datas
	q = Queue()

	# Start the simpype Process
	spp = Process(target=simpype.simpype.run, kwargs={ 'port': spp_port, 'queue': q})
	spp.start()

	#time.sleep(1)

	# Start the iotas Process and join it
	iop = Process(target=iotas.iotas.run, kwargs={ 'port': iop_port, 'queue': q})
	iop.start()

	time.sleep(1)

	print
	print "Simulator should be available on http://localhost:%d" % spp_port
	print "Web interface should be available on http://localhost:%d" % iop_port

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


