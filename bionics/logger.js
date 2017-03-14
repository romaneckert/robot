const fs = require('fs');
const strftime = require('strftime');
const config = require('./config').logger;

class Logger {

    constructor() {
        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);
    }

    debug(data, meta) {
        var date = new Date();
        this._log(date, data, meta, 'debug');
    }

    info(data, meta) {
        var date = new Date();
        this._log(date, data, meta, 'debug');
        this._log(date, data, meta, 'info');
    }

    error(data, meta) {

        if(data && meta) {
            console.error(String(data), String(meta));
        } else {
            console.error(String(data));
        }

        var date = new Date();
        this._log(date, data, meta, 'debug');
        this._log(date, data, meta, 'error');
    }

    _log(date, data, meta, type) {

        switch(typeof data) {
            case 'string':
                data = data.split("\n");
                break;
            default:
                console.log('logger not defined for type: ' + typeof data);
                break;
        }

        for (var line of data) {
            if(line) {

                var message = '[' + strftime('%F %T', date) + ']';
                message += ' [' + type + ']';
                message += ' ' + line;
                if(meta) message += ' [' + String(meta) + ']';
                message += '\r\n';

                fs.appendFile(
                    config.directory + '/' + type + '.log',
                    message,
                    (error) => {
                        if (error) console.log(error);
                    }
                );
            }
        }

    }

}

module.exports = new Logger();