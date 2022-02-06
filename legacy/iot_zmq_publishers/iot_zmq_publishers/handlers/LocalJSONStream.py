from ..abstract.ZMQStreamHandler import ZMQStreamHandler
from json                        import loads
from time                        import sleep

import jsonstreams

class LocalJSONStream(ZMQStreamHandler):
    """
    """
    def __init__(self, context, address: str, sample_rate: float, path: str) -> None:
        super().__init__(context, address, sample_rate)
        self._path = path

    def connect(self):
        super().connect()

    def console_stream(self):
        super().console_stream()

    def local_stream(self):
        if self._receiving:
            with jsonstreams.Stream(jsonstreams.Type.array, filename = self._path) as stream:
                while self._receiving:
                    stream.write(next(self.sample()))
        else:
            print('ERROR: receiving = False')
    
    def sample(self):
        while True:
            yield loads(self._socket.recv_json())

    def shutdown(self) -> None:
        super().shutdown()

    def subscribe(self, topics=''):
        super().subscribe(topics)

    @property
    def path(self) -> str:
        return f"""{{ 'path': {self._path} }}"""
    
    @path.setter
    def path(self, path: str) -> None:
        self._path = path
        
    @property
    def receiving(self) -> str:
        return super().receiving

    @receiving.setter
    def receiving(self, flag: bool) -> None:
        self._receiving = flag

    @property
    def sample_rate(self) -> str:
        return super().sample_rate

    @sample_rate.setter
    def sample_rate(self, rate: float) -> None:
        self._sample_rate = rate
