#!/usr/bin/env python3

import time
from bionics.server import Server
from bionics.speaker import Speaker
from bionics.queues import Queues
from bionics.log import Log


class Controller:

    def __init__(self):

        Log.setup()

        self.speaker = Speaker()
        self.speaker.start()

        self.server = Server()
        self.server.start()

        self.last_time = time.time()
        self.start_time = self.last_time
        self.delta_time = 0
        self.fps = 60

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

    # start new process with a message to speak
    def say(self, message):
        Queues.message.put(message)

