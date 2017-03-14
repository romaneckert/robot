const config = require('./config').speaker;
const request = require('request');
const logger = require('./logger');
const spawn = require('child_process').spawn;

class Speaker {

    constructor() {
        this._ready = false;

        request('http://' + config.marytts.host + ':' + config.marytts.port + '/version', function (error, response, body) {

            if(response && 200 === response.statusCode) {
                this._ready = true;
            } else {
                this._startMaryTTS();
            }

        }.bind(this));

    }

    get ready() {
        return this._ready;
    }

    _startMaryTTS() {

        logger.info('Start MaryTts Server');

        const child = spawn('./' + config.marytts.path, {
            detached: true
        });

        child.stdout.on('data', (data) => {
            logger.debug(data.toString());
        });

        child.stderr.on('data', (data) => {
            logger.debug(data.toString());
        });

        child.on('close', (code) => {
            logger.debug('child process exited with code: ' + code);
        });

        child.unref();

    }

    say(message) {
        console.log(message);
    }
}

module.exports = new Speaker();