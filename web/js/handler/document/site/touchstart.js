const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class TouchstartHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.services.pages.touchstart();
    }
}

module.exports = TouchstartHandler;
