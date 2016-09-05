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

        console.log(data.version);

        setTimeout(this.update.bind(this), 200);

    },

    handleUpdateFail : function(data) {

        console.log(data);

        setTimeout(this.update.bind(this), 200);

    }

};

Robot.init();