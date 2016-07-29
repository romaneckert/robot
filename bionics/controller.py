#!/usr/bin/env python
import time
import RPi.GPIO as GPIO

class Controller:

    fps = 60

    delta_time = 0
    last_time = 0

    def __init__(self):
        self.last_time = time.time()

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


