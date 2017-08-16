(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Abstract = require('./abstract');

var AbstractApplication = function (_Abstract) {
    _inherits(AbstractApplication, _Abstract);

    function AbstractApplication() {
        _classCallCheck(this, AbstractApplication);

        return _possibleConstructorReturn(this, (AbstractApplication.__proto__ || Object.getPrototypeOf(AbstractApplication)).call(this));
    }

    return AbstractApplication;
}(Abstract);

module.exports = AbstractApplication;

},{"./abstract":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = require('./kernel');

/** all classes extends the abstract class.
 * @abstract
 */

var Abstract = function () {
    function Abstract() {
        _classCallCheck(this, Abstract);

        this._instanceId = '_' + Math.random().toString(36).substr(2, 9);
    }

    _createClass(Abstract, [{
        key: 'instanceId',
        get: function get() {
            return this._instanceId;
        }

        /**
         * the application kernel
         * @returns {Kernel}
         */

    }, {
        key: 'kernel',
        get: function get() {
            return require('./kernel');
        }

        /**
         * all registered components
         */

    }, {
        key: 'services',
        get: function get() {
            return this.kernel.services;
        }
    }, {
        key: 'logger',
        get: function get() {
            return this.services.logger;
        }
    }]);

    return Abstract;
}();

module.exports = Abstract;

},{"./kernel":3}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
    function Kernel() {
        _classCallCheck(this, Kernel);

        this._config = {};
        this._services = {};
    }

    _createClass(Kernel, [{
        key: 'init',
        value: function init(config) {

            this._config = config;

            if ('object' !== _typeof(this._config.services)) throw new Error('config have no services configuration');

            for (var key in this._config.services) {

                var service = this._config.services[key];

                if (false === service.active || 0 === service.active) continue;

                this._services[key] = new service.module(service.config);
            }

            if ('undefined' === typeof this._services.logger) {
                this._services.logger = {
                    debug: function debug(message, meta) {
                        console.log(message, meta);
                    },
                    info: function info(message, meta) {
                        console.log(message, meta);
                    },
                    error: function error(message, meta) {
                        console.error(message, meta);
                    }
                };
            }
        }
    }, {
        key: 'config',
        get: function get() {
            return this._config;
        }
    }, {
        key: 'services',
        get: function get() {
            return this._services;
        }
    }]);

    return Kernel;
}();

module.exports = new Kernel();

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractApplication = require('@jeneric/core/abstract-application');

var Application = function (_AbstractApplication) {
    _inherits(Application, _AbstractApplication);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));
    }

    _createClass(Application, [{
        key: 'logger',
        get: function get() {
            return this.services.logger;
        }
    }]);

    return Application;
}(AbstractApplication);

module.exports = Application;

},{"@jeneric/core/abstract-application":1}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = require('./core/application');

var Main = function (_Application) {
    _inherits(Main, _Application);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        _this._socket = io(window.location.href);

        _this.registerEventListener();
        return _this;
    }

    _createClass(Main, [{
        key: 'registerEventListener',
        value: function registerEventListener() {
            $('body').on('touchmove', this.handleDocumentTouchMove.bind(this));
            $('.btn').on('click', this.handleButtonClick.bind(this));
        }
    }, {
        key: 'handleDocumentTouchMove',
        value: function handleDocumentTouchMove(e) {
            e.preventDefault();
        }
    }, {
        key: 'handleButtonClick',
        value: function handleButtonClick(e) {
            e.preventDefault();

            console.log('click');
            console.log(this._socket);

            this._socket.emit('data', { 'test': 'test' });
        }
    }]);

    return Main;
}(Application);

var main = new Main();

},{"./core/application":4}]},{},[5]);
