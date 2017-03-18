class Entity {
    constructor() {
        this._id = null;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get _tableName() {
        return this.constructor.name.toLowerCase() + 's';
    }
}

module.exports = Entity;