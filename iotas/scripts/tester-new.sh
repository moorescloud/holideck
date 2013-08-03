#!/bin/bash
MAXLED=49
HOSTNAME="localhost:8080"
TARGETNAME="sim"
while (( 1 ))
do
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [255,0,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,0,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,255,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,0,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [255,255,255]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,0,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,0,255]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
LED=0
while [ $LED -le "$MAXLED" ]
do
curl -X PUT -d '{"value": [0,0,0]}' http://$HOSTNAME/iotas/0.1/device/moorescloud.holiday/$TARGETNAME/led/$LED/value
echo
LED=$(($LED+1))
sleep 1
done
done
