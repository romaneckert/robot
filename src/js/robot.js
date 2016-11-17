var Interface = {

    timer : null,

    scene : null,
    camera : null,
    renderer: null,
    cube: null,

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));
    },

    handleDocumentReady : function() {

        $('body').on('click', 'a', this.handleButtonClick.bind(this));

        this.update();
    },

    update : function() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        $.get('/api/data', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    render : function() {
        requestAnimationFrame(this.render);
        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

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