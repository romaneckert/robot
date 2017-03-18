const logger = require('./logger');

class Exception extends Error {

    constructor(message) {
        logger.error(message);
        super(message);
    }

}

module.exports = Exception;