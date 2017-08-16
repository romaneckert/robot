module.exports = {
    services: {
        logger : {
            module : require('@jeneric/logger')
        },
        marytts : {
            module : require('@jeneric/marytts'),
            config : {
                bin : 'vendor/marytts-5.2/bin/marytts-server'
            }
        },
        speaker : {
            module : require('../service/speaker')
        },
        server : {
            module : require('@jeneric/server')
        }
    }
};