# Raspberry Pi device info script
#
# author:      Jason A. Grafft <j@grafft.co>
# license:     ISC
# last_update: 14.02.2022

echo "NAME:             $IOT_DEVICE_NAME"
echo ""
echo "SERIAL NUMBER:    $(cat /proc/cpuinfo | grep Serial | cut -d ' ' -f 2)"
echo ""
echo "UUID:             $IOT_DEVICE_UUID"
