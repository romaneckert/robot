#!/usr/bin/env python3

from bionics.controller_thread import ControllerThread
from bionics.speaker_thread import SpeakerThread
from bionics.dispatcher import Dispatcher


class Hexapod:

    def __init__(self):

        Dispatcher.speaker.put('Alle Systeme gestartet.')

        self.speaker_thread = SpeakerThread()
        self.controller_thread = ControllerThread()


hexapod = Hexapod()