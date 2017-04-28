#!/usr/bin/env node

const Application = require('jeneric/core/application');

class Main extends Application {

    constructor() {

        super();

        this.pipe.emit('message', 'info');

        this.services.logger.info('info message');

        this.services.logger.debug('debug message');

        this.services.logger.debug('debug message', false);
        this.services.logger.debug(true, false);

        //this.error('an error occurred', {'test':'test'});

        //setInterval(this.update.bind(this), 200);
    }

    update() {

        //if(!this.systemCheck()) return false;

    }

    systemCheck() {

        if(!this.marytts.running) {
            this.marytts.start();
            return false;
        }

    }

}

let main = new Main();