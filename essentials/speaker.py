#!/usr/bin/env python3

from threading import Thread
import os
import urllib.request
import urllib.parse
import time
from slugify import slugify
from sys import platform


class Speaker(Thread):

    def __init__(self, interface):
        Thread.__init__(self)
        self.interface = interface

    def run(self):
        while True:

            if not self.interface.queues.speaker.empty():

                message = self.interface.queues.speaker.get()
                self.interface.queues.logger.put(message)
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
                              ('effect_Chorus_selected', 'on'),
                              ('effect_Chorus_parameters',
                               'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'))

                    url = 'http://localhost:59125/process?' + urllib.parse.urlencode(params)

                    try:
                        urllib.request.urlretrieve(url, file_path)

                    except:
                        errorMessage = 'Can not read: ' + url
                        error = 1

                if not error:

                    if 'darwin' == platform:
                        os.system('afplay ' + file_path + ' > /dev/null 2>&1')
                    else:
                        os.system('mplayer ' + file_path + ' > /dev/null 2>&1')
                else:
                    Log.error('Mary TTS not running. ' + errorMessage)

            else:
                time.sleep(0.1)