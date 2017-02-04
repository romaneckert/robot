#!/usr/bin/env python3

import os
import urllib.request
import urllib.parse
from slugify import slugify
from sys import platform


class Speaker:

    def __init__(self, sound_directory='sounds'):
        self.sound_directory = sound_directory

    def speak(self, message):

        error_message = None
        os.makedirs(self.sound_directory, exist_ok=True)
        file_path = self.sound_directory + '/' + slugify(message) + '.wav'

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
                error_message = 'Can not read: ' + url

        if error_message is None:

            player = 'mplayer'

            if 'darwin' == platform:
                player = 'afplay'

            os.system(player + ' ' + file_path + ' > /dev/null 2>&1')

        else:
            return error_message