const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {

        for(let log of event.data.logs) {
            if(log.code !== 8) {
                this.services.logList.add(log);
            }
        }

    }
}

module.exports = LogHandler;
