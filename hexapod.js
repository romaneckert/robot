#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./bionics/speaker');
const logger = require('./bionics/logger');

class Hexapod {

    constructor() {

        speaker.config = {
            'directory' : 'sound'
        };

        logger.info('Start Hexapod.');


        function intervalFunc () {
            console.log('Cant stop me now!');

        }

        setInterval(intervalFunc, 1500);

        console.log('in');

    }
}

var hexapod = new Hexapod();