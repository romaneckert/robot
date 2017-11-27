module.exports = {
    services : {
        /*
        ui : {
            class : require('../service/ui')
        },*/
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
