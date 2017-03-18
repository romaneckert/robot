const Entity = require('../../hawk/entity');

class Log extends Entity {

    constructor(message, type) {
        super();

        this._date = new Date();
        this._message = message;
        this._type = type;
    }
}

module.exports = Log;