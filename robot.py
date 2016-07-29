#!/usr/bin/env python
from bionics.controller import Controller
import RPi.GPIO as GPIO
import urllib.request
import os
import _thread

class Robot(Controller):

    motor = None
    cycle = 5
    cycle_direction = 1

    def __init__(self):

        Controller.__init__(self)

        GPIO.cleanup()

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(27, GPIO.OUT)
        self.motor = GPIO.PWM(27, 50)
        self.motor.start(self.cycle)

        #self.playMessage('Hello')
        self.activate()


    def playMessage(self, message):
        urllib.request.urlretrieve('http://mary.dfki.de:59125/process?INPUT_TEXT=Starte%20Systeme!&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=de', 'wav.wav')
        os.system('mplayer wav.wav')

    def update(self):

        self.cycle += self.delta_time * self.cycle_direction * 20

        if self.cycle < 5:
            self.cycle = 5
            self.cycle_direction *= -1

        if self.cycle > 9:
            self.cycle = 9
            self.cycle_direction *= -1

        print(self.cycle)
        self.motor.ChangeDutyCycle(self.cycle)

        print("delta: " + str(self.delta_time))


robot = Robot()



