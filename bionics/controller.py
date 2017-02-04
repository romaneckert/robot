#!/usr/bin/env python3

import time

from bionics.interface import Interface
from bionics.speaker_thread import SpeakerThread


class Controller:

    def __init__(self):
        self.interface = Interface()

        self.speaker = SpeakerThread(self.interface)

        self.interface.queues.speaker.put('Komm her du geile Sau')
        self.interface.queues.speaker.put('Lass dich abknutschen')
        self.interface.queues.speaker.put('Jetzt sofort!')


        print('hello')

    def run(self):
        while True:
            print('running')
            time.sleep(1)