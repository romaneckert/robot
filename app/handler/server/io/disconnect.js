const ConnectHandler = require('@jeneric/core/app/handler/server/io/connect');

class CustomDisconnectHandler extends ConnectHandler {
    constructor() {
        super();
    }

    handle(socket) {

        super.handle(socket);

        this.services.speaker.say('Gerät abgemeldet.');

    }
}

module.exports = CustomDisconnectHandler;
