#!/usr/bin/env python3

from threading import Thread
from bionics.dispatcher import Dispatcher


class LoggerThread(Thread):

    def __init__(self):
        Thread.__init__(self)

        self.log_directory = 'logs'
        self.log_file = 'log.log'


        self.start()

    def run(self):
        while True:

            if not Dispatcher.logger.empty():

                message = Dispatcher.logger.get()


