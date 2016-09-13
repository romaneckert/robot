#!/usr/bin/env python
import time
import logging
import urllib.request
import urllib.parse
import os
import subprocess
from slugify import slugify
from multiprocessing import Process, Queue

class Controller:

    fps = 60

    delta_time = 0
    last_time = 0
    start_time = 0

    queue = Queue()

    def __init__(self):
        self.last_time = time.time()
        self.start_time = self.last_time

    def activate(self):
        while True:
            current_time = time.time()
            self.delta_time = current_time - self.last_time
            self.last_time = current_time

            self.update()

            sleep_time = 1.0/self.fps - time.time() + current_time

            if sleep_time > 0:
                time.sleep(sleep_time)

    def update(self):
        print('must implement update function')

    def log(self, message, type):
        logging.basicConfig(format='%(asctime)s %(message)s', level=logging.DEBUG, filename='logs/log.log',
                            datefmt='%d-%m-%Y %H:%M:%S')

        if 'info' == type:
            logging.info(message)

    def say(self, message):

        process = Process(target=self.speak, args=(message,))
        process.start()
        # p.join()
        # System.speak(message)

    def speak(self, message):

        self.log(message, 'info')

        file_path = 'sounds/' + slugify(message) + '.wav'

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

            urllib.request.urlretrieve('http://mary.dfki.de:59125/process?' + urllib.parse.urlencode(params),
                                       file_path)

        os.system('mplayer ' + file_path + ' > /dev/null 2>&1')

        self.queue.put(file_path)


