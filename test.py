#!/usr/bin/env python
from bionics.controller import Controller
from bionics.logger import Logger
import time
import subprocess
import urllib.request
import os


class Test(Controller):

    def __init__(self):

        Controller.__init__(self)

        self.playMessage('hello')

        self.activate()

    def playMessage(self, message):
        urllib.request.urlretrieve('http://127.0.0.1:59125/process?INPUT_TEXT=start%20die%20systeme&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=de', 'wav.wav')
        self.process = subprocess.Popen(['mplayer', 'wav.wav'], stdout=subprocess.PIPE)

    def update(self):

        print(str(time.time() - self.start_time))
        print(self.delta_time)

        if time.time() - self.start_time > 10:
            print(self.process.stdout.read())

test = Test()