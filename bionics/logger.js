var fs = require('fs');

class Logger {

    constructor() {
        this._config = {
            'directory' : 'logs'
        };
    }

    get config() {
        return this._config;
    }

    set config(config) {
        this._config = config;
    }

    info(message, data) {
        this._log(message, data, 'info');
    }

    error(message, data) {
        this._log(message, data, 'error');
    }

    _log(message, data, type) {
        fs.appendFile(this.config.directory + '/' + type + '.log', message);
    }



}

module.exports = new Logger();