#!/usr/bin/python
#
# Let's do some fun fun fun testing of our object stuffs!
#
import device, time


four = device.Device(device.GPIO(4, True))
seventeen = device.Device(device.GPIO(17, True))

four.on()
seventeen.off()

print four.value()
print seventeen.value()

time.sleep(2)

four.off()

