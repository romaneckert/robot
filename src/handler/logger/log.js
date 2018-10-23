class CustomLogHandler {
    constructor() {

    }

    handle(log) {

        super.handle(log);

        if ('object' !== typeof this.server) return false;

        this.server.broadcast({
            handler: 'log',
            data: {
                logs: [
                    log
                ]
            }
        });

    }
}

module.exports = CustomLogHandler;
