const JenericApplication = require('jeneric/core/application');

class Application extends JenericApplication {
    constructor() {
        super();
    }

    get logger() {
        return this.modules.logger;
    }

    get speaker() {
        return this.modules.speaker;
    }

    get marytts() {
        return this.modules.marytts;
    }

    get server() {
        return this.modules.server;
    }

    get pca9685() {
        return this.modules.pca9685;
    }

    persist(object) {
        return this.modules.entityManager.persist(object);
    }

    flush() {
        return this.modules.entityManager.flush();
    }
}

module.exports = Application;