from __future__ import division
import logging
import time
import math
import smbus


class Hat:

    address = 0x40
    mode1 = 0x00
    mode2 = 0x01
    prescale = 0xFE

    bus = smbus.SMBus(1)

    def __init__(self):

        self.set_all_pwm(0, 0)

        self.bus.write_byte_data(self.address, self.mode2, 0x04)
        self.bus.write_byte_data(self.address, self.mode1, 0x01)

        time.sleep(0.005)  # wait for oscillator

        mode1 = self.bus.read_byte_data(self.address, self.mode1) & 0xFF
        mode1 = mode1 & ~0x10  # wake up (reset sleep)

        self.bus.write_byte_data(self.address, self.mode1, mode1)
        time.sleep(0.005)  # wait for oscillator

    def set_pwm_freq(self, freq_hz):

        prescaleval = 25000000.0    # 25MHz
        prescaleval /= 4096.0       # 12-bit
        prescaleval /= float(freq_hz)
        prescaleval -= 1.0
        prescale = int(math.floor(prescaleval + 0.5))

        oldmode = self.bus.read_byte_data(self.address, self.mode1) & 0xFF
        newmode = (oldmode & 0x7F) | 0x10  # sleep

        self.bus.write_byte_data(self.address, self.mode1, newmode)  # go to sleep
        self.bus.write_byte_data(self.address, self.prescale, prescale)
        self.bus.write_byte_data(self.address, self.mode1, oldmode)
        time.sleep(0.005)
        self.bus.write_byte_data(self.address, self.mode1, oldmode | 0x80)

    def set_pwm(self, channel, on, off):
        self.bus.write_byte_data(self.address, 0x06 + 4 * channel, on & 0xFF)
        self.bus.write_byte_data(self.address, 0x07 + 4 * channel, on >> 8)
        self.bus.write_byte_data(self.address, 0x08 + 4 * channel, off & 0xFF)
        self.bus.write_byte_data(self.address, 0x09 + 4 * channel, off >> 8)

    def set_all_pwm(self, on, off):
        self.bus.write_byte_data(self.address, 0xFA, on & 0xFF)
        self.bus.write_byte_data(self.address, 0xFB, on >> 8)
        self.bus.write_byte_data(self.address, 0xFC, off & 0xFF)
        self.bus.write_byte_data(self.address, 0xFD, off >> 8)


pwm = ServoHat()
pwm.set_pwm_freq(60)

while True:
    pwm.set_pwm(1, 0, 400)
    time.sleep(1)
    pwm.set_pwm(1, 0, 500)
    time.sleep(1)
