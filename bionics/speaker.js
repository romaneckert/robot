const marytts = require('./marytts');

class Speaker {

    constructor() {

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