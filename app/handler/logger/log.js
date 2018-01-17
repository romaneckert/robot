const LogHandler = require('@jeneric/core/app/handler/logger/log');

class CustomLogHandler extends LogHandler {
    constructor() {
        super();
    }

    handle(log) {

        super.handle(log);

        if('object' !== typeof this.server) return false;

        this.server.broadcast({
            handler : 'log',
            data : {
                logs : [
                    log
                ]
            }
        });

    }
}

module.exports = CustomLogHandler;
