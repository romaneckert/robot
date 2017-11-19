const AbstractHandler = require('@jeneric/app/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.repositories.log.find({}, function(logs) {
            this.server.send(event.socketId, {
                handler : 'log',
                data : {
                    logs : logs
                }
            });
        }.bind(this));
    }
}

module.exports = LogHandler;
