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

        $('.header-nav .navbar-brand span').attr('class', 'glyphicon glyphicon-flash');

        setTimeout(this.update.bind(this), 200);

    },

    handleUpdateFail : function(data) {

        $('.header-nav .navbar-brand span').attr('class', 'glyphicon glyphicon-repeat');

        console.log(data);

        setTimeout(this.update.bind(this), 200);

    }

};

Robot.init();