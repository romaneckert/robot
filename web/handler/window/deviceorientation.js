const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class DeviceOrientationHandler extends AbstractHandler {
    constructor() {
        super();
    }

    handle(event) {
        this.logger.debug(event.originalEvent.alpha);
    }
}

module.exports = DeviceOrientationHandler;
