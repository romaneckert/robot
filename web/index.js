const AbstractApplication = require('@jeneric/web/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);

        this._camera = null;
        this._scene = null;
        this._renderer = null;
        this._mesh = null;
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

        this._camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this._camera.position.z = 1;
        //this._camera.rotation.y = 20 * Math.PI / 180;

        this._scene = new THREE.Scene();

        let segmentCount = 64,
            radius = 0.5,
            geometry = new THREE.Geometry(),
            material = new THREE.MeshLambertMaterial({ color: 0x000000 ,transparent: true, opacity: 0.5});

        for (let i = 0; i <= segmentCount; i++) {
            let theta = (i / segmentCount) * Math.PI * 1.9;
            geometry.vertices.push(
                new THREE.Vector3(
                    Math.cos(theta) * radius,
                    Math.sin(theta) * radius,
                    0));
        }


        this._mesh = new THREE.Line(geometry, material);

        this._scene.add(this._mesh);

        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        this._renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        document.body.appendChild(this._renderer.domElement);

        //this.animate();
    }

    animate() {

        requestAnimationFrame(this.animate.bind(this));

        this._mesh.rotation.z += 0.03;

        this._renderer.render(this._scene, this._camera);

    }
}

let main = new Main(config);
