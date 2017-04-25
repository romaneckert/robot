#!/usr/bin/env node

const Abstract = require('./abstract');

class Main extends Abstract {
    constructor() {

        super();

        console.log('test');

        console.log(this.logger);
    }
}

let m = new Main();