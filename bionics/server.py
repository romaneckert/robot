#!/usr/bin/env python3

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import threading
from bionics.queues import Queues


class Server (threading.Thread):

    clients = []

    def __init__(self):
        threading.Thread.__init__(self)
        self.server = SimpleWebSocketServer('', 8000, Socket)

    @staticmethod
    def send(command):
        for client in Server.clients:
            client.sendMessage(command)

    def run(self):
        self.server.serveforever()


class Socket(WebSocket):

    def handleMessage(self):
        Queues.message.put(self.data)

    def handleConnected(self):
        Queues.message.put('Externes Gerät verbunden.')
        Server.clients.append(self)

    def handleClose(self):
        print('close')