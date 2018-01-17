const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class ScrollHandler extends AbstractHandler {

    handle(event) {
        console.log('scroll event on log list');
    }
}

module.exports = ScrollHandler;
