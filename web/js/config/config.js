module.exports = {
    services: {
        logList: {
            class: require('../service/log-list')
        },
        pages : {
            class: require('../service/pages')
        }
    },
    handler: {
        document: {
            'log-list': {
                scroll: {
                    class: require('../handler/document/log-list/scroll')
                }
            },
            site : {
                touchstart: {
                    class: require('../handler/document/site/touchstart')
                },
                touchend: {
                    class: require('../handler/document/site/touchend')
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
            },
            load: {
                class: require('../handler/window/load')
            }
        }
    }
};
