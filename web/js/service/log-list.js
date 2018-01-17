const AbstractService = require('@jeneric/core/web/abstract-service');

class Scene extends AbstractService {

    constructor() {
        super();

        this._$list = $('#log-list');

    }

    add(log) {

        console.log(log);

        let $entryMarkup = $('<div class="log-list-entry">' + log.message + '</div>');

        this._$list.append($entryMarkup);
    }

}

module.exports = Scene;
