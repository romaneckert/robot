(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Abstract = require('./abstract');

var AbstractApplication = function (_Abstract) {
    _inherits(AbstractApplication, _Abstract);

    function AbstractApplication(config) {
        _classCallCheck(this, AbstractApplication);

        var _this = _possibleConstructorReturn(this, (AbstractApplication.__proto__ || Object.getPrototypeOf(AbstractApplication)).call(this));

        _this.kernel.init(config);
        return _this;
    }

    return AbstractApplication;
}(Abstract);

module.exports = AbstractApplication;

},{"./abstract":6}],2:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Abstract = require('./abstract');

var AbstractHandler = function (_Abstract) {
    _inherits(AbstractHandler, _Abstract);

    function AbstractHandler() {
        _classCallCheck(this, AbstractHandler);

        return _possibleConstructorReturn(this, (AbstractHandler.__proto__ || Object.getPrototypeOf(AbstractHandler)).call(this));
    }

    return AbstractHandler;
}(Abstract);

module.exports = AbstractHandler;

},{"./abstract":6}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractModel = function () {
    function AbstractModel(modelName) {
        _classCallCheck(this, AbstractModel);

        this._modelName = modelName;
    }

    _createClass(AbstractModel, [{
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "modelName",
        get: function get() {
            return this._modelName;
        }
    }]);

    return AbstractModel;
}();

module.exports = AbstractModel;

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Abstract = require('./abstract');

var AbstractRepository = function (_Abstract) {
    _inherits(AbstractRepository, _Abstract);

    function AbstractRepository() {
        _classCallCheck(this, AbstractRepository);

        var _this = _possibleConstructorReturn(this, (AbstractRepository.__proto__ || Object.getPrototypeOf(AbstractRepository)).call(this));

        _this._modelName = null;
        _this._collection = null;
        return _this;
    }

    _createClass(AbstractRepository, [{
        key: 'init',
        value: function init(modelName) {
            this._modelName = modelName;
        }
    }, {
        key: 'find',
        value: function find(obj, callback) {

            if ('object' === _typeof(this.collection) && null !== this._collection) {
                this.collection.find(obj).toArray(function (err, results) {
                    if (null === err) {
                        callback(results);
                    } else {
                        throw err;
                    }
                });
            } else {
                this.logger.error('data service is not ready');
            }
        }
    }, {
        key: 'collection',
        get: function get() {
            return this._collection;
        },
        set: function set(collection) {
            this._collection = collection;
        }
    }, {
        key: 'modelClass',
        get: function get() {
            return this.models[this._modelName];
        }
    }]);

    return AbstractRepository;
}(Abstract);

module.exports = AbstractRepository;

},{"./abstract":6}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Abstract = require('./abstract');

var AbstractService = function (_Abstract) {
    _inherits(AbstractService, _Abstract);

    function AbstractService() {
        _classCallCheck(this, AbstractService);

        var _this = _possibleConstructorReturn(this, (AbstractService.__proto__ || Object.getPrototypeOf(AbstractService)).call(this));

        _this._config = {};
        return _this;
    }

    _createClass(AbstractService, [{
        key: 'config',
        get: function get() {
            return this._config;
        }
    }]);

    return AbstractService;
}(Abstract);

module.exports = AbstractService;

},{"./abstract":6}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    }, {
        key: 'data',
        get: function get() {
            return this.services.data;
        }
    }, {
        key: 'server',
        get: function get() {
            return this.services.server;
        }
    }, {
        key: 'models',
        get: function get() {
            return this.kernel.models;
        }
    }, {
        key: 'repositories',
        get: function get() {
            return this.kernel.repositories;
        }
    }, {
        key: 'fileSystem',
        get: function get() {
            return this.utils.fileSystem;
        }
    }, {
        key: 'utils',
        get: function get() {
            return this.kernel.utils;
        }
    }]);

    return Abstract;
}();

