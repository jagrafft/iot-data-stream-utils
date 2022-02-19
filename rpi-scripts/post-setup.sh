#!/bin/bash
# Raspberry Pi post-setup script
#
# author:      Jason A. Grafft <j@grafft.co>
# license:     ISC
# last_update: 19.02.2022

# Test Blinka
python3 blinkatest.py

# Remove downloaded scripts
sudo rm -rf \
     blinkatest.py \
     raspi-blinka.py

# Clone scripts for streaming sensor data
git clone https://github.com/jagrafft/iot-data-stream-utils.git
mv iot-data-stream-utils/iot_zmq_publishers/ ~/
rm -rf iot-data-stream-utils/

# Set up Python virtual environment for script execution
python3 -m venv iot_zmq_publishers/
source iot_zmq_publishers/bin/activate
cd iot_zmq_publishers/
pip3 install -r requirements.txt
deactivate
cd $HOME
