#!/bin/bash
#
HOSTNAME="localhost:8080"
TARGETNAME="sim"
curl -X PUT -d '{ "begin": [0,0,0], "end": [255, 0, 0], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
while [[ 1 ]]
do
curl -X PUT -d '{ "begin": [255,0,0], "end": [255, 255, 0], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
curl -X PUT -d '{ "begin": [255,255,0], "end": [0, 255, 0], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
curl -X PUT -d '{ "begin": [0,255,0], "end": [0, 255, 255], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
curl -X PUT -d '{ "begin": [0,255,255], "end": [0, 0, 255], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
curl -X PUT -d '{ "begin": [0,0,255], "end": [255, 0, 255], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
echo
curl -X PUT -d '{ "begin": [255,0,255], "end": [255, 0, 0], "steps": 50 }' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/gradient
done
