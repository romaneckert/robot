module.exports = {
    services : {
        scene : {
            class : require('../service/scene')
        },
    },
    handler: {
        window : {
            deviceorientation : {
                class : require('../handler/window/deviceorientation')
            }
        }
    }
};
