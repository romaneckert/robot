const request = require('request');
const subprocess = require('subprocess');
const spawn = require('child_process').spawn;
const logger = require('./logger');

class MaryTTS {

    constructor() {

        this._running = false;
        this._host = '127.0.0.1';
        this._port = 59125;
        this._command = './vendor/marytts-5.2/bin/marytts-server';

        request('http://' + this._host + ':' + this._port + '/version', function (error, response, body) {

            if(response && 200 === response.statusCode) {
                this._running = true;
            } else {
                this.start();
            }

        }.bind(this));

    }

    get running() {
        return this._running;
    }

    start() {

        logger.info('Start MaryTts Server');

        const child = spawn(this._command, {
            detached: true
        });

        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        child.unref();

    }
}

module.exports = new MaryTTS();