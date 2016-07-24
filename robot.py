#!/usr/bin/env python
from hawk.controller import Controller
import RPi.GPIO as GPIO
import urllib.request
import subprocess
import pyglet


class Robot(Controller):

    motor = None
    cycle = 2
    cycle_direction = 1

    def __init__(self):

        Controller.__init__(self)

        GPIO.setmode(GPIO.BCM)
        GPIO.setup(17, GPIO.OUT)
        self.motor = GPIO.PWM(17, 50)
        self.motor.start(self.cycle)
        #self.activate()
        self.playMessage('Hello')

    def playMessage(self, message):
        urllib.request.urlretrieve('http://mary.dfki.de:59125/process?INPUT_TEXT=Starte%20Systeme!&INPUT_TYPE=TEXT&OUTPUT_TYPE=AUDIO&AUDIO=WAVE_FILE&LOCALE=de', 'wav.wav')
        os.system('mplayer wav.wav')

    def update(self):

        self.cycle += self.delta_time * self.cycle_direction * 30

        if self.cycle < 2:
            self.cycle = 2
            self.cycle_direction *= -1

        if self.cycle > 9:
            self.cycle = 9
            self.cycle_direction *= -1

        print(self.cycle)
        self.motor.ChangeDutyCycle(self.cycle)

        print("delta: " + str(self.delta_time))


robot = Robot()



