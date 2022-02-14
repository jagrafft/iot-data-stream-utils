# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT

import adafruit_max31865
import board
import digitalio
import json
import signal
import sys
import time
import zmq

sample_rate_seconds = 1/2 # SECONDS # ENV?

ctx = zmq.Context()
sock = ctx.socket(zmq.PUB)
sock.bind('tcp://*:17171')

spi = board.SPI()
cs = digitalio.DigitalInOut(board.D5)  # Chip select of the MAX31865 board.
sensor = adafruit_max31865.MAX31865(
    spi,
    cs,
    rtd_nominal=1000.0,
    ref_resistor=4300.0,
    wires=3
)

def cleanup(signum, frame):
    """
    Close ZeroMQ socket and terminate context.
    """
    print('STOPPING STREAM...')
    """
    sock.close()
    ctx.term()
    """
    sys.exit()

def console_stream(rate):
    """
    Output stream to console.
    """
    sample_stream(print, rate)
    
#def local_stream():
#    """"
#    Write data to local (typically on-device) disk.
#    """"

def sample(rate):
    """
    Sample from the MAX31865 board's PT1000 sensor at `rate` (seconds).
    
    Example:
    for s in sample(0.5):
        print(s)
    """
    while True:
        yield json.dumps({
            'timestamp': time.time_ns(),
            'resistance': sensor.resistance,
            'temperature': sensor.temperature
        })
        time.sleep(rate)

def sample_stream(fn, rate):
    for s in sample(rate):
        fn(s)

def units():
    """
    Return JSON string of data types for sensor values.
    """
    return """{
        'timestamp': 'ns',
        'resistance': 'Ω',
        'temperature': 'C'
    }"""

def zmq_stream(rate):
    """
    Publish ZeroMQ stream at `rate` (seconds).
    """
    sample_stream(sock.send_string, rate)

signal.signal(signal.SIGINT, cleanup)

zmq_stream(sample_rate_seconds)
