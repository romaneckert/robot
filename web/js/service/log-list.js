const AbstractService = require('@jeneric/core/web/abstract-service');

class LogList extends AbstractService {

    constructor() {
        super();

        this._$list = $('#log-list');
        this._autoScroll = true;
        this._logHistory = [];

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

        let sameLog = true;

        for(let logInHistory of this._logHistory) {

            if(log.code !== logInHistory.code) sameLog = false;
            if(log.date !== logInHistory.date) sameLog = false;
            if(log.message !== logInHistory.message) sameLog = false;
            if(log.module !== logInHistory.module) sameLog = false;

        }

        if(sameLog && this._logHistory.length > 0) return false;

        this._logHistory.push(log);

        this._$list.find('*').remove();

        for(let logEntry in this._logHistory) {
            let $entryElement = this.services.template.getTemplate('log-list-entry', logEntry);
            this._$list.append($entryElement);
        }

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
