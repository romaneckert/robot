const AbstractHandler = require('@jeneric/core/web/abstract-handler');

class SwipeLeftHandler extends AbstractHandler {

    handle(event) {
        console.log('swipe-left');
    }
}

module.exports = SwipeLeftHandler;
