var Interface = Interface || {};

Interface.Main = {

    websocket : null,

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));

        this.websocket = new WebSocket('ws://' + window.location.hostname + ':8001');
        this.websocket.onmessage = this.handleWebSocketMessage.bind(this);

    },

    handleWebSocketMessage : function(e) {
        $('.log').html(e.data + '<br/>' + $('.log').html());
        console.log(e.data);
    },

    handleDocumentReady : function() {
        //$(document).on('touchmove', this.handleDocumentTouchMove.bind(this));
        $('.btn').on('click', this.handleButtonClick.bind(this));
    },

    handleDocumentTouchMove : function(e) {
        e.preventDefault();
    },

    handleButtonClick : function(e) {
        this.websocket.send('Taste gedrückt');
    }
};

Interface.Main.init();