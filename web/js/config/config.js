module.exports = {
    services: {
        logList: {
            class: require('../service/log-list')
        }
    },
    handler: {
        document: {
            'log-list': {
                scroll: {
                    class: require('../handler/document/log-list/scroll')
                }
            }
        },
        socket: {
            log: {
                class: require('../handler/socket/log')
            }
        },
        window: {
            resize: {
                class: require('../handler/window/resize')
            }
        }
    }
};
