#!/usr/bin/env node

const Application = require('jeneric/core/application');

class Main extends Application {

    constructor() {

        super();

        this.modules.brain.on('data', (data) => {

            this.modules.logger.debug(data);

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