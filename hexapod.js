#!/usr/bin/env node

const config = require('jeneric/core/config');
const logger = require('jeneric/module/logger');
const marytts = require('jeneric/module/marytts');
const speaker = require('jeneric/module/speaker');

class Hexapod {

    constructor() {

        this._running = false;

        setInterval(this.checkSystem.bind(this), 500);

    }

    start() {

        speaker.say('Alle Systeme erfolgreich gestartet.');

    }

    checkSystem() {
        if(!marytts.running) {
            marytts.start();
        } else {
            this._running = true;
        }

        if(this._running) this.start();
    }
}

let hexapod = new Hexapod();