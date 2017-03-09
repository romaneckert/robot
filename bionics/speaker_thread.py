#!/usr/bin/env python3

from threading import Thread
from essentials.speaker import Speaker
from bionics.dispatcher import Dispatcher


class SpeakerThread(Thread):

    def __init__(self):
        Thread.__init__(self)
        self.speaker = Speaker()
        self.start()

    def run(self):
        while True:

            if not Dispatcher.speaker.empty():

                message = Dispatcher.speaker.get()
                Dispatcher.logger.put(message)
                self.speaker.speak(message)

