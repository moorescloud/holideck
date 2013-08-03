#!/usr/bin/python
#
import select, platform, time, string, subprocess

if platform.system() == 'Darwin':
    import pybonjour            # Importing this under Linux makes Python unhappy

resolved = []
timeout = 5
scantime = 15           # 15 seconds total scantime
discovered = []

class Discovery(object):
    """Implements discovery for Holiday by MooresCloud
    Uses Bonjour on OSX, avahi on Linux, no clue if it works on Windows..."""

    def __init__(self):
        """Initialize everything and figure out what we're running on"""
        self.regtype  = '_iotas._tcp'
        if platform.system() == 'Darwin':
            self.linux = False
            print 'OSX'
        else:
            self.linux = True
            print 'Linux'

    def discover(self):
        """Discover appropriate services on the .local domain"""
        global discovered

        if self.linux == True:

            cmdline = [ "avahi-browse", "-t", "-r", "-l", "-p", "-k", "_iotas._tcp" ]
            try:
                d = subprocess.check_output(cmdline)
       	        print d
                ret = parse_avahi(data=d)
                discovered = ret
            except:
	        print "Something went wrong!"
                return ""

        else:
            """Use the pybonjour module to do some cool thingage"""
            browse_sdRef = pybonjour.DNSServiceBrowse(regtype = self.regtype,
                                          callBack = browse_callback)

            print "discover.select"
            starttime = time.time()
            while (time.time() - starttime) < 15:
                ready = select.select([browse_sdRef], [], [], timeout)
                if browse_sdRef in ready[0]:
                    pybonjour.DNSServiceProcessResult(browse_sdRef)

            print "discover.close"
            browse_sdRef.close()

def parse_avahi(data):
    """Parse the data received by the discover function"""
    """Returns an array of (address, port) tuples"""
    
    #print "parse_avahi"
    retval = []
    # Parse the output a wee bit
    for line in string.split(data,sep='\n'):
        els = string.split(line,sep=";")
	#print els
        if (els[0] == '+'):
            continue
        if (els[0] == '='):
                if string.find(els[9],'Holiday') != -1:     # Is it a Holiday?
                    retval.append((els[7], els[8]))
                #print els[7], els[8] 
    return retval

def resolve_callback(sdRef, flags, interfaceIndex, errorCode, fullname,
                     hosttarget, port, txtRecord):
    if errorCode == pybonjour.kDNSServiceErr_NoError:
        print 'Resolved service:'
        print '  fullname   =', fullname
        print '  hosttarget =', hosttarget
        print '  port       =', port
        print '  txtRecord  =', txtRecord
        resolved.append(True)

        # Is this a Holiday?  If not, don't add it.
        if txtRecord.find('Holiday') != -1:
            print 'Found a matching device!'
            discovered.append((hosttarget[0:-1], port))

def browse_callback(sdRef, flags, interfaceIndex, errorCode, serviceName,
                    regtype, replyDomain):
    if errorCode != pybonjour.kDNSServiceErr_NoError:
        return

    if not (flags & pybonjour.kDNSServiceFlagsAdd):
        print 'Service removed'
        return

    print 'Service added; resolving'

    resolve_sdRef = pybonjour.DNSServiceResolve(0,
                                                interfaceIndex,
                                                serviceName,
                                                regtype,
                                                replyDomain,
                                                resolve_callback)

    try:
        print "Trying"
        while not resolved:
            ready = select.select([resolve_sdRef], [], [], timeout)
            if resolve_sdRef not in ready[0]:
                print 'Resolve timed out'
                break
            pybonjour.DNSServiceProcessResult(resolve_sdRef)
        else:
            print "popping"
            resolved.pop()
    finally:
        print "Closing"
        resolve_sdRef.close()

if __name__ == '__main__':
    disc = Discovery()
    disc.discover()
    print discovered

