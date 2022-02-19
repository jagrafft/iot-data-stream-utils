#!/bin/bash
# Raspberry Pi device info script
#
# author:      Jason A. Grafft <j@grafft.co>
# license:     ISC
# last_update: 19.02.2022

echo "NAME:             $IOT_DEVICE_NAME"
echo "SERIAL NUMBER:    $(cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2)"
echo "UUID:             $IOT_DEVICE_UUID"
