const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class TouchendHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.services.pages.touchend();
    }
}

module.exports = TouchendHandler;
