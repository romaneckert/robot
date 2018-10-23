const ConnectHandler = require('@jeneric/core/app/handler/server/io/connect');

class CustomConnectHandler extends ConnectHandler {
    constructor() {
        super();
    }

    handle(socket) {

        super.handle(socket);

        /**
        this.data.log.find(
            {},
            {
                limit: 20,
                sort: {
                    $natural : -1
                }
            },
            (logs) => {

                this.server.broadcast({
                    handler : 'log',
                    data : {
                        logs : logs
                    }
                });

            }
        );**/

        this.module.speaker.say('Neues Gerät verbunden.');

        this.server.broadcast({
            handler: 'log',
            data: {
                logs: this.logger.history
            }
        });

    }
}

module.exports = CustomConnectHandler;
