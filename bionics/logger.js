const fs = require('node-fs');
const strftime = require('strftime');
const config = require('./config').logger;

class Logger {

    constructor() {
        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);
    }

    debug(data, meta) {
        this._log(data, meta, 'debug');
    }

    info(data, meta) {
        this._log(data, meta, 'info ');
    }

    error(data, meta) {
        this._log(data, meta, 'error');
    }

    _log(data, meta, type) {

        let date = new Date();

        switch(typeof data) {
            case 'string':
                data = data.split("\n");
                break;
            default:
                throw new Error('logger not defined for type: ' + typeof data + ' message: ' + String(data));
                break;
        }

        for (let line of data) {
            if(line) {

                let message = '[' + strftime('%F %T', date) + ']';
                message += ' [' + type + ']';
                message += ' ' + line;
                if(meta) message += ' [' + String(meta) + ']';
                message += ' [' + new Error().stack.split("at ")[3].match(/\w+\.js:\d+:\d+/g)[0] + ']';
                message += '\r\n';

                if('error' == type) {
                    fs.appendFileSync(
                        config.directory + '/log.log',
                        message
                    )
                } else {
                    fs.appendFile(
                        config.directory + '/log.log',
                        message,
                        (error) => { if (error) throw error; }
                    );
                }
            }
        }
    }
}

module.exports = new Logger();