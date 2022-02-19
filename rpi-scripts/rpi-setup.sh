#!/bin/bash
# Raspberry Pi setup script
#
# author:      Jason A. Grafft <j@grafft.co>
# license:     ISC
# last_update: 19.02.2022

# Check access permissions
if [[ "$EUID" = 0 ]]; then
    echo "Already root. Must run as sudo"
else
    sudo -k
    if sudo true; then
        echo "Beginning setup..."
    else
        echo "sudo access was not allowed."
        exit 1
    fi
fi

# Go home first
cd $HOME

# Install system packages #
sudo apt update
#sudo apt dist-upgrade
sudo apt upgrade --yes
sudo apt autoremove --yes

sudo apt install --upgrade --yes \
     bluetooth \
     bluez \
     git \
     libbluetooth-dev \
     libbluetooth3 \
     pi-bluetooth \
     python3-bluez \
     python3-gattlib \
     python3-pip \
     python3-setuptools \
     python3-venv

# Install Python environment and packages #
sudo python3 -m pip install --upgrade \
     adafruit-python-shell \
     pybluez

# Adafruit Blinka libraries #
# Download 
curl -O https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/master/raspi-blinka.py
curl -o blinkatest.py https://learn.adafruit.com/pages/12762/elements/2993427/download

# Install
sudo python3 raspi-blinka.py
