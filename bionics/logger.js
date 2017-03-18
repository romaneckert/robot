const fs = require('fs');
const strftime = require('strftime');
const config = require('./config').logger;

class Logger {

    constructor() {
        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);
    }

    debug(data, meta) {
        let date = new Date();
        this._log(date, data, meta, ['debug']);
    }

    info(data, meta) {
        let date = new Date();
        this._log(date, data, meta, ['debug', 'info']);
    }

    error(data, meta) {
        let date = new Date();
        this._log(date, data, meta, ['debug', 'error']);
    }

    _log(date, data, meta, types) {

        switch(typeof data) {
            case 'string':
                data = data.split("\n");
                break;
            default:
                throw new Error('logger not defined for type: ' + typeof data + ' message: ' + String(data));
                break;
        }

        for(let type of types) {

            for (let line of data) {
                if(line) {

                    let message = '[' + strftime('%F %T', date) + ']';
                    message += ' [' + type + ']';
                    message += ' [' + new Error().stack.split("at ")[3].match(/\w+\.js:\d+:\d+/g)[0] + ']';
                    message += ' ' + line;
                    if(meta) message += ' [' + String(meta) + ']';
                    message += '\r\n';

                    if(types.indexOf('error') > -1) {
                        fs.appendFileSync(
                            config.directory + '/' + type + '.log',
                            message
                        )
                    } else {
                        fs.appendFile(
                            config.directory + '/' + type + '.log',
                            message,
                            (error) => { if (error) throw error; }
                        );
                    }
                }
            }
        }

    }

}

module.exports = new Logger();