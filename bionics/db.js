const logger = require('./logger');
const fdb = require('file-db');
const config = require('./config').db;

class Table {
    constructor(title) {
        this._title = title;
    }

    insert(data) {
        fdb.open(config.directory, (error, db) => {
            if(error) logger.error(error);

            db.use(this._title).save(data).exec((error, documents) => {
                if(error) logger.error(error);
            });
        });
    }
}

class DB {

    constructor() {
        this.logs = new Table('logs');
    }

}

module.exports = new DB();