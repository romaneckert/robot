#!/usr/bin/env node

const config = require('jeneric/core/config');

class Hexapod {

    constructor() {

        this._initialCheck = false;
        //this.start();
    }

    start() {

        logger.info("Start Hexapod");
        setInterval(this.checkSystem, 100);
        speaker.say('Starte Systeme...');

    }

    checkSystem() {
        if(speaker.ready && !this._initialCheck) {
            speaker.say('Alle Systeme erfolgreich gestartet.');
            this._initialCheck = true;
        }
    }
}

let hexapod = new Hexapod();