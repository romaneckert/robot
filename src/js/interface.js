var Interface = Interface || {};

Interface.Main = {

    timer : null,

    scene : null,
    camera : null,
    renderer: null,

    objects : [],

    clock : new THREE.Clock(),

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));
    },

    handleDocumentReady : function() {

        this.createScene();

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        this.scene.add(new Interface.Line([[-7,2,0],[-4,0,0],[-4,-2,0],[-5,-3,0]], 0xffffff,1,0.5));
        this.scene.add(new Interface.Line([[-6,1.2,0],[-4.1,-0.05,0],[-4.1,-1,0]], 0xffffff,3,0.6));

        this.scene.add(new Interface.Line([[7,2,0],[4,0,0],[4,-2,0],[5,-3,0]], 0xffffff,1,0.5));
        this.scene.add(new Interface.Line([[6,1.2,0],[4.1,-0.05,0],[4.1,-1,0]], 0xffffff,3,0.6));

        this.scene.add(new Interface.Circle(0.1,128,[0,1,0],0xffffff,1,0.7));
        this.scene.add(new Interface.Circle(0.2,128,[0,1,0],0xffffff,1,0.2));

        this.scene.add(new Interface.Circle(1.3,128,[2,1,0],0xffffff,1,0.7));
        this.scene.add(new Interface.Circle(1.3,128,[-2,1,0],0xffffff,1,0.7));

        this.scene.add(new Interface.Line([[1,-2,0],[3,2,0]], 0xffffff,1,0.5));

        this.render();

        this.update();
    },

    createScene : function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({
            antialias:true,
            alpha:true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    },

    update : function() {
        $.get('/api/data', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    render : function() {

        var delta = this.clock.getDelta();

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

        $('body').append('<div id="loading"><span class="glyphicon glyphicon-repeat spinner"></span></div>');

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