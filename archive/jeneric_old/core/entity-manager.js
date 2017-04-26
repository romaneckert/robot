const fs = require('fs');

class EntityManager {
    constructor() {
        this._data = {};
        this._path = 'var/data.json';

        if(!fs.existsSync(this._path)) fs.writeFileSync(this._path, JSON.stringify(this._data));

    }

    persist(object) {

        let tableName = object._getTableName();
        let cleanedObject = {};

        for(let key in object) {
            if('id' != key.substring(1)) {
                cleanedObject[key.substring(1)] = object[key];
            }
        }

        fs.readFile(this._path, (error, data) => {
            if(error) console.log(error);
            this._data = JSON.parse(data);

            if(!this._data.hasOwnProperty(tableName)) this._data[tableName] = {};

            if('number' != typeof object.id) object.id = this._getNewIncrementByObject(tableName);

            this._data[tableName][object.id] = cleanedObject;

            console.log(this._data);

            fs.writeFile(this._path, JSON.stringify(this._data), (error) => {
                if (error) throw Error;
            });
        });

    }

    remove(object) {

    }

    flush() {

    }

    _getNewIncrementByObject(object) {

        let increment = 0;

        for(let id in this._data[object._getTableName()]) {

            if(parseInt(id) > increment) increment = parseInt(id);
        }

        return increment + 1;
    }

}

module.exports = new EntityManager();