module.exports = Abstract;

},{"./kernel":9}],7:[function(require,module,exports){
'use strict';

module.exports = {
    models: {
        log: {
            class: require('../model/log')
        }
    },
    repositories: {
        log: {
            class: require('../repository/log')
        }
    },
    handler: {
        error: {
            class: require('../handler/error/web')
        }
    },
    services: {
        logger: {
            class: require('../service/logger/web')
        },
        data: {
            class: require('../service/data/web')
        }
    },
    utils: {
        error: {
            class: require('../util/error')
        },
        object: {
            class: require('../util/object')
        },
        string: {
            class: require('../util/string')
        }
    }
};

},{"../handler/error/web":8,"../model/log":10,"../repository/log":11,"../service/data/web":13,"../service/logger/web":15,"../util/error":16,"../util/object":17,"../util/string":18}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractHandler = require('../../abstract-handler');

var Error = function (_AbstractHandler) {
    _inherits(Error, _AbstractHandler);

    function Error() {
        _classCallCheck(this, Error);

        var _this = _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).call(this));

        window.onerror = _this.handle.bind(_this);
        return _this;
    }

    _createClass(Error, [{
        key: 'handle',
        value: function handle(message) {

            try {
                this.logger.critical(message);
                return true;
            } catch (logError) {}

            return false;
        }
    }]);

    return Error;
}(AbstractHandler);

module.exports = Error;

},{"../../abstract-handler":2}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
    function Kernel() {
        _classCallCheck(this, Kernel);

        if ('undefined' === typeof window) {
            this._config = require('./config/' + 'app');
        } else {
            this._config = require('./config/web');
        }

        this._services = {};
        this._models = {};
        this._utils = {};
        this._handler = {};
    }

    _createClass(Kernel, [{
        key: 'init',
        value: function init(config) {

            // get utils
            for (var util in this._config.utils) {
                this._utils[util] = this._config.utils[util].class;
            }

            // merge application specific config with default config
            if ('object' === (typeof config === 'undefined' ? 'undefined' : _typeof(config))) this._utils.object.merge(this._config, config);

            // get handler
            for (var handler in this._config.handler) {
                this._handler[handler] = new this._config.handler[handler].class();
            }

            // make models application wide available
            for (var modelName in this._config.models) {
                this._models[modelName] = this._config.models[modelName].class;
            }

            // instantiate services
            for (var serviceName in this._config.services) {

                var service = this._config.services[serviceName];

                this._services[serviceName] = new service.class(service.config);
            }
        }
    }, {
        key: 'handle',
        value: function handle(event) {
            if ('object' !== (typeof event === 'undefined' ? 'undefined' : _typeof(event))) {
                this.services.logger.error('event is no object', event);
                return false;
            }

            if ('string' !== typeof event.handler) {
                this.services.logger.error('event has no handler', event);
                return false;
            }

            if ('object' !== _typeof(this.handler[event.handler])) {
                this.services.logger.error('event handler ' + event.handler + ' does not exists');
                return false;
            }

            this.handler[event.handler].handle(event);
        }
    }, {
        key: 'config',
        get: function get() {
            return this._config;
        }
    }, {
        key: 'utils',
        get: function get() {
            return this._utils;
        }
    }, {
        key: 'handler',
        get: function get() {
            return this._handler;
        }
    }, {
        key: 'services',
        get: function get() {
            return this._services;
        }
    }, {
        key: 'models',
        get: function get() {
            return this._models;
        }
    }, {
        key: 'repositories',
        get: function get() {
            return this.services.data.repositories;
        }
    }]);

    return Kernel;
}();

module.exports = new Kernel();

},{"./config/web":7}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModel = require('../abstract-model');

var Log = function (_AbstractModel) {
    _inherits(Log, _AbstractModel);

    function Log(message, meta, code, date, stack) {
        _classCallCheck(this, Log);

        var _this = _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this, 'log'));

        _this._message = message;
        _this._meta = meta;
        _this._code = code;
        _this._date = date;
        _this._stack = stack;

        return _this;
    }

    _createClass(Log, [{
        key: 'message',
        get: function get() {
            return this._message;
        }
    }, {
        key: 'meta',
        get: function get() {
            return this._meta;
        }
    }, {
        key: 'code',
        get: function get() {
            return this._code;
        }
    }, {
        key: 'date',
        get: function get() {
            return this._date;
        }
    }, {
        key: 'stack',
        get: function get() {
            return this._stack;
        }
    }]);

    return Log;
}(AbstractModel);

