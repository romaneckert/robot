#!/usr/bin/env node

const Application = require('./app/core/application');
const sleep = require('sleep');

class Main extends Application {

    constructor() {

        super();

        this._initialCheck = false;
        this._loopInterval = setInterval(this.loop.bind(this), 100);
        this._deltaTime = null; // delta time
        this._loopStartTime = null;
        this._lastLoopStartTime = null;
        this._loopEndTime = null;
        this._loopDurations = [];
        this._loopAverageDuration = 0;
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

    loop() {

        this._loopStartTime = (process.hrtime()[0] * 1e9 + process.hrtime()[1]) / 1e6;

        if(false === this.systemCheck) {

            // check system, if initial check correct but system check not correct stop running update method
            if(true === this._initialCheck) {
                this.logger.error('system check false. initial check true. stop running update method.');
                clearInterval(this._loopInterval);
                return false;
            }

            return false;

        }

        // check system and set initial check
        if(true === this.systemCheck && false === this._initialCheck) {
            this.speaker.say('Systeme gestartet.');
            this.logger.info('system start');
            this._initialCheck = true;
            this.registerListener();
        }

        // update date times for calculation in loops
        if(null === this._lastLoopStartTime) {
            this._lastLoopStartTime = this._loopStartTime;
            return true;
        }

        this._deltaTime = this._loopStartTime - this._lastLoopStartTime;

        //console.log('diff: ' + this._deltaTime);

        this._lastLoopStartTime = this._loopStartTime;

        this._loopEndTime = (process.hrtime()[0] * 1e9 + process.hrtime()[1]) / 1e6;

        this._loopDurations.push(this._loopEndTime - this._loopStartTime);
        if(this._loopDurations.length > 100) this._loopDurations.shift();

        console.log(this.loopAverageDuration);

        this.pca9685.setPwm(0, 0, 400);
        sleep.msleep(1000);
        this.pca9685.setPwm(0, 0, 500);
        sleep.msleep(1000)

    }

    get loopAverageDuration() {

        let total = 0;
        for(let i in this._loopDurations) {
            total += this._loopDurations[i];
        }

        return total / this._loopDurations.length;
    }
}

let main = new Main();