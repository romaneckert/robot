#!/usr/bin/env python
import logging

class Logger:

    @staticmethod
    def log(message,type):
        logging.basicConfig(format='%(asctime)s %(message)s', level=logging.DEBUG, filename='robot.log', datefmt='%m-%d-%Y %H:%M:%S')

        if 'info' == type:
            logging.info(message)

