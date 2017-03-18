const fs = require('fs');
const strftime = require('strftime');
const config = require('./config').logger;
const Exception = require('./exception');

class Logger {

    constructor() {
        if (!fs.existsSync(config.directory)) fs.mkdirSync(config.directory);
    }

    debug(data, meta) {
        var date = new Date();
        this._log(date, data, meta, ['debug']);
    }

    info(data, meta) {
        var date = new Date();
        this._log(date, data, meta, ['debug', 'info']);
    }

    error(data, meta) {
        var date = new Date();
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

        for(var type of types) {

            for (var line of data) {
                if(line) {

                    var message = '[' + strftime('%F %T', date) + ']';
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