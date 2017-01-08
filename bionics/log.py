#!/usr/bin/python3

import os
import logging

class Log:

    @staticmethod
    def info(message):
        logging.info(message)

    @staticmethod
    def error(message):
        logging.error(message)

    @staticmethod
    def setup():
        log_directory = 'logs'
        os.makedirs(log_directory, exist_ok=True)

        logging.basicConfig(format='[%(asctime)s] [%(levelname)s] [%(message)s]',
                            level=logging.DEBUG,
                            filename=log_directory + '/log.log',
                            datefmt='%d-%m-%Y %H:%M:%S')