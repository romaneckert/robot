#!/usr/bin/env node
const AbstractApplication = require('@jeneric/app/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {
    constructor(config) {
        super(config);
    }

    start() {
        this.logger.info('application started');
        this.say('Systeme erfolgreich gestartet.');
        this.say('Erwarte Eingabe.');

        setInterval(this.loop.bind(this), 2000);
    }

    loop() {

        this.logger.debug('loop');

        this.server.broadcast({
            handler : 'log'
        });
    }

    say(message) {
        return this.services.speaker.say(message);
    }
}

let main = new Main(config);
