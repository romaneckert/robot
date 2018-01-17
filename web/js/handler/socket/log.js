const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.logger.info(event.data);
    }
}

module.exports = LogHandler;
