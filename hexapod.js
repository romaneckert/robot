#!/usr/bin/env node

const logger = require('jeneric/util/logger');
const speaker = require('jeneric/util/speaker');

class Hexapod {

    constructor() {

        this._initialCheck = false;
        this.start();
    }

    start() {

        logger.info("Start Hexapod");
        setInterval(this.checkSystem, 100);

    }

    checkSystem() {
        if(speaker.ready && !this._initialCheck) {
            speaker.say('Alle Systeme erfolgreich gestartet.');
            this._initialCheck = true;
        }
    }
}

let hexapod = new Hexapod();