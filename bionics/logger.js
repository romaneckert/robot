const fs = require('fs');
const db = require('./db');
const strftime = require('strftime');
const config = require('./config').logger;

class Logger {

    constructor() {
        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);
    }

    info(message, data) {
        this._log(message, data, 'info');
    }

    error(message, data) {
        this._log(message, data, 'error');
    }

    _log(message, data, type) {

        var date = new Date();

        fs.appendFile(
            config.directory + '/' + type + '.log',
            '[' + strftime('%F %T', date) + '] ' + message + '\r\n',
            (error) => {
                if (error) console.log(error);
            }
        );

        db.logs.insert({
            'date' : date.getTime(),
            'type' : type,
            'message' : message
        });
    }

}

module.exports = new Logger();