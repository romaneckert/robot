import threading
import time
import os
import urllib.parse
import urllib.request
from slugify import slugify
from sys import platform
from bionics.queues import Queues

class Speaker (threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        while True:

            if not Queues.message.empty():

                message = Queues.message.get()
                error = 0

                sound_directory = 'sounds'
                os.makedirs(sound_directory, exist_ok=True)

                file_path = sound_directory + '/' + slugify(message) + '.wav'

                if not (os.path.exists(file_path)):
                    params = (('INPUT_TEXT', message),
                              ('INPUT_TYPE', 'TEXT'),
                              ('OUTPUT_TYPE', 'AUDIO'),
                              ('AUDIO', 'WAVE_FILE'),
                              ('LOCALE', 'de'),
                              ('effect_Volume_selected', 'on'),
                              ('effect_Volume_parameters', 'amount:2.0'),
                              ('effect_Chorus_selected', 'on'),
                              ('effect_Chorus_parameters',
                               'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'))

                    try:
                        urllib.request.urlretrieve('http://mary.dfki.de:59125/process?' + urllib.parse.urlencode(params), file_path)

                    except:
                        error = 1

                if not error:

                    Queues.command.put(message)

                    if 'darwin' == platform:
                        os.system('afplay ' + file_path + ' > /dev/null 2>&1')
                    else:
                        os.system('mplayer ' + file_path + ' > /dev/null 2>&1')

            else:
                time.sleep(0.1)