#!/bin/bash
while (( 1 ))
do
curl -X PUT -d '{"direction": "in"}' http://192.168.0.147:8080/device/gpio/4/direction
curl http://192.168.0.147:8080/device/gpio/4/direction
sleep 1
curl -X PUT -d '{"direction": "out"}' http://192.168.0.147:8080/device/gpio/4/direction
curl http://192.168.0.147:8080/device/gpio/4/direction
sleep 1
done
