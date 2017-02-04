#!/usr/bin/env python3
import queue


class Queue:

    __queue = queue.Queue()

    def __init__(self):
        pass

    def put(self, item):
        self.__queue.put(item)

    def get(self):
        return self.__queue.get()


class Queues:

    speaker = Queue()
    logger = Queue()


class Interface:

    queues = Queues()



