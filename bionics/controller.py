#!/usr/bin/python3
import logging
import time
from bionics.server import Server
from bionics.speaker import Speaker
from bionics.queues import Queues

class Controller:

    def __init__(self):

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

    def log(self, message, type):

        log_directory = 'logs'
        os.makedirs(log_directory, exist_ok=True)

        logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',
                            level=logging.DEBUG,
                            filename=log_directory + '/' + type + '.log',
                            datefmt='%d-%m-%Y %H:%M:%S')

        if 'info' == type:
            logging.info(message)
        elif 'error' == type:
            logging.error(message)
        elif 'critical' == type:
            logging.critical(message)

    # start new process with a message to speak
    def say(self, message):
        Queues.message.put(message)

