Holideck Examples
=================

If you want to write your own Python apps to control 
[Holiday by MooresCloud](http://holiday.moorescloud.com), we have included
a few examples in this directory.

Twug-of-War
-----------

Twug of War creates an animated Twitter tug-of-war between two competing hashtags.
It's invoked as follows:

`% python tow.py hashtag1 hashtag2`

The first time the program is run, it will attempt to authorize itself with
Twitter.  A browser window should open, ask for your Twitter credentials if 
you're not logged in (a Twitter account is a prerequisite for Twug-of-War), and,
once logged in, will ask you to authorize the app.  Once the app has been
authorized, Twitter will provide a code that must be entered at the terminal
prompt.  Once authorized, Twug-of-War will be able to register a stream listener 
on Twitter.

The string will initialize to half green, and half blue, with a yellow counter
in the middle of the string.  As matching hashtags are seen in the Twitter
'firehose', the counter will move one directon or another.  When the string is
completely one colour, the program will terminate.

Soundlevel
----------

Soundlevel turns the Holiday by MooresCloud into a real-time sound level
monitor.

It requires some prerequisites to be installed, specifically 
[PortAudio](http://www.portaudio.com/) library and the
[PyAudio](http://people.csail.mit.edu/hubert/pyaudio/) module. Consult the documentation at those websites for more details.  (Ubuntu/Debian
users can probably install both with `sudo apt-get install python-pyaudio`, but
for OSX and Windows it's considerably more involved.)

It's invoked as follows:

`% python soundlevel.py`

In general the application will correctly detect and use the microphone input 
on the computer running Soundlevel, but that may not alway be the case.

Many thanks to Josh Deprez for Soundlevel.