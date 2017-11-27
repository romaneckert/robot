const AbstractApplication = require('@jeneric/core/web/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);
    }

    start() {
        this.logger.info('application started');
    }
}

let main = new Main(config);
