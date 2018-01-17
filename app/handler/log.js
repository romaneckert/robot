const AbstractHandler = require('@jeneric/core/app/abstract-handler');

class LogHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {

        console.log(event);

        this.data.log.find({}, function(logs) {
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
