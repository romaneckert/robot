const config = require('./config').speaker;
const http = require('http');
const logger = require('./logger');
const spawn = require('child_process').spawn;
const fs = require('fs');
const querystring = require('querystring');
const slug = require('slug');
const player = require('play-sound')(opts = {})


class Speaker {

    constructor() {
        this._ready = false;
        this._queue = [];
        this._currentMessage = null;

        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);

        http.get('http://' + config.marytts.host + ':' + config.marytts.port + '/version', function(response) {

            if(response && 200 == response.statusCode) {
                this._ready = true;
            } else {
                this._startMaryTTS();
            }

        }.bind(this)).on('error', (e) => {
            this._startMaryTTS();
        });

    }

    get ready() {
        return this._ready;
    }

    _startMaryTTS() {

        logger.info('Start MaryTTS Server');

        const child = spawn('./' + config.marytts.path, {
            detached: true
        });

        child.stdout.on('data', (data) => {
            logger.debug(data.toString());
        });

        child.stderr.on('data', (data) => {

            if(data.toString().includes('started in') && data.toString().includes('on port')) {
                this._ready = true;
            }

            logger.debug(data.toString());
        });

        child.on('close', (code) => {
            logger.debug('child process exited with code: ' + code);
        });

        child.unref();

    }

    say(message) {

        // queue message if current say process running
        if(null !== this._currentMessage) {
            this._queue.push(message);
            return false;
        }

        this._currentMessage = message;

        var params = {
            'INPUT_TEXT' : message,
            'INPUT_TYPE': 'TEXT',
            'OUTPUT_TYPE' : 'AUDIO',
            'AUDIO' : 'WAVE_FILE',
            'LOCALE' : 'de',
            'effect_Chorus_selected' : 'on',
            'effect_Chorus_parameters' : 'delay1:466;amp1:0.54;delay2:600;amp2:-0.10;delay3:250;amp3:0.30'
        };

        var queryString = querystring.stringify(params);
        var url = 'http://' + config.marytts.host + ':' + config.marytts.port + '/process?' + queryString;
        var filePath = config.directory + '/' + slug(message, {lower: true}) + '.wav';

        http.get(url, function (response) {

            if(response && 200 === response.statusCode) {

                var file = fs.createWriteStream(filePath);

                file.on('finish', () => {
                    file.close(() => {
                        player.play(filePath, (error) => {
                            if (error) {
                                logger.error(error);
                            } else {
                                logger.debug(this._currentMessage);
                                this._currentMessage = null;

                                if(this._queue.length > 0) {
                                    this.say(this._queue.shift());
                                }
                            }
                        })
                    });
                });

                response.pipe(file);

            } else {
                logger.error('can not get message from marytts server for url: ' + url);
            }

        }.bind(this)).on('error', (e) => {
            logger.error('can not get message from marytts server for url: ' + url);
        });

    }
}

module.exports = new Speaker();