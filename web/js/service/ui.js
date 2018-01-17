const AbstractService = require('@jeneric/core/web/abstract-service');

class Scene extends AbstractService {

    constructor() {
        super();

        this._camera = null;
        this._scene = null;
        this._renderer = null;
        this._mesh = null;

        this.init();

    }

    get width() {

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if((windowWidth / 4) * 3 <= windowHeight) {
            return windowWidth;
        }

        return (windowHeight / 3) * 4;
    }

    get height() {
        return (this.width / 4) * 3
    }

    init() {

        this._camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10 );
        this._camera.position.z = 2;
        //this._camera.rotation.y = 20 * Math.PI / 180;

        this._scene = new THREE.Scene();

        let segmentCount = 64,
            radius = 1,
            geometry = new THREE.Geometry(),
            material = new THREE.MeshLambertMaterial({ color: 0x000000 ,transparent: true, opacity: 0.5});

        for (let i = 0; i <= segmentCount; i++) {
            let theta = (i / segmentCount) * Math.PI * 1.95;
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
            this.width,
            this.height
        );

        $('#scene').append(this._renderer.domElement);

        this.animate();
    }

    update() {
        this._camera.aspect = this.width / this.height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(this.width, this.height);


        console.log('update scene');
    }

    animate() {

        requestAnimationFrame(this.animate.bind(this));

        this._mesh.rotation.z += 0.03;

        this._renderer.render(this._scene, this._camera);

    }

}

module.exports = Scene;
