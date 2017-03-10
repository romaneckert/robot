const http = require('http');
const subprocess = require('subprocess');

class MaryTTS {

    constructor() {

        this._running = false;
        this._version = '';
        this._host = 'localhost';
        this._port = 59125;
        this._command = './vendor/marytts-5.2/bin/marytts-server';

        var request = http.request({
            host: this._host,
            port: this._port,
            path: '/version',
            method: 'GET'
        }, (response) => {

            var data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                this._version = data;
                this._running = true;
            });

        });

        request.on('error', (e) => {
            console.log('MaryTTS Server not running');

            this._running = false;
            this.start();
        });

        request.end();

    }

    get running() {
        return this._running;
    }

    start() {

        console.log('Start MaryTTS Server');

        var processes = {
            marytts: {
                command : this._command,
                commandArgs : []
            }
        };

        this._process = subprocess(processes, function() {
            console.log('started');
        });

        console.log(this.process);
    }
}

module.exports = new MaryTTS();