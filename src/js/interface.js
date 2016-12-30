var Interface = Interface || {};

Interface.Main = {

    websocket : null,

    init : function() {
        $(document).ready(this.handleDocumentReady.bind(this));

        this.websocket = new WebSocket('ws://' + window.location.host + ':4000');
        this.websocket.onmessage = this.handleWebSocketMessage.bind(this);

    },

    handleWebSocketMessage : function(e) {
        console.log(e.data);
    },

    handleDocumentReady : function() {
        $(document).on('touchmove', this.handleDocumentTouchMove.bind(this));
    },

    handleDocumentTouchMove : function(e) {
        e.preventDefault();
    }
};

Interface.Main.init();