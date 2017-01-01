from websocket_server import WebsocketServer
import threading
from bionics.queues import Queues

class Server (threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)
        self.websocket_server = WebsocketServer(4000, host='127.0.0.1')
        self.websocket_server.set_fn_new_client(self.__handle_new_client)

    def run(self):
        self.websocket_server.run_forever()

    def __handle_new_client(self, client, server):

        while 1:

            if not Queues.command.empty():
                command = Queues.command.get()
                print(command)
                self.websocket_server.send_message_to_all(command)
            else:
                time.sleep(0.1)