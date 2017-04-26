const Abstract = require('./abstract');

class Exception extends Abstract {
    constructor(error) {

        super();

        error = String(error);
        this.logger.error(error);
        throw new Error(error)

    }
}

module.exports = Exception;