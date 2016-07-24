#!/usr/bin/env python
import RPi.GPIO as GPIO
import sys

if sys.argv[1] == 'clean':
    GPIO.setwarnings(False)
    GPIO.cleanup()
    GPIO.setwarnings(True)
elif sys.argv[1] == 'setup':
    print 'setup'
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(int(sys.argv[2]), int(sys.argv[3]))
elif sys.argv[1] == 'output':
    print 'output'
    GPIO.setmode(GPIO.BOARD)
    GPIO.output(int(sys.argv[2]), int(sys.argv[3]))



