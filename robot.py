#!/usr/bin/env python
try:
    import RPi.GPIO as GPIO
    gpio = 1
except ImportError:
    gpio = 0

from bionics.controller import Controller
from bionics.command import Command
from bionics.queues import Queues
#from bionics.hat import Hat
import time


class Robot(Controller):

    cycle1 = 6
    #cycle2 = 6
    #cycle3 = 6
    cycle_direction1 = 1
    #cycle_direction2 = 1
    #cycle_direction3 = 1

    #hat = Hat()

    def __init__(self):

        Controller.__init__(self)

        #self.hat.set_pwm_freq(60)


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

        self.say('Starte Systeme')
        self.say('Alle Systeme erfolgreich gestartet. Beginne mit laufen...')

        Queues.command.put('Hallo')
        #self.serverQueue.put(Command('log', 'test'))
        self.activate()
        #GPIO.setwarnings(False)
        #GPIO.cleanup()
        #GPIO.setwarnings(True)


    def update(self):

        #print(self.delta_time)



        #print(self.queue.get())

        self.cycle1 += self.delta_time * self.cycle_direction1 * 100

        if self.cycle1 < 250:
            self.cycle1 = 250
            self.cycle_direction1 *= -1

        if self.cycle1 > 600:
            self.cycle1 = 600
            self.cycle_direction1 *= -1

        print(round(self.cycle1))


        #self.serverQueue.put(Command('log', str(round(self.cycle1))))

        #self.hat.set_pwm(1, 0, round(self.cycle1))

        """
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



