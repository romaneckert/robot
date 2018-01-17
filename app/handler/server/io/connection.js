const ConnectionHandler = require('@jeneric/core/app/handler/server/io/connection');

class CustomConnectionHandler extends ConnectionHandler {
    constructor() {
        super();
    }

    handle(socket) {

        super.handle(socket);

        this.data.log.find({}, function(logs) {

            this.server.broadcast({
                handler : 'log',
                data : {
                    logs : logs
                }
            });

        }.bind(this));

    }
}

module.exports = CustomConnectionHandler;
