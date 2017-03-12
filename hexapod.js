#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./bionics/speaker');
const logger = require('./bionics/logger');
const db = require('./bionics/db');

class Hexapod {

    constructor() {

        logger.info('Start Hexapod.');

        function intervalFunc () {
            console.log('Cant stop me now!');

        }

        setInterval(intervalFunc, 1500);

        console.log(db.logs.find());

    }
}

var hexapod = new Hexapod();