#!/bin/bash
while [[ 1 ]]
do
curl http://indigo.local/device/battery/level
echo
sleep 60
done
