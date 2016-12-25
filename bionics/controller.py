#!/usr/bin/env python
import logging
import os
from sys import platform
import subprocess
import time
import urllib.parse
import urllib.request
from multiprocessing import Process, Queue
from slugify import slugify


class Controller:

    fps = 2

    delta_time = 0
    last_time = 0
    start_time = 0

    messageQueue = Queue()
    messageProcess = 0

    def __init__(self):

        self.messageProcess = Process(target=self.__speak, args=(self.messageQueue,)).start()
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

        log_directory = 'logs'
        os.makedirs(log_directory, exist_ok=True)

        logging.basicConfig(format='%(asctime)s %(message)s', level=logging.DEBUG, filename=log_directory + '/log.log',
                            datefmt='%d-%m-%Y %H:%M:%S')

        if 'info' == type:
            logging.info(message)

    # start new process with a message to speak
    def say(self, message):
        self.messageQueue.put(message)

    # play a message
    def __speak(self, queue):

        while True:

            if not queue.empty():

                message = queue.get()

                print(message)

                self.log(message, 'info')

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

                    urllib.request.urlretrieve('http://mary.dfki.de:59125/process?' + urllib.parse.urlencode(params),
                                               file_path)

                if 'darwin' == platform:
                    os.system('afplay ' + file_path + ' > /dev/null 2>&1')
                else:
                    os.system('mplayer ' + file_path + ' > /dev/null 2>&1')

