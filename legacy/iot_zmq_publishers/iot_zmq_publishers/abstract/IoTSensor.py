from abc import ABC, abstractmethod

class IoTSensor(ABC):
    """
    """
    @abstractmethod
    def __init__(self, driver, sensor) -> None:
        """
        """
        self._driver = driver
        self._sensor = sensor

    # TODO implement? would like to better define use case(s)
    '''
    @abstractmethod
    def local_stream(self):
        """
        """
        pass
    '''

    @abstractmethod
    def sample(self, rate) -> str:
        """
        """
        pass

    @property
    @abstractmethod
    def driver(self) -> str:
        """
        """
        return f"""{{ 'driver': {self._driver} }}"""
    
    @property
    @abstractmethod
    def units(self) -> str:
        """
        """
        pass
