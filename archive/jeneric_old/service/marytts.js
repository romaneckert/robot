const spawn = require('child_process').spawn;
const querystring = require('querystring');
const http = require('http');
const config = require('jeneric/core/config');
const slug = require('slug');
const fs = require('fs-extra');
const Service = require('../core/service');

class MaryTTS {

    constructor(directory, host, port, bin) {

        this._config = config.merge({
            directory : 'var/sounds',
            host: '127.0.0.1',
            port: 59125,
            bin: 'vendor/marytts-5.2/bin/marytts-server'
        });

        fs.ensureDirSync(this._config.directory);

        this._running = false;
        this._starting = false;
    }

    get running() {
        return this._running;
    }

    get starting() {
        return this._starting;
    }

    _startServer() {
        logger.info('Start MaryTTS Server');

        let child = spawn('./' + this._config.bin, {
            detached: true
        });

        child.stdout.on('data', (data) => {
            logger.debug(data.toString());
        });

        child.stderr.on('data', (data) => {
            if(data.toString().includes('started in') && data.toString().includes('on port')) this._running = true;
            logger.debug(data.toString());
        });

        child.on('close', (code) => {
            logger.debug('child process exited with code: ' + code);
        });

        child.unref();
    }

    textToSpeech(message, callback) {
        let params = {
            'INPUT_TEXT' : message,
            'INPUT_TYPE': 'TEXT',
            'OUTPUT_TYPE' : 'AUDIO',
            'AUDIO' : 'WAVE_FILE',
            'LOCALE' : 'de',
            'effect_Chorus_selected' : 'on',
            'effect_Chorus_parameters' : 'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'
        };

        let queryString = querystring.stringify(params);
        let url = 'http://' + this._config.host + ':' + this._config.port + '/process?' + queryString;
        let filePath = this._config.directory + '/' + slug(message, {lower: true}) + '.wav';
        let errorMessage = 'can not get message from marytts server for url: ' + url;

        http.get(url, (response) => {

            if(response && 200 === response.statusCode) {

                let file = fs.createWriteStream(filePath);

                file.on('finish', () => {
                    file.close(() => {
                        callback(message, filePath);
                    });
                });

                response.pipe(file);

            } else {
                logger.error(errorMessage);
                throw errorMessage;
            }

        }).on('error', (errorMessage) => {
            logger.error(errorMessage);
            throw errorMessage;
        });

    }

    start() {

        if(this._starting) return false;

        this._starting = true;
        this._running = false;

        http.get('http://' + this._config.host + ':' + this._config.port + '/version', (response) => {

            if(response && 200 == response.statusCode) {
                this._running = true;
                this._starting = false;
            } else {
                this._startServer();
            }

        }).on('error', (error) => {
            this._startServer();
        });

    }
}

module.exports = new MaryTTS();