#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./bionics/speaker');
const logger = require('./bionics/logger');
const db = require('./bionics/db');

class Hexapod {

    constructor() {

        logger.info('Start Hexapod.');

        function intervalFunc () {
            console.log('interval');

            if(speaker.ready) {
                speaker.say('hello world');
            }

        }

        setInterval(intervalFunc, 1500);

    }
}

var hexapod = new Hexapod();