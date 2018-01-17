const AbstractService = require('@jeneric/core/web/abstract-service');

class Scene extends AbstractService {

    constructor() {
        super();

        this._$list = $('.log-list');

    }

    add(log) {

        let $entryMarkup = $('<div>' + log.title + '</div>');

        this._$list.append($entryMarkup);
        console.log(entry);
    }

}

module.exports = Scene;
