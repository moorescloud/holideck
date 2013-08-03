#!/bin/bash
#
HOSTNAME="localhost:8080"
TARGETNAME="sim"
curl -X PUT -d @setlights.json http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/setlights
