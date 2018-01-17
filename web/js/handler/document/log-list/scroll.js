const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class ScrollHandler extends AbstractHandler {

    handle(event) {
        this.services.logList.checkAutoScroll();
    }
}

module.exports = ScrollHandler;
