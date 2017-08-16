const Application = require('./core/application');

class Main extends Application {

    constructor() {
        super();

        this._socket = io(window.location.href);

        this.registerEventListener();
    }

    registerEventListener() {
        $('body').on('touchmove', this.handleDocumentTouchMove.bind(this));
        $('.btn').on('click', this.handleButtonClick.bind(this));
    }

    handleDocumentTouchMove(e) {
        e.preventDefault();
    }

    handleButtonClick(e) {
        e.preventDefault();

        console.log('click');

        this._socket.emit('data', {'test' : 'test'});
    }
}

let main = new Main();