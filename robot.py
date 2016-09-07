#!/usr/bin/env python
from bionics.controller import Controller
from bionics.system import System
import RPi.GPIO as GPIO
import urllib.request
import urllib.parse
import os

class Robot(Controller):

    #motor = None
    #cycle1 = 6
    #cycle2 = 6
    #cycle3 = 6
    #cycle_direction1 = 1
    #cycle_direction2 = 1
    #cycle_direction3 = 1

    def __init__(self):

        Controller.__init__(self)

        #GPIO.setmode(GPIO.BCM)
        #GPIO.setup(23, GPIO.OUT)
        #GPIO.setup(17, GPIO.OUT)
        #GPIO.setup(25, GPIO.OUT)
        #self.motor1 = GPIO.PWM(23, 50)
        #self.motor2 = GPIO.PWM(17, 50)
        #self.motor3 = GPIO.PWM(25, 50)
        #self.motor1.start(self.cycle1)
        #self.motor2.start(self.cycle2)
        #self.motor3.start(self.cycle3)

        System.say('Starte Systeme');
        #self.activate()
        GPIO.setwarnings(False)
        GPIO.cleanup()
        GPIO.setwarnings(True)

    def update(self):

        """
        self.cycle1 += self.delta_time * self.cycle_direction1 * 5

        if self.cycle1 < 6:
            self.cycle1 = 6
            self.cycle_direction1 *= -1

        if self.cycle1 > 10:
            self.cycle1 = 10
            self.cycle_direction1 *= -1

        self.cycle2 += self.delta_time * self.cycle_direction2 * 5

        if self.cycle2 < 3:
            self.cycle2 = 3
            self.cycle_direction2 *= -1

        if self.cycle2 > 8:
            self.cycle2 = 8
            self.cycle_direction2 *= -1

        self.cycle3 += self.delta_time * self.cycle_direction3 * 5

        if self.cycle3 < 4:
            self.cycle3 = 4
            self.cycle_direction3 *= -1

        if self.cycle3 > 8:
            self.cycle3 = 8
            self.cycle_direction3 *= -1

        self.motor1.ChangeDutyCycle(self.cycle1)
        self.motor2.ChangeDutyCycle(self.cycle2)
        self.motor3.ChangeDutyCycle(self.cycle3)

        print(str(self.delta_time) + " " + str(self.cycle1))

        """

robot = Robot()



