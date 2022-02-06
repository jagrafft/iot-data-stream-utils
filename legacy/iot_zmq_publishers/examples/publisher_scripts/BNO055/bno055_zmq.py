import adafruit_bno055
import board
import zmq

from iot_zmq_publishers.interfaces import BNO055_ZMQ
from iot_zmq_publishers.sensors    import BNO055
from signal                        import SIGINT, signal
from sys                           import exit
from time                          import sleep

bno055_zmq = BNO055_ZMQ(
    BNO055('BNO055', adafruit_bno055.BNO055_I2C(board.I2C())),
    1/20,
    'tcp://*:17171',
    zmq.Context().socket(zmq.PUB)
)

def close(signum, frame):
    print('Closing...')
    print(f'signum: {signum}')
    print(f'frame: {frame}')
    exit()
    
signal(SIGINT, close)

print(bno055_zmq.driver)
print(bno055_zmq.units)

print(bno055_zmq.publishing)
bno055_zmq.publish()

sleep(2.5)

print('Set publishing = True')
bno055_zmq.publishing = True
print(bno055_zmq.publishing)
bno055_zmq.publish()