module.exports = Log;

},{"../abstract-model":3}],11:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractRepository = require('../abstract-repository');

var Log = function (_AbstractRepository) {
    _inherits(Log, _AbstractRepository);

    function Log() {
        _classCallCheck(this, Log);

        return _possibleConstructorReturn(this, (Log.__proto__ || Object.getPrototypeOf(Log)).call(this));
    }

    return Log;
}(AbstractRepository);

module.exports = Log;

},{"../abstract-repository":4}],12:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractService = require('../../abstract-service');

var AbstractData = function (_AbstractService) {
    _inherits(AbstractData, _AbstractService);

    function AbstractData() {
        _classCallCheck(this, AbstractData);

        return _possibleConstructorReturn(this, (AbstractData.__proto__ || Object.getPrototypeOf(AbstractData)).call(this));
    }

    return AbstractData;
}(AbstractService);

module.exports = AbstractData;

},{"../../abstract-service":5}],13:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractData = require('./abstract-data');

var Data = function (_AbstractData) {
    _inherits(Data, _AbstractData);

    function Data(config) {
        _classCallCheck(this, Data);

        return _possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).call(this, config));
    }

    return Data;
}(AbstractData);

module.exports = Data;

},{"./abstract-data":12}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractService = require('../../abstract-service');

var AbstractLogger = function (_AbstractService) {
    _inherits(AbstractLogger, _AbstractService);

    function AbstractLogger() {
        _classCallCheck(this, AbstractLogger);

        var _this = _possibleConstructorReturn(this, (AbstractLogger.__proto__ || Object.getPrototypeOf(AbstractLogger)).call(this));

        _this._config = {
            levels: {
                emergency: {
                    code: 0
                },
                alert: {
                    code: 1
                },
                critical: {
                    code: 2
                },
                error: {
                    code: 3
                },
                warning: {
                    code: 4
                },
                notice: {
                    code: 5
                },
                info: {
                    code: 6
                },
                debug: {
                    code: 7
                }
            }
        };

        return _this;
    }

    _createClass(AbstractLogger, [{
        key: 'emergency',
        value: function emergency(message, meta, stack) {
            this._log(message, meta, stack, 0);
        }
    }, {
        key: 'alert',
        value: function alert(message, meta, stack) {
            this._log(message, meta, stack, 1);
        }
    }, {
        key: 'critical',
        value: function critical(message, meta, stack) {
            this._log(message, meta, stack, 2);
        }
    }, {
        key: 'error',
        value: function error(message, meta, stack) {
            this._log(message, meta, stack, 3);
        }
    }, {
        key: 'warning',
        value: function warning(message, meta, stack) {
            this._log(message, meta, stack, 4);
        }
    }, {
        key: 'notice',
        value: function notice(message, meta, stack) {
            this._log(message, meta, stack, 5);
        }
    }, {
        key: 'info',
        value: function info(message, meta, stack) {
            this._log(message, meta, stack, 6);
        }
    }, {
        key: 'debug',
        value: function debug(message, meta, stack) {
            this._log(message, meta, stack, 7);
        }

        /**
         * @param code
         * @returns {*}
         * @private
         */

    }, {
        key: '_getLevelNameByCode',
        value: function _getLevelNameByCode(code) {
            for (var levelName in this._config.levels) {
                if (this._config.levels[levelName].code === code) return levelName;
            }
            return null;
        }

        /**
         * @param date
         * @returns {string}
         * @private
         */

    }, {
        key: '_dateStringFromDate',
        value: function _dateStringFromDate(date) {
            return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + date.toTimeString().slice(0, 8);
        }
    }]);

    return AbstractLogger;
}(AbstractService);

module.exports = AbstractLogger;

},{"../../abstract-service":5}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractLogger = require('./abstract-logger');
var Log = require('../../model/log');

