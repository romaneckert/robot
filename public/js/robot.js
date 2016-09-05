var Robot = {

    timer : null,

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));
    },

    handleDocumentReady : function() {
        this.update();
    },

    update : function() {
        $.get('/robot/configuration', this.handleUpdateSuccess.bind(this)).fail(this.handleUpdateFail.bind(this));
    },

    handleUpdateSuccess : function(data) {

        $('#header-nav .navbar-brand span').removeClass('flashing');

        setTimeout(this.update.bind(this), 200);

    },

    handleUpdateFail : function(data) {

        $('#header-nav .navbar-brand span').addClass('flashing');

        console.log(data);

        setTimeout(this.update.bind(this), 200);

    }

};

Robot.init();