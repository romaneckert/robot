const AbstractApplication = require('@jeneric/core/abstract-application');

class Application extends AbstractApplication {
    constructor() {
        super();
    }

    get marytts() {
        return this.services.marytts;
    }

    get speaker() {
        return this.services.speaker;
    }

    get server() {
        return this.services.server;
    }
}

module.exports = Application;