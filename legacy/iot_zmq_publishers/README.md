# IoT ZeroMQ Publishers 
Classes for sampling from IoT sensors then distributing data as JSON packets via the [ZeroMQ][zq] framework. This repository focuses on code deployed _to_ IoT devices (e.g. the publishers). For "handler"/"subscriber" code, see the [IoT ZeroMQ Subscribers][izh] repository.

## Classes
| Sensor                                       | Driver                                          |
|----------------------------------------------|-------------------------------------------------|
| [BNO055 Absolute Orientation Sensor][bno055] | <https://github.com/adafruit/Adafruit_BNO055>   |
| [MAX31865 RTD PT1000 Amplifier][max31865]    | <https://github.com/adafruit/Adafruit_MAX31865> |

| Handler           | Description                     |
|-------------------|---------------------------------|
| `LocalJSONStream` | Write JSON stream to local file |


## Setup Notes
### CircuitPython and Drivers for Sensors
- Generally installed on IoT devices with `pip`
- See documentation for
     - [CircuitPython][cp]
     - Invidiual Drivers or Sensors listed above

### Poetry Shell for ZeroMQ Receiver
1. Install [Poetry][pp]
1. Navigate to `iot_zmq_publishers/`
1. `poetry install` (_dependencies_)
1. `poetry shell` (_virtual environment_)

## Running
1. Set ZeroMQ addresses for your network on _publisher_ and _receiver_
1. Transfer appropriate files to IoT device
1. Start publisher script(s) on device
1. Copy desired receiver script (e.g. `local_json_stream.py`) to the same level as `README.md`
1. Start receiver script(s)

[bno055]: https://learn.adafruit.com/adafruit-bno055-absolute-orientation-sensor
[cp]: https://circuitpython.org/
[izh]: https://github.com/jagrafft/iot-zmq-subscribers
[max31865]: https://learn.adafruit.com/adafruit-max31865-rtd-pt100-amplifier
[pp]: https://www.python-poetry.org/
[zq]: https://zeromq.org/
