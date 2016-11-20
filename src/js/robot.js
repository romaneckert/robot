var Interface = {

    timer : null,

    scene : null,
    camera : null,
    renderer: null,

    objects : [],
    materials: {
        lines : []
    },



    clock : new THREE.Clock(),

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));
    },

    handleDocumentReady : function() {

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.materials.lines[107] = new THREE.LineBasicMaterial({color: 0xffffff, linewidth:1, opacity: 0.7, transparent:true});

        var geometry = new THREE.Geometry();

        geometry.vertices = [
            new THREE.Vector3(-7,2,0),
            new THREE.Vector3(-4,0,0),
            new THREE.Vector3(-4,-2,0),
            new THREE.Vector3(-5,-3,0)
        ];

        var line = new THREE.Line(geometry,this.materials.lines[107]);
        this.scene.add(line);

        var geometry = new THREE.Geometry();
        geometry.vertices = [
            new THREE.Vector3(7,2,0),
            new THREE.Vector3(4,0,0),
            new THREE.Vector3(4,-2,0),
            new THREE.Vector3(5,-3,0)
        ];

        var line = new THREE.Line(geometry,this.materials.lines[107]);
        this.scene.add(line);

        var radius   = 0.1,
            segments = 128,
            geometry = new THREE.CircleGeometry( radius, segments );

        geometry.vertices.shift();

        this.scene.add( new THREE.Line(geometry,this.materials.lines[107]) );

        this.render();

        this.update();
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

Interface.init();