const fs = require('fs');
const path = require('path');

const Logger = require('../service/logger');
const Speaker = require('../service/speaker');
const MaryTTS = require('../service/marytts');

class Kernel {

    constructor() {

        this._config = {
            path : {
                root : path.dirname(require.main.filename) + '/',
                app : path.dirname(require.main.filename) + '/app/',
                public : path.dirname(require.main.filename) + '/public/',
                config : path.dirname(require.main.filename) + '/app/config/config.json',
                logs : path.dirname(require.main.filename) + '/var/logs/',
            }
        };

        if(fs.existsSync(this._config.path.config)) {
            let jsonConfig = JSON.parse(fs.readFileSync(this._config.path.config, 'utf8'));

            for(let entry in jsonConfig) {
                this._config[entry] = jsonConfig[entry];
            }
        }

        this._logger = new Logger(this._config.path.logs);

    }

    get config() {
        return this._config;
    }

    get logger() {
        return this._logger;
    }

    get speaker() {
        return this._speaker;
    }

    get marytts() {
        return this._marytts;
    }

}

module.exports = Kernel;