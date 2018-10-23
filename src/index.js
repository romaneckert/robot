#!/usr/bin/env node
const AbstractApplication = require('@jeneric/core/app/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);

        this.say('Systeme erfolgreich gestartet.');

        setInterval(this.loop.bind(this), 5000);
        this.logger.info('application started');

    }

    loop() {

        this.logger.debug('loop ' + Date.now());

    }

    say(message) {
        return this.services.speaker.say(message);
    }
}

new Main(config);
