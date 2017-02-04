#!/usr/bin/env python3
import queue


class Queue:

    def __init__(self):
        self.__queue = queue.Queue()
        pass

    def put(self, item):
        self.__queue.put(item)

    def get(self):
        return self.__queue.get()

    def empty(self):
        return self.__queue.empty()


class Queues:

    speaker = Queue()
    logger = Queue()


class Interface:

    queues = Queues()



