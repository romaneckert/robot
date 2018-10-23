module.exports = {
    module: {
        mongoose: {
            uri: 'mongodb://127.0.0.1/robot'
        },
        marytts: {
            //class: require('@jeneric/core/app/service/marytts'),
            bin: '../vendor/marytts-5.2/bin/marytts-server'
        },
        server: {
            port: 3030,
            routes: require('./routes')
        }
    },
    /*
    handler: {
        logger: {
            log: {
                class: require('../handler/logger/log')
            }
        },
        server: {
            io: {
                connect: {
                    class: require('../handler/server/io/connect')
                },
                disconnect: {
                    class: require('../handler/server/io/disconnect')
                }
            }
        }
    },*/
};
