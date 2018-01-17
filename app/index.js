#!/usr/bin/env node
const AbstractApplication = require('@jeneric/core/app/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);
    }

    start() {

        this.say('Systeme erfolgreich gestartet.');

        setInterval(this.loop.bind(this), 2000);
        this.logger.info('application started');

    }

    loop() {

        this.logger.debug('loop ' + Date.now());

        this.server.broadcast({
            handler : 'log',
            data : {
                test : 1
            }
        });

    }

    say(message) {
        return this.services.speaker.say(message);
    }
}

new Main(config);
