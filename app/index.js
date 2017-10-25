#!/usr/bin/env node
const AbstractApplication = require('@jeneric/core/abstract-application');
const config = require('./config/app.js');

class Main extends AbstractApplication {
    constructor(config) {

        super(config);

        this._initialCheck = false;
        this._loopInterval = setInterval(this.loop.bind(this), 8);

    }

    loop() {

        if (false === this.systemCheck) {

            // check system, if initial check correct but system check not correct stop running update method
            if (true === this._initialCheck) {
                clearInterval(this._loopInterval);
                throw new Error('system check false but initial check true.');
            }

            return false;

        }

        if(!this._initialCheck) {
            this._start();
        }

        this._initialCheck = true;


    }

    _start() {
        this.logger.info('application started');
    }

    get systemCheck() {
        // check if kernel is ready
        return this.kernel.ready;
    }


}

let main = new Main(config);