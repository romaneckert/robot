#!/usr/bin/env python3

import time
from essentials.speaker import Speaker
from test import Queue

class Controller:

    def __init__(self):
        self.speaker_queue = Queue()
        self.logger_queue = Queue()

        self.speaker = Speaker(self.speaker_queue, self.logger_queue)
        self.speaker.start()

        self.speaker_queue.put({'message': 'Hallo mein Freund'})
        print('hello')

    def run(self):
        while True:
            print('running')
            time.sleep(1)