#!/usr/bin/env node

const Application = require('./app/core/application');

class Main extends Application {

    constructor() {

        super();

        this.logger.debug('start application');

        this.brain.on('data', (data) => {

            this.logger.debug(data);

            console.log(data);
        });

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