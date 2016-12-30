from websocket_server import WebsocketServer

class Server:

    websocket_server = WebsocketServer(4000, host='127.0.0.1')

    def __init__(self, commandQueue):

        self.commandQueue = commandQueue
        self.websocket_server.set_fn_new_client(self.__handle_new_client)
        self.websocket_server.run_forever()

    def __handle_new_client(self, client, server):

        while 1:
            if not self.commandQueue.empty():
                command = self.commandQueue.get()
                print(command.message)
                self.websocket_server.send_message_to_all(command.message)