const JenericApplication = require('jeneric/core/application');

class Application extends JenericApplication {
    constructor() {
        super();
    }

    get logger() {
        return this.modules.logger;
    }

    get brain() {
        return this.modules.brain;
    }
}

module.exports = Application;