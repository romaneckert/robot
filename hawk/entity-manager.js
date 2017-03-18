const fs = require('fs');

class EntityManager {
    constructor() {
        this._data = {};
        this._path = 'var/data.json';

        if(!fs.existsSync(this._path)) fs.writeFileSync(this._path, JSON.stringify(this._data));

    }

    persist(object) {

        let tableName = object._tableName;

        fs.readFile(this._path, (error, data) => {
            if(error) console.log(error);
            this._data = JSON.parse(data);

            if(!this._data.hasOwnProperty(tableName)) this._data[tableName] = {};

            console.log(this._data);

            if('number' != typeof object.id) object.id = this._getNewIncrement(tableName);

            this._data[tableName][object.id] = object;

            fs.writeFile(this._path, JSON.stringify(this._data), (error) => {
                if (error) throw Error;
            });
        });

    }

    _getNewIncrement(tableName) {

        let increment = 0;

        for(let id in this._data[tableName]) {

            if(parseInt(id) > increment) increment = parseInt(id);
        }

        return increment + 1;
    }
}

module.exports = new EntityManager();