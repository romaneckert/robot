const AbstractService = require('@jeneric/web/abstract-service');

class Scene extends AbstractService {

    constructor() {
        super();

        this.logger.debug('start scene service');

    }

}

module.exports = Scene;
