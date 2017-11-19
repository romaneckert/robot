module.exports = {
    services : {
        data : {
            config : {
                db : {
                    host : '127.0.0.1',
                    database : 'robot'
                }
            }
        },
        marytts : {
            class : require('@jeneric/marytts/service/marytts')
        },
        server : {
            config : {
                port : 3030
            }
        }
    },
    handler : {
        log : {
            class : require('../handler/log')
        }
    },
};
