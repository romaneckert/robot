var Interface = Interface || {};

Interface.Main = {

    config : null,
    timer : null,

    debug: false,

    scene : null,
    camera : null,
    renderer: null,

    objects : {},

    clock : new THREE.Clock(),

    init : function() {

        this.config = new Interface.Config();

        console.log(this.config);

        $(window).on('load',this.handleWindowLoad.bind(this));
    },

    handleWindowLoad : function() {

        this.createScene();

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        // create left eye
        this.objects.leftEye = new THREE.Object3D();
        this.objects.leftEye.add(new Interface.Line([[0.5,0,0],[1.5,0,0]],this.config.cMain,1,0.5));
        this.objects.leftEye.add(new Interface.Line([[-0.5,0,0],[-1.5,0,0]],this.config.cMain,1,0.5));
        this.objects.leftEye.add(new Interface.Circle(1.3,128,[0,0,0],this.config.cMain,1,0.7));
        this.objects.leftEye.add(new Interface.Circle(1.2,128,[0,0,0],this.config.cMain,6,0.05));
        this.objects.leftEye.add(new Interface.Circle(0.26,128,[0,0,0],this.config.cMain,1,0.2,45 * Math.PI / 180, 90 * Math.PI / 180));
        this.objects.leftEye.add(new Interface.Circle(0.26,128,[0,0,0],this.config.cMain,1,0.2,-135 * Math.PI / 180, 90 * Math.PI / 180));
        this.objects.leftEye.position.x = -2;
        this.objects.leftEye.position.y = 1;
        this.scene.add(this.objects.leftEye);

        // create right eye
        this.objects.rightEye = new THREE.Object3D();
        this.objects.rightEye.add(new Interface.Circle(1.3,128,[0,0,0],this.config.cMain,1,0.7));
        this.objects.rightEye.add(new Interface.Circle(1.2,128,[0,0,0],this.config.cMain,6,0.05));
        this.objects.rightEye.position.x = 2;
        this.objects.rightEye.position.y = 1;
        this.scene.add(this.objects.rightEye);

        this.scene.add(new Interface.Line([[-7,2,0],[-4,0,0],[-4,-2,0],[-4.5,-2.5,0]], this.config.cMain,1,0.5));
        this.scene.add(new Interface.Line([[7,2,0],[4,0,0],[4,-2,0],[4.5,-2.5,0]], this.config.cMain,1,0.5));

        this.scene.add(new Interface.Line([[-6,1.2,0],[-4.1,-0.05,0],[-4.1,-1,0]], this.config.cMain,3,0.6));
        this.scene.add(new Interface.Line([[6,1.2,0],[4.1,-0.05,0],[4.1,-1,0]], this.config.cMain,3,0.6));

        this.scene.add(new Interface.Circle(0.1,128,[0,1,0],this.config.cMain,1,0.7));
        this.scene.add(new Interface.Circle(0.2,128,[0,1,0],this.config.cMain,1,0.2));

        this.scene.add(new Interface.Circle(384,128,[0,0,0],this.config.cMain,1,0.7));

        this.scene.add(new Interface.Line([[-0.3,-2,0],[-1,-2,0],[-1.3,-2.3,0],[-1.3,-4,0],[-1,-4.3,0],[-1,-5,0]], this.config.cMain,1,0.5));
        this.scene.add(new Interface.Line([[0.3,-2,0],[1,-2,0],[1.3,-2.3,0],[1.3,-4,0],[1,-4.3,0],[1,-5,0]], this.config.cMain,1,0.5));

        // We will use 2D canvas element to render our HUD.
        var hudCanvas = document.createElement('canvas');

        // Again, set dimensions to fit the screen.
        hudCanvas.width = 512;
        hudCanvas.height = 256;

        // Get 2D context and draw something supercool.
        var hudBitmap = hudCanvas.getContext('2d');
        hudBitmap.font = '1000px "Roboto"';
        hudBitmap.textAlign = 'center';
        hudBitmap.fillStyle = "rgba(255,255,255,0.9)";
        hudBitmap.fillText('10', 256, 128);

        // Create texture from rendered graphics.
        var hudTexture = new THREE.Texture(hudCanvas)
        hudTexture.needsUpdate = true;

        // Create HUD material.
        var material = new THREE.MeshBasicMaterial( {map: hudTexture} );
        material.transparent = true;

        // Create plane to render the HUD. This plane fill the whole screen.
        var planeGeometry = new THREE.PlaneGeometry(1000,500);
        var plane = new THREE.Mesh(planeGeometry,material);
        plane.position.x = 0;
        plane.position.y = 0;
        this.scene.add(plane);

        this.render();

        this.update();
    },

    createScene : function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 0.1, 1000);
        this.camera.position.z = 1000;
        this.renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        if(this.debug) {
            var helper = new THREE.GridHelper(10, 20, 0x000000, 0x000000 );
            helper.position.y = 0;
            helper.rotateX(90 * Math.PI / 180);
            this.scene.add(helper);
        }
    },

    update : function() {
        $.get('/api/data', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    render : function() {

        var delta = this.clock.getDelta();

        this.objects.leftEye.rotateZ(delta * 100 * Math.PI / 180);

        window.requestAnimationFrame(this.render.bind(this));

        this.renderer.render(this.scene, this.camera);
    },

    handleUpdateSuccess : function(data) {

        $('#header-nav .navbar-brand span').removeClass('flashing');

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

        $('#header-nav .navbar-brand span').addClass('flashing');

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