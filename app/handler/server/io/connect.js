const ConnectHandler = require('@jeneric/core/app/handler/server/io/connect');

class CustomConnectHandler extends ConnectHandler {
    constructor() {
        super();
    }

    handle(socket) {

        super.handle(socket);

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
        );

        this.services.speaker.say('Neues Gerät verbunden.');

    }
}

module.exports = CustomConnectHandler;
