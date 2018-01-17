const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {

        for(let log of event.data.logs) {
            this.services.logList.add(log);
        }

    }
}

module.exports = LogHandler;
