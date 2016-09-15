from __future__ import division
import logging
import time
import math
import smbus

# Registers/etc:
PCA9685_ADDRESS    = 0x40
MODE1              = 0x00
MODE2              = 0x01
SUBADR1            = 0x02
SUBADR2            = 0x03
SUBADR3            = 0x04
PRESCALE           = 0xFE
LED0_ON_L          = 0x06
LED0_ON_H          = 0x07
LED0_OFF_L         = 0x08
LED0_OFF_H         = 0x09
ALL_LED_ON_L       = 0xFA
ALL_LED_ON_H       = 0xFB
ALL_LED_OFF_L      = 0xFC
ALL_LED_OFF_H      = 0xFD

# Bits:
RESTART            = 0x80
SLEEP              = 0x10
ALLCALL            = 0x01
INVRT              = 0x10
OUTDRV             = 0x04

class PCA9685(object):

    address = 0x40
    bus = smbus.SMBus(1)

    def __init__(self):

        self.set_all_pwm(0, 0)

        self.bus.write_byte_data(self.address, MODE2, OUTDRV)
        self.bus.write_byte_data(self.address, MODE1, ALLCALL)

        time.sleep(0.005)  # wait for oscillator

        mode1 = self.bus.read_byte_data(self.address, MODE1) & 0xFF
        mode1 = mode1 & ~SLEEP  # wake up (reset sleep)

        self.bus.write_byte_data(self.address, MODE1, mode1)
        time.sleep(0.005)  # wait for oscillator

    def set_pwm_freq(self, freq_hz):

        prescaleval = 25000000.0    # 25MHz
        prescaleval /= 4096.0       # 12-bit
        prescaleval /= float(freq_hz)
        prescaleval -= 1.0
        prescale = int(math.floor(prescaleval + 0.5))

        oldmode = self.bus.read_byte_data(self.address, MODE1) & 0xFF
        newmode = (oldmode & 0x7F) | 0x10  # sleep

        self.bus.write_byte_data(self.address, MODE1, newmode)  # go to sleep
        self.bus.write_byte_data(self.address, PRESCALE, prescale)
        self.bus.write_byte_data(self.address, MODE1, oldmode)
        time.sleep(0.005)
        self.bus.write_byte_data(self.address, MODE1, oldmode | 0x80)

    def set_pwm(self, channel, on, off):
        self.bus.write_byte_data(self.address, LED0_ON_L+4*channel, on & 0xFF)
        self.bus.write_byte_data(self.address, LED0_ON_H+4*channel, on >> 8)
        self.bus.write_byte_data(self.address, LED0_OFF_L+4*channel, off & 0xFF)
        self.bus.write_byte_data(self.address, LED0_OFF_H+4*channel, off >> 8)

    def set_all_pwm(self, on, off):
        self.bus.write_byte_data(self.address, ALL_LED_ON_L, on & 0xFF)
        self.bus.write_byte_data(self.address, ALL_LED_ON_H, on >> 8)
        self.bus.write_byte_data(self.address, ALL_LED_OFF_L, off & 0xFF)
        self.bus.write_byte_data(self.address, ALL_LED_OFF_H, off >> 8)


pwm = PCA9685()
pwm.set_pwm_freq(60)

while True:
    pwm.set_pwm(0, 0, 400)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 420)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 430)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 440)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 450)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 460)
    time.sleep(0.5)
    pwm.set_pwm(0, 0, 350)
    time.sleep(0.5)