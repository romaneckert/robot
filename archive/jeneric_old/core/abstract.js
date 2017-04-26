//const Kernel = require('./kernel');

class Abstract {

    constructor() {
        this._kernel = null;
    }

    get kernel() {
        if(null === this._kernel) {
            //this._kernel = new Kernel();
        }
        return this._kernel;
    }

    get logger() {
        return this._kernel.logger;
    }

}

module.exports = Abstract;