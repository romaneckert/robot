const AbstractApplication = require('@jeneric/core/abstract-application');

class Application extends AbstractApplication {
    constructor() {
        super();
    }

    debug(message, meta) {
        return this.services.logger.debug(message, meta);
    }

    info(message, meta) {
        return this.services.logger.info(message, meta);
    }

    error(message, meta) {
        return this.services.logger.error(message, meta);
    }
}

module.exports = Application;