#!/usr/bin/env python
import logging

class System:

    @staticmethod
    def log(message,type):
        logging.basicConfig(format='%(asctime)s %(message)s', level=logging.DEBUG, filename='logs/log.log', datefmt='%d-%m-%Y %H:%M:%S')

        if 'info' == type:
            logging.info(message)

    @staticmethod
    def say(message):

        System.log(message, 'info')

        params = (('INPUT_TEXT', message),
                  ('INPUT_TYPE', 'TEXT'),
                  ('OUTPUT_TYPE', 'AUDIO'),
                  ('AUDIO', 'WAVE_FILE'),
                  ('LOCALE', 'de'),
                  ('effect_Volume_selected', 'on'),
                  ('effect_Volume_parameters', 'amount:2.0'))
                  #('effect_Chorus_selected', 'on'),
                  #('effect_Chorus_parameters', 'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'))

        urllib.request.urlretrieve('http://mary.dfki.de:59125/process?' + urllib.parse.urlencode(params), 'wav.wav')
        os.system('mplayer wav.wav')