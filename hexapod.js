#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./bionics_old/speaker');
const logger = require('./bionics_old/logger');
const em = require('sinfonie/manager/entity-manager');
const Log = require('./app/entity/log');

class Hexapod {

    constructor() {

        em.persist(new Log(''));

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