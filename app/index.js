#!/usr/bin/env node
const AbstractApplication = require('@jeneric/app/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {
    constructor(config) {
        super(config);
    }

    start() {
        this.logger.info('application started');
        this.say('application started');
    }

    say(message) {
        return this.services.speaker.say(message);
    }
}

let main = new Main(config);
