#!/usr/bin/env node

class Abstract {

    constructor(kernel) {
        this._kernel = kernel;
    }

    get logger() {
        return this._kernel.logger;
    }

}

class Logger extends Abstract {
    constructor(kernel) {
        super(kernel);
    }
}

class Kernel {
    constructor() {
        this._logger = new Logger(this);
    }

    get logger() {
        return this._logger;
    }
}

let k = new Kernel();

class Main extends Abstract {
    constructor() {

        super();

        console.log('test');

        console.log(this.logger);
    }
}

let m = new Main();