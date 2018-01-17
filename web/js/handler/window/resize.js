const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class ResizeHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.services.ui.update();
    }
}

module.exports = ResizeHandler;
