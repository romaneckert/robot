#!/usr/bin/env python3

import logging
import time
import os
import urllib.parse
import urllib.request
import urllib.error
from slugify import slugify
from sys import platform
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import threading
import queue
import subprocess
from http.server import SimpleHTTPRequestHandler,HTTPServer


class Controller:

    def __init__(self):

        Log.setup()

        mary_tts_server = MaryTtsServer()

        while 5.2 != mary_tts_server.get_version():
            pass

        self.speaker = Speaker()
        self.speaker.start()

        self.socketServer = SocketServer()
        self.socketServer.start()

        self.httpServer = SimpleHTTPServer()
        self.httpServer.start()

        self.last_time = time.time()
        self.start_time = self.last_time
        self.delta_time = 0
        self.fps = 2

    def activate(self):
        while True:
            current_time = time.time()
            self.delta_time = current_time - self.last_time
            self.last_time = current_time

            self.update()

            sleep_time = 1.0/self.fps - time.time() + current_time

            if sleep_time > 0:
                time.sleep(sleep_time)

    def update(self):
        print('must implement update function')

    # start new process with a message to speak
    def say(self, message):
        Queues.message.put(message)


class Log:

    log_directory = 'logs'
    log_file = 'log.log'

    @staticmethod
    def latest():

        messages = []

        file_object = open(Log.log_directory + '/' + Log.log_file)
        for line in file_object:
            messages.append(line)
        file_object.close()
        return messages

    @staticmethod
    def info(message):
        logging.info(message)
        SocketServer.send(message)


    @staticmethod
    def error(message):
        logging.error(message)
        SocketServer.send(message)

    @staticmethod
    def setup():
        os.makedirs(Log.log_directory, exist_ok=True)

        logging.basicConfig(format='[%(asctime)s] [%(levelname)s] [%(message)s]',
                            level=logging.DEBUG,
                            filename=Log.log_directory + '/' + Log.log_file,
                            datefmt='%d-%m-%Y %H:%M:%S')


class MaryTtsServer (threading.Thread):

    __version = 0
    __pid = 0

    def __init__(self):
        threading.Thread.__init__(self)
        self.start()

    def run(self):

        while True:

            if self.get_version() != 5.2:
                print(self.get_version())
                command = "./vendor/marytts-5.2/bin/marytts-server"
                self.__pid = subprocess.Popen(command, preexec_fn=os.setpgrp)
                Log.info('Starting MaryTTS')
                time.sleep(10)

            time.sleep(1)

    def get_version(self):
        try:
            urllib.request.urlopen('http://localhost:59125/version').read().decode('utf-8')
            self.__version = 5.2
        except urllib.error.URLError:
            self.__version = 0
        return self.__version


class Speaker (threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)

    def run(self):
        while True:

            if not Queues.message.empty():

                message = Queues.message.get()
                Log.info(message)
                error = 0

                sound_directory = 'sounds'
                os.makedirs(sound_directory, exist_ok=True)

                file_path = sound_directory + '/' + slugify(message) + '.wav'

                if not (os.path.exists(file_path)):
                    params = (('INPUT_TEXT', message),
                              ('INPUT_TYPE', 'TEXT'),
                              ('OUTPUT_TYPE', 'AUDIO'),
                              ('AUDIO', 'WAVE_FILE'),
                              ('LOCALE', 'de'),
                              ('effect_Chorus_selected', 'on'),
                              ('effect_Chorus_parameters',
                               'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'))

                    url = 'http://localhost:59125/process?' + urllib.parse.urlencode(params)

                    try:
                        urllib.request.urlretrieve(url, file_path)

                    except:
                        errorMessage = 'Can not read: ' + url
                        error = 1

                if not error:

                    Queues.command.put(message)

                    if 'darwin' == platform:
                        os.system('afplay ' + file_path + ' > /dev/null 2>&1')
                    else:
                        os.system('mplayer ' + file_path + ' > /dev/null 2>&1')
                else:
                    Log.error('Mary TTS not running. ' + errorMessage)

            else:
                time.sleep(0.1)


class SocketServer (threading.Thread):

    clients = []

    def __init__(self):
        threading.Thread.__init__(self)
        self.server = SimpleWebSocketServer('', 8001, Socket)

    @staticmethod
    def send(message):
        for client in SocketServer.clients:
            client.sendMessage(message)

    def run(self):
        self.server.serveforever()


class Socket(WebSocket):

    def handleMessage(self):
        Queues.message.put(self.data)

    def handleConnected(self):
        Queues.message.put('Externes Gerät verbunden.')
        SocketServer.clients.append(self)

        for message in Log.latest():
            SocketServer.send(message)

    def handleClose(self):
        print('close')


class HTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        message = "Hello world!"
        self.wfile.write(bytes(message, "utf8"))
        return


class SimpleHTTPServer(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.server = HTTPServer(('', 8000), HTTPRequestHandler)

    def run(self):
        self.server.serve_forever()


class Queues:
    message = queue.Queue()
    command = queue.Queue()