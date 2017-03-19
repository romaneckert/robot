const config = {
    logger : {
        directory : 'var/logs'
    },
    db : {
        directory : 'db'
    },
    speaker : {
        directory : 'var/sounds',
        marytts : {
            host : '127.0.0.1',
            port : 59125,
            path : 'vendor/marytts-5.2/bin/marytts-server'
        }
    }
}

module.exports = config;