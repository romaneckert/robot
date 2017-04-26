const fs = require('fs');
const strftime = require('strftime');
const Service = require('../core/service');

class Logger extends Service {

    constructor(directory) {

        this._directory = directory;

        if(!fs.existsSync(this._directory)) fs.mkdirSync(this._directory);

        if(!fs.existsSync(this._directory + 'debug.log')) fs.writeFileSync(this._directory + 'debug.log', '');
        if(!fs.existsSync(this._directory + 'info.log')) fs.writeFileSync(this._directory + 'info.log', '');
        if(!fs.existsSync(this._directory + 'error.log')) fs.writeFileSync(this._directory + 'error.log', '');

    }

    debug(data, meta) {
        this._log(data, meta, 'debug');
    }

    info(data, meta) {
        this._log(data, meta, 'info');
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
            case 'object':
                data = String(data);
                break;
            default:
                throw new Error('logger not defined for type "' + typeof data + '" and message "' + String(data) + '"');
                break;
        }

        for (let line of data) {
            if(line) {

                let message = '[' + strftime('%F %T', date) + ']';
                message += ' [' + type + ']';
                message += ' ' + line;
                if(meta) message += ' [' + String(meta) + ']';
                message += ' [' + new Error().stack.split("at ")[3].match(/\w+\.js:\d+:\d+/g)[0] + ']';
                message += '\n';

                switch(type) {
                    case 'debug':
                        fs.appendFile(
                            this._directory + 'debug.log',
                            message,
                            (error) => { if (error) throw error; }
                        );
                        break;
                    case 'info':
                        fs.appendFile(
                            this._directory + 'debug.log',
                            message,
                            (error) => { if (error) throw error; }
                        );

                        fs.appendFile(
                            this._directory + 'info.log',
                            message,
                            (error) => { if (error) throw error; }
                        );

                        break;
                    case 'error':
                        fs.appendFileSync(
                            this._directory + 'debug.log',
                            message
                        );

                        fs.appendFileSync(
                            this._directory + 'info.log',
                            message
                        );

                        fs.appendFileSync(
                            this._directory + 'error.log',
                            message
                        );
                        break;
                }
            }
        }
    }
}

module.exports = Logger;