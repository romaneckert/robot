#!/usr/bin/env node

const Application = require('./app/core/application');
const sleep = require('sleep');

class Main extends Application {

    constructor() {

        super();

        this.kernel.init(require('./app/config/config.js'));

        this.logger.debug('===================================================');
        this.logger.debug('start application');

        this._initialCheck = false;
        this._deltaTime = null; // delta time
        this._loopStartTime = null;
        this._lastLoopStartTime = null;
        this._loopEndTime = null;
        this._loopDurations = [];
        this._infoTime = null;

        this._loopInterval = setInterval(this.loop.bind(this), 8);
    }

    handleMaryttsStdOut(data) {
        this.logger.info(data);
    }

    handleMaryttsStdErr(data) {
        this.logger.info(data);
    }

    handleMaryttsClose(data) {
        this.logger.info(data);
    }

    get systemCheck() {

        return this.data.ready;

        // check if marytts server is running
        //if(!this.marytts.running) {
        //    this.marytts.start(this.handleMaryttsStdOut.bind(this), this.handleMaryttsStdErr.bind(this), this.handleMaryttsClose.bind(this));
        //    return false;
        //}

    }

    registerListener() {
        this.server.onConnection(this.handleServerConnection.bind(this));
    }

    handleServerConnection(socket) {
        this.logger.info('new user connection');

        socket.on('data', this.handleData.bind(this));
    }

    handleData(data) {
        this.logger.info('new data send', data);
    }

    loop() {

        this._loopStartTime = this.time;

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
            this._initialCheck = true;
            this.registerListener();
        }

        // update date times for calculation in loops
        if(null === this._lastLoopStartTime) {
            this._lastLoopStartTime = this._loopStartTime;
            return true;
        }

        this._deltaTime = this._loopStartTime - this._lastLoopStartTime;

        this._lastLoopStartTime = this._loopStartTime;

        this._loopEndTime = this.time;

        this._loopDurations.push(this._loopEndTime - this._loopStartTime);
        if(this._loopDurations.length > 100) this._loopDurations.shift();





        //this.pca9685.setPwm(0, 0, 400);
        //sleep.msleep(1000);
        //this.pca9685.setPwm(0, 0, 500);
        //sleep.msleep(1000)

        if(null === this._infoTime || this._infoTime + 2000 < this.time) {
            this._infoTime = this.time;
            //this.logger.info('average loop duration: ' + this.loopAverageDuration + ' ms');
        }

    }

    // current time in ms
    get time() {
        return (process.hrtime()[0] * 1e9 + process.hrtime()[1]) / 1e6;
    }

    // return loop average duration in ms
    get loopAverageDuration() {

        let total = 0;
        for(let i in this._loopDurations) {
            total += this._loopDurations[i];
        }

        return Math.round((total / this._loopDurations.length) * 100) / 100;
    }
}

let main = new Main();