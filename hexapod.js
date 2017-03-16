#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./bionics/speaker');
const logger = require('./bionics/logger');
const db = require('./bionics/db');

class Hexapod {

    constructor() {
        this._initialCheck = false;
        this.start();
    }

    start() {
        logger.info('Start Hexapod');
        setInterval(this.checkSystem, 100);
        speaker.say('Starte');

    }

    checkSystem() {
        if(speaker.ready && !this._initialCheck) {
            speaker.say('Alle Systeme erfolgreich gestartet.');
            this._initialCheck = true;
        }
    }
}

var hexapod = new Hexapod();