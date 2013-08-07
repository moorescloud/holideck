HOLIDECK
========

The development and simulation tool for [Holiday by MooresCloud](http://holiday.moorescloud.com).

Holideck provies a full simulation environment for Holiday by MooresCloud.
It is functionally identical the behavior of the actual hardware, which
uses the same code base.

Invocation
----------

`% python holideck.py`

When holideck launches it opens two ports on the localhost, one for 
simulator access, the other presenting the web app interface to Holiday. 

The HTML5 simulator simpype will try open port 8888; 
if that port is unavailable, it will increment the port number
until it finds a free port.

IoTAS, the Internet of Things Access Server, will
try to open port 80 (which is only possible if python has been
run with root privleges), or if running as a user program, will 
try to open port 8080.  This port is often occupied by other
applications (Apache, Tomcat, etc), so IoTAS will increment the port
number until it comes to an available port.

All of which is to say that the simulator could be found on port 8888,
but might be at a higher port number, and IoTAS could be found on
port 8080, but could easily be at a higher port number.

The port numbers are given in the output generated by holideck as
it is initializing.

To quit holideck, simply type a Control-C in the terminal window.

Holideck - specifically IoTAS - currently produces voluminous output
for debugging purposes. Eventually, this will be moved to a log.


Using Holideck
--------------

Holideck is designed to provide a complete simulation and development
environment for Holiday by MooresCloud.  It is implemented in pure
Python.

Holideck is composed of three pieces:

**simpype**

Simpype is the HTML5-based simulator for the Holiday.  Simpype 
simulates the 50 individually-addressible 24-bit colour globes
on the Holiday.

To use simpype, point a browser to the simulator's web page 
- generally that will be `http://localhost:8888`, with the caveats
as given above.

You should see something like this:

![simpype in browser](http://dev.moorescloud.com/wp-content/uploads/2013/08/simpype.jpg)

What looks like a dashed-line extending from the Holiday image on the left
side of the page is actually the string of globes, with each globe
initialized to black.

The Javascript in the page loaded by simpype will poll the simulator
at approximately ten updates per second, so you do not need to reload
the page to see updates to the simulation.

The simulator can be opened in multiple browsers simultaneously,
with the caveat that each browser will poll the simulator at 
10 Hz, so many browser windows pointing to a simulator instance
will produce quite a bit of load on the simulator.

**IoTAS**

The Internet of Things Access Server, or IoTAS, provides both the 
RESTful interface to Holiday by MooresCloud and the web-based
application, control and configuration interface for Holiday.

The interface for IoTAS looks best on a mobile device.  
After holideck has been launched, point a mobile device to port
8080 (or possibly higher, with the caveats given above) on the 
computer running holideck.  

For example, if the computer running holideck is named 
iris.local, you should point your mobile browser to 
`http://iris.local:8080`.  The home screen
for Holiday's HTML5 web app interface should then load:

![holiday home screen](http://dev.moorescloud.com/wp-content/uploads/2013/08/holideck-home.jpg)

To test holideck, tap on the 'API demo' icon, flip the switch, and - 
if the demo is working correctly - you should see a random selection
of colors sent to the simulator.

IoTAS defines a detailed RESTful interface to Holiday by MooresCloud.
This will be documented in the holideck wiki.

**Holiday web apps**

MooresCloud has created a number of demonstration HTML5-based
web apps. These can be used and adapted for your own web apps.  

A number of these apps, although included within holideck, are not
yet fully functional and should not be used. 

The apps which are functional include:

*Colorwheel* - Select a colour from the colorwheel, and the entire
string of lights on the simulator will reflect the color change.

*API Demo* - Generates 50 random colour triplets and sends them 
to the simulator.

*NRL* - Prebuilt color patterns for all 16 teams in Australia's
National Rugby League.


More Caveats
------------

Holideck has been tested on Linux (Ubuntu & Mint), OSX 10.7 & 10.8.  
It has not been tested under Windows - and while there is no reason
to presume it will not work perfectly, YMMV.

This is a first release; there are bound to be numerous problems. We
apologize in advance for this.

If you have any serious problems, please mail me at mpesce AT moorescloud DOT com.

All of this code is released under the MIT License, a copy of which 
is included in this repo.

Mark Pesce  
[MooresCloud Pty Ltd](http://moorescloud.com)

August 2013
