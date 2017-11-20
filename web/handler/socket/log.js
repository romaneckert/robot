const AbstractHandler = require('@jeneric/web/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.logger.debug(event);
    }
}

module.exports = LogHandler;
