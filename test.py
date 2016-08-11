#!/usr/bin/env python
from bionics.controller import Controller
from bionics.logger import Logger
import time


class Test(Controller):

    def __init__(self):

        Controller.__init__(self)

        Logger.log('Hello', 'info')
        self.activate()

    def update(self):

        print(str(time.time() - self.start_time))
        print(self.delta_time)

test = Test()