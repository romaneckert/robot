#!/usr/bin/env node

const Application = require('./app/core/application');

class Main extends Application {

    constructor() {

        super();

        this._status = 0;

        this.brain.on('data', (data) => {

            this.logger.debug(data);

        });

        setInterval(this.update.bind(this), 200);
    }

    update() {

        if(1 === this._status) {
            this._status = 2;
            this.speaker.say('Systeme gestartet.');
        }

        if(!this.systemCheck()) return false;

    }

    systemCheck() {

        if(!this.marytts.running) {
            this.marytts.start();
            return false;
        }

        if(0 === this._status) this._status = 1;

        return true;
    }

}

let main = new Main();