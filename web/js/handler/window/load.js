const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class LoadHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.services.pages.update();
    }
}

module.exports = LoadHandler;
