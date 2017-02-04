#!/usr/bin/env python3

import time
from essentials.speaker import Speaker
from bionics.interface import Interface

class Controller:

    def __init__(self):
        self.interface = Interface()

        self.speaker = Speaker(self.interface)
        self.speaker.start()

        self.interface.queues.speaker.put('Hallo mein Freund')

        print('hello')

    def run(self):
        while True:
            print('running')
            time.sleep(1)