const AbstractComponent = require('jeneric/core/application');
const Emitter = require('events');

/** brain service */
class Brain extends AbstractComponent {

    constructor() {
        super();

        this._emitter = new Emitter();

    }

    on(event, callback) {
        this._emitter.on(event, callback);
    }

    emit(event, data) {
        this._emitter.emit(event, data);
    }

}

module.exports = Brain;