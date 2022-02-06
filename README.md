# IoT Data Stream Utilities
Classes and utilities for distributing and consuming data from Internet o' Things (IoT) devices. Predominantly makes use of the [ZeroMQ][zmq], [RxJS][rxjs], and Adafruit [CircuitPython][cp] libraries, though this is subject to change.

**NOTE** Codebase is experimental and should not be assumed stable.

## Classes
| Sensor                                       | Driver                                          |
|----------------------------------------------|-------------------------------------------------|
| [BNO055 Absolute Orientation Sensor][bno055] | <https://github.com/adafruit/Adafruit_BNO055>   |

<!-- | [MAX31865 RTD PT1000 Amplifier][max31865]    | <https://github.com/adafruit/Adafruit_MAX31865> | //-->
[bno055]: https://learn.adafruit.com/adafruit-bno055-absolute-orientation-sensor
[cp]: https://circuitpython.org/
[max31865]: https://learn.adafruit.com/adafruit-max31865-rtd-pt100-amplifier
[rxjs]: https://rxjs.dev/
[zq]: https://zeromq.org/
