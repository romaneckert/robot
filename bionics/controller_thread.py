#!/usr/bin/env python3

import time

from threading import Thread


class ControllerThread(Thread):

    def __init__(self):

        Thread.__init__(self)

        self.start()

    def run(self):
        while True:
            print('running')
            time.sleep(1)
