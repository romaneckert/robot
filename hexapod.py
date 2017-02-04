#!/usr/bin/env python3

from bionics.controller import Controller


class Hexapod(Controller):

    def __init__(self):
        Controller.__init__(self)

hexapod = Hexapod()
hexapod.run()