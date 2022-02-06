import adafruit_bno055
import board
#import zmq

from json   import dumps 
from signal import SIGINT, signal
from sys    import exit
from time   import sleep, time_ns

# Sample rate (seconds)
sample_rate = 1

# BNO055 sensor board
bno055 = adafruit_bno055.BNO055_I2C(board.I2C())

# Set config mode
print('Set `CONFIG_MODE`')
print(f"current_mode = {bno055.mode}")
#bno055.mode = adafruit_bno055.CONFIG_MODE
bno055.mode = adafruit_bno055.NDOF_FMC_OFF_MODE

print("Updated mode")
print(f"bno055.mode = {bno055.mode}")

def status() -> str:
    while True:
        yield dumps({
            'timestamp': time_ns(),
            'calibrated': bno055.calibrated,
            'calibration_status': { k:v for (k,v) in zip(['sys', 'gyro', 'accel', 'mag'], bno055.calibration_status) }
        })
        sleep(sample_rate)

def close(signum, frame):
    print('Set mode to `NDOF_MODE`')
    bno055.mode = adafruit_bno055.NDOF_MODE

    print('Closing...')
    print(f'signum: {signum}')
    print(f'frame: {frame}')
    exit()
    
signal(SIGINT, close)

status = status()

while True:
    print(next(status))
