module.exports = {
    services: {
        data: {
            config: {
                db: {
                    host: '127.0.0.1',
                    database: 'robot'
                }
            }
        },
        marytts: {
            class: require('@jeneric/core/app/service/marytts'),
            config: {
                bin: '../vendor/marytts-5.2/bin/marytts-server'
            }
        },
        server: {
            config: {
                port: 3030
            }
        },
        speaker: {
            class: require('../service/speaker')
        }
    },
    handler: {
        server: {
            io: {
                connection: {
                    class: require('../handler/server/io/connection')
                }
            }
        }
    },
};
