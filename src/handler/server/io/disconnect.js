const DisconnectHandler = require('@jeneric/core/app/handler/server/io/disconnect');

class CustomDisconnectHandler extends DisconnectHandler {
    constructor() {
        super();
    }

    handle(socket) {

        super.handle(socket);

        this.module.speaker.say('Gerät abgemeldet.');

    }
}

module.exports = CustomDisconnectHandler;
