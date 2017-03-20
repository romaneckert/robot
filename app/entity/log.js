const Entity = require('jeneric/entity/entity');

class Log extends Entity {

    constructor(message = '', type = '') {

        super();

        this._date = new Date();
        this._message = message;
        this._type = type;

    }

    get date() {
        return this._date;
    }

    get message() {
        return this._message;
    }

    get type() {
        return this._type;
    }
}

module.exports = Log;