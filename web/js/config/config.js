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
            },
            page: {
                'swipe-left': {
                    class: require('../handler/document/page/swipe-left')
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