var Logger = function (_AbstractLogger) {
    _inherits(Logger, _AbstractLogger);

    function Logger() {
        _classCallCheck(this, Logger);

        return _possibleConstructorReturn(this, (Logger.__proto__ || Object.getPrototypeOf(Logger)).call(this));
    }

    _createClass(Logger, [{
        key: '_log',
        value: function _log(message, meta, stack, code) {

            var levelName = this._getLevelNameByCode(code);
            var date = new Date();

            message = this.utils.string.cast(message);
            meta = this.utils.string.cast(meta);

            var output = '[' + this._dateStringFromDate(date) + '] ';
            output += '[' + levelName + '] ';
            output += message;

            if (code < 3) {
                if ('undefined' !== typeof meta) {
                    console.error(output, meta);
                } else {
                    console.error(output);
                }
            } else {
                if ('undefined' !== typeof meta) {
                    console.log(output, meta);
                } else {
                    console.log(output);
                }
            }
        }
    }]);

    return Logger;
}(AbstractLogger);

module.exports = Logger;

},{"../../model/log":10,"./abstract-logger":14}],16:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    stack: function stack(error) {

        var stack = [];

        if ('string' === typeof error.stack) {
            var lines = error.stack.split('at ');

            lines.shift();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var line = _step.value;


                    var file = '';
                    var column = 0;
                    var row = 0;

                    var path = line.match(/\(.+\)/g);

                    if ('object' === (typeof path === 'undefined' ? 'undefined' : _typeof(path)) && null !== path) {
                        path = path[0].replace('(', '');
                        path = path.replace(')', '');

                        if (-1 !== path.indexOf(':')) path = path.split(':')[0];
                    } else {
                        path = '';
                    }

                    var fileWithLineAndColumn = line.match(/\w+\.js:\d+:\d+|\w+\.\w+\.js:\d+:\d+/g);

                    if ('string' === typeof fileWithLineAndColumn[0]) {
                        var parts = fileWithLineAndColumn[0].split(':');

                        if ('string' === typeof parts[0]) file = parts[0];
                        if ('string' === typeof parts[1]) row = parts[1];
                        if ('string' === typeof parts[2]) column = parts[2];
                    }

                    var method = line.split('(')[0].trim();
                    method = 0 === method.indexOf('new') ? method.replace('new ', '') + '.constructor' : method;

                    if (path === '' && file !== '') {
                        path = file;
                    }

                    var entry = {
                        path: path,
                        file: file,
                        row: row,
                        column: column,
                        method: method
                    };

                    stack.push(entry);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        return stack;
    }
};

},{}],17:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    merge: function merge(obj1, obj2) {
        for (var key in obj2) {
            if ('object' === _typeof(obj1[key]) && 'object' === _typeof(obj2[key])) {
                obj1[key] = this.merge(obj1[key], obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }
};

},{}],18:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
    toMany: function toMany(string) {
        if (string.indexOf('y') === string.length - 1) return string.slice(0, -1) + 'ies';
        return string + 's';
    },

    cast: function cast(val) {

        switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
            case 'object':
                if (val === null) {
                    val = '';
                } else {

                    var cache = [];

                    val = JSON.stringify(val, function (key, val) {
                        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
                            if (cache.indexOf(val) >= 0) return;
                            cache.push(val);
                        }
                        return val;
                    });
                }
                break;
            case 'undefined':
                val = '';
                break;
            default:
                val = String(val);
                break;
        }

        return val;
    }
};

},{}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractApplication = require('@jeneric/core/abstract-application');

var Main = function (_AbstractApplication) {
    _inherits(Main, _AbstractApplication);

    function Main() {
        _classCallCheck(this, Main);

        //this._socket = null;
        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

        _this._socket = io(window.location.href);

        _this._socket.on('event', function (event) {
            console.log(event);
        });

        _this._socket.emit('event', {
            handler: 'log'
        });

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

            this._socket.emit('data', { 'test': 'test' });
        }
    }]);

    return Main;
}(AbstractApplication);

var main = new Main();

},{"@jeneric/core/abstract-application":1}]},{},[19]);
