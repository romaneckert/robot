const AbstractService = require('@jeneric/core/web/abstract-service');

class LogList extends AbstractService {

    constructor() {
        super();

        this._$list = $('#log-list');
        this._autoScroll = true;

    }

    get scrollHeight() {
        return this._$list[0].scrollHeight;
    }

    get scrollTop() {
        return this._$list.scrollTop();
    }

    get height() {
        return this._$list.outerHeight();
    }

    add(log) {

        let $entryElement = this.services.template.getTemplate('log-list-entry', log);

        this._$list.append($entryElement);

        if(this._autoScroll) {
            this._$list.scrollTop(this.scrollHeight)
        }

    }

    checkAutoScroll() {

        if(Math.floor(this.scrollHeight - this.height) > this.scrollTop) {
            this._autoScroll = false;
        } else {
            this._autoScroll = true;
        }
    }

}

module.exports = LogList;
