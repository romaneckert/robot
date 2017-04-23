#!/usr/bin/env node

const Application = require('jeneric/core/application');

console.log(Application);

class Main extends Application {

    constructor() {

        super();

        this.logger.debug('start application');

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