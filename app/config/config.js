module.exports = {
    services : {
        data : {
            config : {
                db : {
                    host : '127.0.0.1',
                    database : 'robot'
                }
            }
        }
    },
    handler : {
        log : {
            class : require('../handler/log')
        }
    },
};