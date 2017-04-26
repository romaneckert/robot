const fs = require('node-fs');
const path = require('path');

class Config {

    constructor() {

        this.file = 'config/config.json';

        this.path = {
            root : path.dirname(require.main.filename) + '/'
        };

        this.path.public = this.path.root + 'public/';
        this.path.app = this.path.root + 'app/';

        if(fs.existsSync(this.path.app + this.file)) {
            let jsonConfig = JSON.parse(fs.readFileSync(this.path.app + this.file, 'utf8'));

            for(let entry in jsonConfig) {
                this[entry] = jsonConfig[entry];
            }
        }

    }

    merge(config) {
        let scope = new Error().stack.split("at ")[3].match(/\w+\.js/g)[0].replace('.js', '');

        if(!this.hasOwnProperty(scope)) return config;

        for(let key in config) {
            if(this[scope].hasOwnProperty(key)) {
                config[key] = this[scope][key];
            }
        }

        return config;
    }
}

module.exports = new Config();