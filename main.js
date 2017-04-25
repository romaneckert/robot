#!/usr/bin/env node

const Exception = require('jeneric/core/exception');
const Application = require('jeneric/core/application');

class Main extends Application {

    constructor() {

        super();

        console.log(this.logger);

        //throw new Exception({'test' : 'test'});

        //setInterval(this.update.bind(this), 200);
    }

    update() {

        //if(!this.systemCheck()) return false;

    }

    systemCheck() {

        if(!this.marytts.running) {
            this.marytts.start();
            return false;
        }

    }

}

let main = new Main();