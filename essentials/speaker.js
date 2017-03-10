const spawn = require('child_process').spawn;
const marytts = require('./marytts');

class Speaker {

    constructor() {

        console.log(marytts.version);

        this._config = {
            'directory' : 'sounds'
        };
    }

    get config() {
        return this._config;
    }

    set config(config) {
        this._config = config;
    }

    say(message) {
        console.log(message);
    }
}

module.exports = new Speaker();