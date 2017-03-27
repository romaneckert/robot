#!/usr/bin/env node

const config = require('jeneric/core/config');
const logger = require('jeneric/module/logger');
const marytts = require('jeneric/module/marytts');
const speaker = require('jeneric/module/speaker');

class Hexapod {

    constructor() {

        this._check = false;
        this._initialCheck = 0;

        setInterval(this.update.bind(this), 200);

    }

    update() {

        this.checkSystem();

        if(1 === this._initialCheck) {
            this._initialCheck = 2;
            speaker.say('Alle Systeme erfolgreich gestartet.');
        }

    }

    checkSystem() {
        this._check = true;

        if(!marytts.running) {
            marytts.start();
            this._check = false;
        }

        if(this._check && 0 === this._initialCheck) this._initialCheck = 1;
    }
}

let hexapod = new Hexapod();