const Logger = require('./logger');

class Kernel {
    constructor() {
        //this._logger = new Logger();
    }

    get logger() {
        return this._logger;
    }
}

module.exports = Kernel;