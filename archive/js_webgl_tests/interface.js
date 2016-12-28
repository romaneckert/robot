var Interface = Interface || {};

Interface.Main = {

    config : null,
    timer : null,

    width: null,
    height: null,

    debug: false,

    scene : null,
    camera : null,
    renderer: null,

    objects : {},

    clock : null,
    delta : null,

    init : function() {
        $(window).on('load',this.handleWindowLoad.bind(this));
        $(window).on('resize',this.handleWindowResize.bind(this));
    },

    handleWindowLoad : function() {

        this.config = new Interface.Config();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.updateScene();

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        // create left eye
        /*
        this.objects.leftEye = new THREE.Object3D();
        this.objects.leftEye.add(new Interface.Line([[0.5,0,0],[1.5,0,0]],this.config.colors.main,1,0.5));
        this.objects.leftEye.add(new Interface.Line([[-0.5,0,0],[-1.5,0,0]],this.config.colors.main,1,0.5));
        this.objects.leftEye.add(new Interface.Circle(1.3,128,[0,0,0],this.config.colors.main,1,0.7));
        this.objects.leftEye.add(new Interface.Circle(1.2,128,[0,0,0],this.config.colors.main,6,0.05));
        this.objects.leftEye.add(new Interface.Circle(0.26,128,[0,0,0],this.config.colors.main,1,0.2,45 * Math.PI / 180, 90 * Math.PI / 180));
        this.objects.leftEye.add(new Interface.Circle(0.26,128,[0,0,0],this.config.colors.main,1,0.2,-135 * Math.PI / 180, 90 * Math.PI / 180));
        this.objects.leftEye.position.x = -2;
        this.objects.leftEye.position.y = 1;
        this.scene.add(this.objects.leftEye);
        */

        // create right eye
        /*
        this.objects.rightEye = new THREE.Object3D();
        this.objects.rightEye.add(new Interface.Circle(1.3,128,[0,0,0],this.config.colors.main,1,0.7));
        this.objects.rightEye.add(new Interface.Circle(1.2,128,[0,0,0],this.config.colors.main,6,0.05));
        this.objects.rightEye.position.x = 2;
        this.objects.rightEye.position.y = 1;
        this.scene.add(this.objects.rightEye);
        */

        //this.scene.add(new Interface.Line([[0,0,0],[100,0,0],[100,100,0]], this.config.colors.main,1,0.5));

        this.scene.add(new Interface.Circle(100,256,[0,160,0],this.config.colors.main,4,0.7));
        this.scene.add(new Interface.Circle(60,256,[0,160,-100],this.config.colors.main,2,0.4));
        this.scene.add(new Interface.Circle(60,256,[0,160,100],this.config.colors.main,2,0.4));

        this.scene.add(new Interface.Circle(100,256,[0,-160,0],this.config.colors.main,4,0.7));
        this.scene.add(new Interface.Circle(60,256,[0,-160,-100],this.config.colors.main,2,0.4));
        this.scene.add(new Interface.Circle(60,256,[0,-160,100],this.config.colors.main,2,0.4));

        this.scene.add(new Interface.Circle(100,256,[-220,0,0],this.config.colors.main,4,0.7));
        this.scene.add(new Interface.Circle(60,256,[-220,0,-100],this.config.colors.main,2,0.4));
        this.scene.add(new Interface.Circle(60,256,[-220,0,100],this.config.colors.main,2,0.4));


        this.scene.add(new Interface.Circle(100,256,[220,0,0],this.config.colors.main,4,0.7));
        this.scene.add(new Interface.Circle(60,256,[220,0,-100],this.config.colors.main,2,0.4));
        this.scene.add(new Interface.Circle(60,256,[220,0,100],this.config.colors.main,2,0.4));


        this.scene.add(new Interface.Circle(20,256,[0,0,0],this.config.colors.main,4,0.7));
        this.scene.add(new Interface.Circle(384,256,[0,0,0],this.config.colors.main,4,0.7));

        // We will use 2D canvas element to render our HUD.
        var hudCanvas = document.createElement('canvas');

        // Again, set dimensions to fit the screen.
        hudCanvas.width = 1024;
        hudCanvas.height = 512;

        // Get 2D context and draw something supercool.
        var hudBitmap = hudCanvas.getContext('2d');
        hudBitmap.font = '100px "Roboto"';
        hudBitmap.textAlign = 'center';
        hudBitmap.fillStyle = "rgba(255,255,255,0.9)";
        hudBitmap.fillText('10', 256, 128);

        // Create texture from rendered graphics.
        var hudTexture = new THREE.Texture(hudCanvas)
        hudTexture.needsUpdate = true;

        // Create HUD material.
        var material = new THREE.MeshBasicMaterial({map:hudTexture});
        material.transparent = true;

        // Create plane to render the HUD. This plane fill the whole screen.
        var planeGeometry = new THREE.PlaneGeometry(128,64);
        var plane = new THREE.Mesh(planeGeometry,material);
        plane.position.x = 0;
        plane.position.y = 0;
        //this.scene.add(plane);

        this.render();

        this.update();
    },

    handleWindowResize : function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.updateScene();
    },

    updateScene : function () {

        if(!this.scene) this.scene = new THREE.Scene();


        if(!this.camera) {
            this.cameraObject = new THREE.Object3D();
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000);
            this.cameraObject.add(this.camera);
        }

        this.camera.aspect = this.width / this.height;
        this.camera.position.z = 1024;
        this.camera.updateProjectionMatrix();

        this.scene.add(this.cameraObject);

        /*
        if(!this.camera) {
            this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, -1000, 1000);
        }
        this.camera.left = this.width / -2;
        this.camera.right = this.width / 2;
        this.camera.top = this.height / 2;
        this.camera.bottom = this.height / -2;
        this.camera.position.z = 5;
        this.camera.updateProjectionMatrix();
        */

        //this.camera.position.z = -10;
        //this.camera.rotateY(10 * Math.PI / 180);

        if(!this.renderer) {
            this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
            document.body.appendChild(this.renderer.domElement);
        }
        this.renderer.setSize(this.width, this.height);
    },

    update : function() {
        $.get('/api/data', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    render : function() {

        if(!this.clock) this.clock = new THREE.Clock();
        this.delta = this.clock.getDelta();

        window.requestAnimationFrame(this.render.bind(this));

        this.cameraObject.rotateY(this.delta * -10 * Math.PI / 180);

        this.renderer.render(this.scene, this.camera);
    },

    handleUpdateSuccess : function(data) {

        $('[data-model]').each(function(i, elem) {
            var model = $(elem).data('model');
            var attribute = $(elem).data('attribute');
            if(data[model] && data[model][attribute]) {
                $(elem).text(data[model][attribute]);
            }
        });

        setTimeout(this.update.bind(this), 200);

    },

    handleUpdateFail : function(data) {
        setTimeout(this.update.bind(this), 200);
    },

    handleButtonClick : function(e) {
        var $button = $(e.currentTarget);
        var action = $button.data('action');

        if(action) {
            e.preventDefault();

            switch(action) {
                case '':
                default:
                    $.get('/robot/' + action, function(data) {
                        $('#content').html(data);
                        $('#loading').remove();
                    }.bind(this)).fail(function() {
                        $('#content').html('error in action ' + action);
                        $('#loading').remove();
                    });
                    break;
            }
        }
    }

};

Interface.Main.init();