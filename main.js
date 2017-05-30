#!/usr/bin/env node

const Application = require('./app/core/application');

class Main extends Application {

    constructor() {

        super();

        this._initialCheck = false;
        this._updateInterval = setInterval(this.update.bind(this), 20);

    }

    get systemCheck() {

        if(!this.marytts.running) {
            this.marytts.start();
            return false;
        }

        return true;

    }

    registerListener() {
        this.server.on('connection', this.handleServerConnection.bind(this));
        this.server.on('data', this.handleData.bind(this))
    }

    handleServerConnection() {
        this.logger.debug('new user connection');
    }

    handleData(data) {
        this.logger.debug('new data send', data);
    }

    update() {

        if(false === this.systemCheck) {

            // check system, if initial check correct but system check not correct stop running update method
            if(true === this._initialCheck) {
                this.logger.error('system check false. initial check true. stop running update method.');
                clearInterval(this._updateInterval);
                return false;
            }

            return false;

        }

        // check system and set initial check
        if(true === this.systemCheck && false === this._initialCheck) {
            this.speaker.say('Systeme gestartet.');
            this.logger.info('Systeme gestartet.');
            this._initialCheck = true;
            this.registerListener();
        }

        // do all things
    }
}

let main = new Main();