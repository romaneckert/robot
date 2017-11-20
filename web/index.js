const AbstractApplication = require('@jeneric/web/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);
    }

    start() {
        this.logger.info('application started');

        this._socket = io(window.location.href);

        this._socket.on('event', function(event) {
            console.log(event.data.logs[0]);
        });

        this._socket.emit('event', {
            handler : 'log'
        });

        this.initScene();
    }

    initScene() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
    }
}

let main = new Main(config);
