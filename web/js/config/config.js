module.exports = {
    services : {
        logList : {
            class : require('../service/log-list')
        }
    },
    handler: {
        window : {
            deviceorientation : {
                class : require('../handler/window/deviceorientation')
            },
            resize : {
                class : require('../handler/window/resize')
            }
        },
        socket : {
            log : {
                class : require('../handler/socket/log')
            }
        }
    }
};
