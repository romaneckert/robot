const AbstractApplication = require('@jeneric/core/abstract-application');
const config = require('./config/config.js');

class Main extends AbstractApplication {

    constructor(config) {
        super(config);
    }

    start() {
        this.logger.info('application started');

        //this._socket = null;
        this._socket = io(window.location.href);

        this._socket.on('event', function(event) {
            console.log(event);
        });

        this._socket.emit('event', {
            handler : 'log'
        });

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

        this._socket.emit('data', {'test' : 'test'});
    }
}

let main = new Main(config);
