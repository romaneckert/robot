#!/usr/bin/env python3

from threading import Thread
from essentials.speaker import Speaker


class SpeakerThread(Thread):

    def __init__(self, interface):
        Thread.__init__(self)
        self.interface = interface
        self.speaker = Speaker()
        self.start()

    def run(self):
        while True:

            if not self.interface.queues.speaker.empty():

                message = self.interface.queues.speaker.get()
                self.speaker.speak(message)
