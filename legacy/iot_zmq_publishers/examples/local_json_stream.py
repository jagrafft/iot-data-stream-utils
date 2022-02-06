import zmq

from iot_zmq_publishers.handlers import LocalJSONStream
from signal                      import SIGINT, signal
from sys                         import exit
from time                        import sleep

handler = LocalJSONStream(
        zmq.Context(),
        'tcp://192.168.39.187:17171',
        1/20,
        'FILE_NAME.json'
    )

def close(signum, frame):
    print('Closing...')
    print(f'signum: {signum}')
    print(f'frame: {frame}')
    exit()
    
signal(SIGINT, close)

print('STARTING SUBSCRIBER...')

#sleep(1.25)

print('')
print('Current settings')
print(handler.path)
print(handler.sample_rate)
print(handler.receiving)

#sleep(1.25)

#print('')
#print('Set path')
#handler.path = 'test_output.json'
#print(handler.path)

#sleep(1.25)

#print('')
#print('Set sample rate to 20Hz')
#handler.sample_rate = 1/20
#print(handler.sample_rate)

#sleep(1.25)

print('')
print('Connect and subscribe')
handler.connect()
handler.subscribe('')

#sleep(1.25)

#print('')
#print('Try to receive')
#handler.local_stream()

#sleep(1.25)

#print('')
print('Set receiving = True')
handler.receiving = True
print(handler.receiving)

sleep(1.25)

print('')
print(f"""Streaming to {handler.path}""")
print('Use Ctrl-C to stop stream')
handler.local_stream()
