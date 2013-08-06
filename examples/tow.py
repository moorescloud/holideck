#/usr/bin/python
#
"""Try to open a filtered search stream
   And grab the #qanda tagged tweets
   Then spit out the timestamp of the tweet.  
   Which can then be used as an input to another script.  BECAUSE MODADS.

Homepage and documentation: http://dev.moorescloud.com/

Copyright (c) 2012, Mark Pesce.
License: MIT (see LICENSE for details)"""

__author__ = 'Mark Pesce'
__version__ = '0.01.dev'
__license__ = 'MIT'

import sys, os, json, time, stat, threading, string, requests
from twitter.oauth_dance import oauth_dance
import twitter

from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import requests
import holiday

finished =  False

# File name for the oauth info
#
# This will work for *NIX systems, not sure for Windows.
#
fn = os.path.join(os.path.expanduser('~'),'.qanda-oauth')

#consumer_secret=con_secret = "pG9hrZAUURqyDTfBbJcgAMdpemBmgAdZDL92ErVELY"
#consumer_key=con_key = "JwCegsVjfjfK0GvsQkpUw"

# New codes specific for the Twug-of-War twitter application

consumer_secret=con_secret = "3dna5y8MUSXfIrtkuhqF8yDFwjRINirpoeuMomzHaU"
consumer_key=con_key = "qxHfm0JSS5eZNmqqcuw"

# Do we have the correct OAuth credentials?
# If credentials exist, test them.  
# If they fail, delete them.
# If they do not exist or fail, create them.
#
def check_twitter_auth():
	authorized = False
	if os.path.isfile(fn):  # Does the token file exist?
		tokens = twitter.oauth.read_token_file(fn)
		#print 'OAuth tokens exist, will try to authorize with them...'
		twapi = twitter.Twitter(auth = twitter.OAuth(token=tokens[0],
					token_secret=tokens[1],
					consumer_secret=con_secret, 
					consumer_key=con_key))
		try:
			result = twapi.account.verify_credentials()
			twitter_id = result['id']
			twitter_handle = result['screen_name']
			#print 'Good, we seem to be authorized for username %s with id %d' % (twitter_handle, int(twitter_id))
			authorized = twapi
		except twitter.TwitterError as e:
			print "Call failed, we don't seem to be authorized with existing credentials.  Deleting..."
			print e
			os.remove(fn)

	if authorized == False:                   # If not authorized, do the OAuth dance
		print 'Authorizing the app...'
		tokens = oauth_dance(app_name='CrypTweet', consumer_key=con_key, consumer_secret=con_secret, token_filename=fn)
		os.chmod(fn, stat.S_IRUSR | stat.S_IWUSR)		# Read/write, user-only
		#
		# Get an open API object for Twitter
		#
		twapi = twitter.Twitter(auth = twitter.OAuth(token=tokens[0],
						token_secret=tokens[1],
						consumer_secret=con_secret, 
						consumer_key=con_key))
		try:	# Is this going to work?
			result = twapi.account.verify_credentials()
			twitter_id = result['id']
			twitter_handle = result['screen_name']
			print 'Good, we seem to be authorized for username %s with id %d' % (twitter_handle, int(twitter_id))
			authorized = twapi
		except twitter.TwitterError as e:		# Something bad happening, abort, abort!
			print "Call failed, we don't seem to be authorized with new credentials.  Deleting..."
			print e
			os.remove(fn)
			
	return authorized

class StdOutListener(StreamListener):
	""" A listener handles tweets are the received from the stream. 
	This is a basic listener that just prints received tweets to stdout.

	"""
	def on_data(self, data):
		global hashterm, towval, finished

		if finished:
			sys.exit(0)

		#print "Got data"
		djt = json.loads(data)
		try:
			msg = djt['text']
			#print msg
			msglow = string.lower(msg)			# Convert to lowercase for matching
			if string.find(msglow, hashterm[0]) == -1:
				if string.find(msglow, hashterm[1]) == -1:
					#print "No match in string, curious."
					pass
				else:
					towval -= 1
			else:
				towval += 1

		except KeyError:
			#print "KeyError, skipping..."
			pass

		tow_render()
		return True

	def on_error(self, status):
		print status

class Listener(threading.Thread):
	"""If you want to run the Twitter listener on its own thread, use this"""

	def start(self, term='NONE'):
		self.searchterm = term
		"Search term: %s" % self.searchterm
		super(Listener, self).start()

	def run(self):
		print "Listener.run %s" % self.searchterm
		global hashterm, auth, l
		stream = Stream(auth, l)	
		stream.filter(track=[self.searchterm])  # Blocking call.  We do not come back.

def tow_render():
	"""Using the current tug-of-war values, render to the Holiday array"""
	global hol, towval, finished

	print "towval %d" % towval

	# Right side green, left side blue, center point yellow.
	# If the center point goes to zero or NUM_GLOBES, we exit, because we're done!
	# First, make the center
	hol.setglobe(towval, 0xFF, 0xFF, 0x00)			# Yellow in the middle
	hol.setglobe(towval+1, 0xFF, 0xFF, 0x00)

	loopy = 0
	while loopy < towval:
		hol.setglobe(loopy, 0x00, 0xff, 0x00)	# Green to the left
		loopy += 1

	loopy = towval + 2
	while loopy < hol.NUM_GLOBES:
		hol.setglobe(loopy, 0x00, 0x00, 0xff)	# Blue to the right
		loopy = loopy +1

	hol.render()			# And render to the Holiday

	# Finally, if we need to exit, do it here.
	if (towval < 0) or (towval >= hol.NUM_GLOBES):
		finished = True
		sys.exit(0)			# And we're done

	return

if __name__ == '__main__':
	"""The two strings passed after command invocation are the two search terms for the tug-of-war"""

	if len(sys.argv) > 3:
		the_hostname = sys.argv[3]
		print the_hostname
	else:
		the_hostname = 'localhost:8080'

	hashterm = []
	if len(sys.argv) > 2:
		hashterm.append(string.lower(sys.argv[1]))
		hashterm.append(string.lower(sys.argv[2]))
		print "using %s" % hashterm
	else:
		hashterm.append("snowden")
		hashterm.append("bieber")		# You asked for it
		print "Using default: %s" % hashterm

	# Initialize the tug-of-war
	hol = holiday.Holiday(remote=True,addr=the_hostname)
	towval = hol.NUM_GLOBES / 2
	tow_render()
		
	if (check_twitter_auth() == False):
		sys.exit()
	print "Authorized"
	
	tokens = twitter.oauth.read_token_file(fn)

	l = StdOutListener()
	auth = OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(tokens[0], tokens[1])

	# Make a thread for the stream listener
	print hashterm[0]
	macher1 = Listener()
	macher1.start(term=hashterm[0])

	# Make a thread for the stream listener
	print hashterm[1]
	macher2 = Listener()
	macher2.start(term=hashterm[1])

	#stream = Stream(auth, l)	
	#stream.filter(track=[hashterm])  # Blocking call.  We do not come back.

#	while True:
		# Process updates
#		time.sleep(.1)
		
