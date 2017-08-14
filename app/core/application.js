const AbstractApplication = require('@jeneric/core/abstract-application');

class Application extends AbstractApplication {
    constructor() {
        super();
    }

    get logger() {
        return this.services.logger;
    }
}

module.exports = Application;