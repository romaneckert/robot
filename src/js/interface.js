var Interface = Interface || {};

Interface.Main = {

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));

        this._socket = io('http://' + window.location.hostname + ':' + window.location.port);

    },

    handleDocumentReady : function() {
        $('body').on('touchmove', this.handleDocumentTouchMove.bind(this));
        $('.btn').on('click', this.handleButtonClick.bind(this));
    },

    handleDocumentTouchMove : function(e) {
        e.preventDefault();
    },

    handleButtonClick : function(e) {
        this._socket.emit('input', {'test' : 'test'})
    }
};

Interface.Main.init();