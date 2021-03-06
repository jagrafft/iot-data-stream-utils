from ..abstract.IoTSensor import IoTSensor
from json                 import dumps
from time                 import sleep, time_ns

# TODO temperature omitted, need to verify accuracy of reading
'''
    # for Raspberry Pi
    last_val = 0xFFFF

    def temperature(self):
        global last_val  # pylint: disable=global-statement
        result = self.sensor.temperature
    if abs(result - last_val) == 128:
            result = self.sensor.temperature
            if abs(result - last_val) == 128:
                return 0b00111111 & result
        last_val = result
        return result
'''

class BNO055(IoTSensor):
    """
    """

    def __init__(self, driver, sensor) -> None:
        """
        """
        super().__init__(driver, sensor)
 
    def sample(self, rate) -> str:
        """
        """
        while True:
            yield dumps({
                'timestamp': time_ns(),
                'accelerometer': self._sensor.acceleration,
                'eulerAngle': self._sensor.euler,
                'gravity': self._sensor.gravity,
                'gyroscope': self._sensor.gyro,
                'linearAcceleration': self._sensor.linear_acceleration,
                'magnetometer': self._sensor.magnetic,
                'quaternion': self._sensor.quaternion
            })
            sleep(rate)

    @property
    def driver(self) -> str:
        """
        """
        return super().driver

    @property
    def units(self) -> str:
        """
        """
        return dumps({
            'timestamp': 'nanosecond',
            'accelerometer': 'm/s^2',
            'eulerAngle': 'degree',
            'gravity': 'm/s^2',
            'gyroscope': 'rad/sec',
            'linearAcceleration': 'm/s^2',
            'magnetometer': 'microtesla',
            'quaternion': 'float'
        })
