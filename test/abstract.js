class Abstract {
    constructor() {
        this._kernel = new Kernel();
    }
}

const Kernel = require('./kernel');

module.exports = Abstract;