#!/usr/bin/env python3

import time

from bionics.interface import Interface
from bionics.speaker_thread import SpeakerThread


class Controller:

    def __init__(self):
        self.interface = Interface()

        self.speaker = SpeakerThread(self.interface)

        self.interface.queues.speaker.put('Es nervt')

        self.run()

    def run(self):
        while True:
            print('running')
            time.sleep(1)