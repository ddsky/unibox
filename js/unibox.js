/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

    "use strict";

    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    var _SxQueryObject = __webpack_require__(2);
    
    var _SxQueryObject2 = _interopRequireDefault(_SxQueryObject);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var sxQuery = function sxQuery(data) {
        var isWindow = false;
        try {
            isWindow = data instanceof Window || data === window;
        } catch (e) {
            isWindow = window.constructor ? data instanceof window.constructor : data === window;
        }
        if (typeof data === "string") {
            var parsedHTML = sxQuery.parseHTML(data);
            if (parsedHTML.length === 0) {
                return new _SxQueryObject2.default(sxQuery.querySelectorAll(data));
            } else {
                return new _SxQueryObject2.default(parsedHTML);
            }
        } else if (data instanceof Node || data === document || data !== undefined && data.appendChild && data.cloneNode) {
            return new _SxQueryObject2.default([data]);
        } else if (data instanceof Array || data instanceof HTMLCollection || data instanceof NodeList) {
            if (data instanceof Array && data.reduce(function (acc, node) {
                return acc && typeof node === "string";
            }, true)) {
                // array of html strings
                return new _SxQueryObject2.default(data.map(function (item) {
                    return sxQuery.parseHTML(item);
                }));
            } else {
                return new _SxQueryObject2.default(data);
            }
        } else if (isWindow) {
            return new _SxQueryObject2.default([data]);
        } else if (data instanceof _SxQueryObject2.default) {
            return new _SxQueryObject2.default(data.get());
        } else {
            return new _SxQueryObject2.default([]); //
        }
    };
    
    // private methods and properties
    sxQuery._animations = {};
    sxQuery._callbacksByName = {};
    
    sxQuery._animationNodeFlag = 0;
    
    sxQuery._notifyAnimation = function (node, type, id) {
        if (!node.sxQueryAnimationFlag) {
            node.sxQueryAnimationFlag = sxQuery._animationNodeFlag;
            sxQuery._animationNodeFlag++;
            sxQuery._animations[node.sxQueryAnimationFlag] = {};
        }
        sxQuery._animations[node.sxQueryAnimationFlag][type] = id;
    };
    
    sxQuery._clearAnimation = function (node, type) {
        var flg = node.sxQueryAnimationFlag;
        if (flg !== undefined && sxQuery._animations[flg] !== undefined && type in sxQuery._animations[flg]) {
            sxQuery._stopAnimation(sxQuery._animations[flg][type]);
        }
    };
    
    sxQuery._requestAnimation = function (tick) {
        return window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
    };
    sxQuery._stopAnimation = function (id) {
        if (!window.cancelAnimationFrame || !window.cancelAnimationFrame(id)) {
            clearTimeout(id);
        }
    };
    //dom independent public methods
    sxQuery.inArray = function (item, array) {
        return array.indexOf(item);
    };
    
    /**
     * Loops through array or object keys and calls the callback - with index and value in case of array, with key and value in case of object.
     *
     * @param data - object or array
     * @param callback - callback to call
     * @returns {*} - data
     */
    sxQuery.each = function (data, callback) {
        if (data instanceof Array) {
            //array
            data.forEach(function (item, i) {
                if (callback && typeof callback == "function") {
                    callback(i, item);
                }
            });
        } else {
            //object
            var idx = 0;
            for (var i in data) {
                if (data.hasOwnProperty && data.hasOwnProperty(i)) {
                    if (callback && typeof callback == "function") {
                        callback(i, data[i], idx);
                    }
                    idx++;
                }
            }
        }
        return data;
    };
    
    sxQuery.indexInNodeList = function (el, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
                return i;
            }
        }
        return -1;
    };
    
    // creating and reading cookies
    sxQuery.createCookie = function (name, value, days) {
        var expires;
    
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    };
    
    sxQuery.readCookie = function (name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    };
    
    sxQuery.linkOpensInNewTab = function (event) {
        return event.ctrlKey || //CTRL
        event.which == 2 || event.button == 4 || //middle mouse click
        event.target && event.target.target && event.target.target == "_blank"; // target="_blank"
    };
    
    /**
     * @param type - one of ['max','min']
     */
    sxQuery.matchesMediaQuery = function (type, breakpoint) {
        if (window.matchMedia) {
            var mQuery = type == "max" ? "(max-width: " + breakpoint + "px)" : "(min-width: " + breakpoint + "px)";
            return window.matchMedia(mQuery).matches;
        }
        if (type == "max") {
            return window.innerWidth <= parseInt(breakpoint);
        }
        return window.innerWidth >= parseInt(breakpoint);
    };
    
    sxQuery.parseHTML = function (str) {
        var tmp = document.implementation.createHTMLDocument("");
        tmp.body.innerHTML = str;
        var res = [];
        for (var i = 0; i < tmp.body.children.length; i++) {
            res.push(document.importNode(tmp.body.children[i], true));
        }
        return res;
    };
    
    /**
     * Deep extend
     * @param out the output object
     * @param [,object1][,objectN]
     */
    sxQuery.extend = function (out) {
        var output = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i]) {
                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key) && arguments[i][key] !== undefined) {
                        if (sxQuery.isObject(output[key]) && sxQuery.isObject(arguments[i][key])) {
                            output[key] = sxQuery.extend(output[key], arguments[i][key]);
                        } else {
                            output[key] = arguments[i][key];
                        }
                    }
                }
            }
        }
        return output;
    };
    
    sxQuery.isObject = function (el) {
        return el !== undefined && (typeof el === "undefined" ? "undefined" : _typeof(el)) == "object" && !(el instanceof Array);
    };
    
    sxQuery.ajax = function (dataObject) {
        dataObject = dataObject || {};
        var method = dataObject.method || 'GET';
        var dataType = dataObject.dataType;
        var url = dataObject.url;
        var success = dataObject.success || function () {};
        var error = dataObject.error || function () {};
        var forceXDR = 'XDomainRequest' in window;
        var request = forceXDR ? new XDomainRequest() : new XMLHttpRequest();
        request.open(method, forceXDR ? url.replace("https://", "//") : url, true);
        request.onload = function () {
            if (forceXDR || request.status >= 200 && request.status < 400) {
                var response = request.responseText;
                if (!dataType || dataType === "json") {
                    try {
                        success(JSON.parse(response));
                    } catch (e) {
                        console.warn(e);
                        success(response);
                    }
                }
            } else {
                //mmmmm...
            }
        };
        request.onerror = function () {
            error(request.status, request.statusText);
        };
        var send = function (request) {
            try {
                if (method !== "POST") {
                    request.send();
                } else {
                    var data = "";
                    sxQuery.each(dataObject.data, function (key, value) {
                        data += key + "=" + value + "&";
                    });
                    if (data.length > 0) {
                        data = data.substring(0, data.length - 1);
                    }
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    request.send(data);
                }
            } catch (e) {
                error(request.status, request.statusText, e);
            }
        }.bind(this, request);
        if (forceXDR) {
            setTimeout(send, 0);
        } else {
            send();
        }
    };
    
    sxQuery.get = function (url, success, error, dataType) {
        sxQuery.ajax({
            url: url,
            success: success,
            error: error,
            dataType: dataType
        });
    };
    
    sxQuery.post = function (url, data, success, dataType) {
        sxQuery.ajax({
            url: url,
            success: success,
            dataType: dataType,
            method: 'POST',
            data: data
        });
    };
    
    //no invert support
    sxQuery.grep = function (array, filter) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (filter(array[i])) {
                result.push(array[i]);
            }
        }
        return result;
    };
    
    sxQuery.querySelectorAll = function (data, node) {
        node = node || document;
        var matches = [];
        //get just first element for id-only query - same behavior as jQuery
        if (data.indexOf("#") === 0 && data.indexOf(" ") == -1 && data.indexOf(".") == -1 && data.indexOf(":") == -1 && data.indexOf(">") !== -1) {
            var found = node.getElementById ? node.getElementById(data.replace("#", "")) : node.querySelector(data);
            if (found) {
                matches.push(found);
            }
            return matches;
        }
        if (data.indexOf(":first") !== -1 || data.indexOf(":visible") !== -1) {
            //handle jQuery-like :first and :visible
            var partialQueries = data.split(" ");
            for (var i = 0; i < partialQueries.length; i++) {
                var query = partialQueries[i];
                var justFirst = false;
                var justVisible = false;
                if (query.indexOf(":first") !== -1) {
                    justFirst = true;
                    query = query.replace(":first", "");
                } else if (query.indexOf(":visible") !== -1) {
                    justVisible = true;
                    query = query.replace(":visible", "");
                }
                matches = matches.length === 0 ? sxQuery(node).find(query) : matches.find(query);
                if (justFirst && matches.length > 0) {
                    matches = sxQuery(matches[0]);
                } else if (justVisible && matches.length > 0) {
                    matches = matches.filter(function (m) {
                        return sxQuery(m).isVisible();
                    });
                }
            }
            matches = matches.get();
        } else if (data) {
            matches = node.querySelectorAll(data);
        }
        return matches;
    };
    
    sxQuery.prefersReducedMotion = function () {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };
    
    sxQuery.srOnlyCss = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0";
    
    var handler = {
        set: function set(obj, prop, value) {
            _SxQueryObject2.default.prototype[prop] = value;
            return true;
        }
    };
    
    try {
        sxQuery.fn = new Proxy({}, handler);
    } catch (e) {
        //proxy not supported --> IE
        sxQuery.fn = _SxQueryObject2.default.prototype;
    }
    
    exports.default = sxQuery;
    
    /***/ }),
    
    /***/ 2:
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _sxQuery = __webpack_require__(0);
    
    var _sxQuery2 = _interopRequireDefault(_sxQuery);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var SxQueryObject = function SxQueryObject(elems) {
        var _self = this;
    
        var makePureArray = function makePureArray() {
            var pureArray = [];
            for (var g = 0; g < elems.length; g++) {
                pureArray.push(elems[g]);
            }
            return pureArray;
        };
        var _elems = makePureArray();
        var CSS_TO_PIXEL = {
            width: true,
            height: true,
            minWidth: true,
            minHeight: true,
            maxWidth: true,
            padding: true,
            paddingLeft: true,
            paddingRight: true,
            paddingTop: true,
            paddingBottom: true,
            left: true,
            right: true,
            top: true,
            bottom: true,
            borderWidth: true
        };
    
        this._it = function (callback) {
            for (var i = 0; i < _elems.length; i++) {
                var elem = _elems[i];
                if (elem && callback) {
                    callback(elem, i == _elems.length - 1);
                }
            }
        };
    
        this._canMatch = function (elem) {
            return elem.matches || elem.matchesSelector || elem.msMatchesSelector;
        };
    
        this._match = function (elem, querySelector) {
            return elem.matches ? elem.matches(querySelector) : elem.matchesSelector ? elem.matchesSelector(querySelector) : elem.msMatchesSelector(querySelector);
        };
    
        /* Append or prepend an element*/
        this._addNode = function (content, append) {
            var result = [];
            if (typeof content === "string") {
                //parseHtml and append
                result = result.concat(this._addNode(_sxQuery2.default.parseHTML(content), append));
                return result;
            } else if (content instanceof Array || content instanceof HTMLCollection || content instanceof NodeList) {
                //append each element
                for (var i = append ? 0 : content.length - 1; append ? i < content.length : i >= 0; append ? i++ : i--) {
                    result = result.concat(this._addNode(content[i], append));
                }
                return result;
            } else if (content instanceof SxQueryObject) {
                //get elements and append those
                result = result.concat(this._addNode(content.get(), append));
                content.clear();
                content.push(result);
                return result;
            } else if (content instanceof Node || content !== undefined && content.appendChild && content.cloneNode) {
                //finally really append
                this._it(function (elem, isLast) {
                    var node = !isLast ? content.cloneNode(true) : content;
                    result.push(node);
                    try {
                        if (append || !elem.firstChild) {
                            elem.appendChild(node);
                        } else {
                            elem.insertBefore(node, elem.firstChild);
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
                });
                return result;
            }
        };
    
        this._init = function () {
            for (var i = 0; i < _elems.length; i++) {
                this[i] = _elems[i];
            }
        };
    
        this._init();
    
        //api
        this.length = _elems.length;
    
        this.push = function (arr) {
            _elems = _elems || [];
            _elems = _elems.concat(arr);
            this.length = _elems.length;
        };
    
        this.clear = function () {
            _elems = [];
            this.length = 0;
        };
    
        this.get = function (idx) {
            if (idx !== undefined) {
                return _elems[idx];
            }
            return _elems;
        };
    
        this.remove = function () {
            this._it(function (elem) {
                if (elem.parentNode) {
                    elem.parentNode.removeChild(elem);
                }
            });
        };
    
        this.each = function (callback) {
            var idx = 0;
            this._it(function (elem) {
                callback.call(elem, elem, idx);
                idx++;
            });
        };
    
        this._trigger = function (eventName) {
            //FIXME: not sure that this would work... - currently used only as fallback, that's why private
            var e = undefined;
            if (window.CustomEvent) {
                try {
                    e = new CustomEvent(eventName);
                } catch (ex) {}
            }
            if (e === undefined) {
                e = document.createEvent('CustomEvent');
                e.initCustomEvent(eventName, true, true, {});
            }
            this._it(function (elem) {
                elem.dispatchEvent(e);
            });
        };
    
        this.on = function (event, selector, callback) {
            if (callback === undefined) {
                this.on(event, undefined, selector); //selector is actually callback
            } else {
                if (!selector) {
                    this._it(function (elem) {
                        var events = event.split(",");
                        for (var i = 0; i < events.length; i++) {
                            var eventName = events[i];
                            if (eventName.indexOf(".") !== -1) {
                                var nameToKey = eventName.split(".");
                                if (nameToKey.length == 2) {
                                    eventName = eventName.trim();
                                    //save callback
                                    if (!_sxQuery2.default._callbacksByName[eventName]) {
                                        _sxQuery2.default._callbacksByName[eventName] = [];
                                    }
                                    _sxQuery2.default._callbacksByName[eventName].push(callback);
                                    eventName = nameToKey[0];
                                }
                            }
                            elem.addEventListener(eventName.trim(), callback);
                        }
                    });
                } else {
                    var matches = this._match;
                    var canMatch = this._canMatch;
                    var handler = function (canMatch, matches, selector, callback, e) {
                        if (!e || !e.target) {
                            return;
                        }
                        if (canMatch(e.target) && matches(e.target, selector)) {
                            //elem triggered the event
                            callback.bind(e.target, e).call();
                        } else {
                            //check whether elem child triggered the event
                            var node = e.target;
                            while (node.parentNode && canMatch(node.parentNode)) {
                                node = node.parentNode;
                                if (canMatch(node) && matches(node, selector)) {
                                    callback.bind(e.target, e).call();
                                    break;
                                }
                            }
                        }
                    }.bind(this, canMatch, matches);
                    this._it(function (elem) {
                        var events = event.split(",");
                        for (var i = 0; i < events.length; i++) {
                            elem.addEventListener(events[i].trim(), handler.bind(this, selector, callback));
                        }
                    });
                }
            }
            return _self;
        };
    
        this.off = function (event, listener) {
            var events = event.split(",");
            if (!events || events.length == 0) {
                return _self;
            }
            this._it(function (elem) {
                events.map(function (e) {
                    if (e.indexOf(".") === -1) {
                        elem.removeEventListener(e.trim(), listener);
                    } else if (_sxQuery2.default._callbacksByName[e.trim()]) {
                        var eventName = e.split(".")[0].trim();
                        _sxQuery2.default._callbacksByName[e.trim()].map(function (callback) {
                            elem.removeEventListener(eventName, callback);
                        });
                    }
                });
            });
            return _self;
        };
    
        this.mouseenter = function (callback) {
            return this.on("mouseenter", callback);
        };
    
        this.mousedown = function (callback) {
            return this.on("mousedown", callback);
        };
    
        this.mouseup = function (callback) {
            return this.on("mouseup", callback);
        };
    
        this.click = function (callback) {
            return this.on("click", callback);
        };
    
        this.scroll = function (callback) {
            return this.on("scroll", callback);
        };
    
        this.focus = function (callback) {
            if (callback === undefined) {
                this._it(function (elem) {
                    if (elem.focus) {
                        elem.focus();
                    } else {
                        (0, _sxQuery2.default)(elem)._trigger("focus");
                    }
                });
            } else {
                this.on("focus", callback);
            }
            return _self;
        };
    
        this.blur = function (callback) {
            if (callback === undefined) {
                this._it(function (elem) {
                    if (elem.blur) {
                        elem.blur();
                    } else {
                        (0, _sxQuery2.default)(elem)._trigger("blur");
                    }
                });
            } else {
                this.on("blur", callback);
            }
            return _self;
        };
    
        this.keydown = function (callback) {
            return this.on("keydown", callback);
        };
    
        this.keyup = function (callback) {
            return this.on("keyup", callback);
        };
    
        this.focusout = function (callback) {
            return this.on("focusout", callback);
        };
    
        this.find = function (querySelector) {
            var result = [];
            this._it(function (elem) {
                var found = _sxQuery2.default.querySelectorAll(querySelector, elem);
                for (var i = 0; i < found.length; i++) {
                    result.push(found[i]);
                }
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.children = function () {
            var result = [];
            this._it(function (elem) {
                for (var i = 0; i < elem.childElementCount; i++) {
                    result.push(elem.children[i]);
                }
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.is = function (node) {
            for (var i = 0; i < _elems.length; i++) {
                var el = _elems[i];
                if (el === node) {
                    return true;
                }
            }
            return false;
        };
    
        this.text = function (text) {
            if (text == undefined) {
                var result = "";
                this._it(function (elem) {
                    result += elem.textContent || "";
                });
                return result;
            } else {
                this._it(function (elem) {
                    elem.innerText = text;
                });
                return _self;
            }
        };
    
        this.position = function () {
            if (_elems.length > 0) {
                var elem = _elems[0];
    
                var $elem = (0, _sxQuery2.default)(elem);
                var offset;
                if ($elem.css("position") == "fixed") {
                    offset = elem.getBoundingClientRect();
                } else {
                    var offsetParent = elem.offsetParent;
                    var $offsetParent = (0, _sxQuery2.default)(offsetParent);
                    var parentOffset = {
                        top: 0,
                        left: 0
                    };
                    offset = $elem.offset();
                    if (offsetParent.nodeName != "html") {
                        parentOffset = $offsetParent.offset();
                    }
                    parentOffset.top += parseFloat($offsetParent.css("borderTopWidth"));
                    parentOffset.left += parseFloat($offsetParent.css("borderLeftWidth"));
                    offset.top = offset.top - parentOffset.top - parseFloat($elem.css("marginTop"));
                    offset.left = offset.left - parentOffset.left - parseFloat($elem.css("marginLeft"));
                }
                return offset;
            }
        };
    
        this.attr = function (key, value) {
            if (value === undefined) {
                if (_elems.length > 0) {
                    return _elems[0].getAttribute(key);
                }
            } else {
                this._it(function (elem) {
                    if (value !== null) {
                        elem.setAttribute(key, value);
                    } else {
                        elem.removeAttribute(key);
                    }
                });
            }
        };
    
        this.removeAttribute = function (key) {
            if (key) {
                this._it(function (el) {
                    if (el.removeAttribute) {
                        el.removeAttribute(key);
                    }
                });
            }
        };
    
        this.hide = function () {
            this._it(function (elem) {
                elem.style.display = "none";
            });
        };
    
        this.show = function () {
            this._it(function (elem) {
                elem.style.display = '';
            });
        };
    
        this.data = function (key, value) {
            if (value === undefined) {
                if (_elems.length > 0) {
                    return _elems[0].dataset[key];
                }
                return undefined;
            } else {
                this._it(function (el) {
                    if (value === null) {
                        delete el.dataset[key];
                    } else {
                        el.dataset[key] = value;
                    }
                });
                return this;
            }
        };
    
        this.addClass = function (className) {
            var classElems = className.split(" ");
            this._it(function (elem) {
                for (var i = 0; i < classElems.length; i++) {
                    if (elem.classList) {
                        elem.classList.add(classElems[i]);
                    } else {
                        elem.className += " " + classElems[i];
                    }
                }
            });
            return this;
        };
    
        this.removeClass = function (className) {
            var classElems = className.split(" ");
            this._it(function (elem) {
                for (var i = 0; i < classElems.length; i++) {
                    if (elem.classList) {
                        elem.classList.remove(classElems[i]);
                    } else {
                        elem.className = elem.className.replace(new RegExp('(^|\\b)' + classElems[i].split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                    }
                }
            });
            return this;
        };
    
        this.toggleClass = function (className) {
            if (this.hasClass(className)) {
                this.removeClass(className);
            } else {
                this.addClass(className);
            }
        };
    
        this.hasClass = function (className) {
            for (var i = 0; i < _elems.length; i++) {
                //not using _it to be able to break the loop
                var elem = elems[i];
                if (!elem) {
                    continue;
                }
                if (elem.classList) {
                    if (elem.classList.contains(className)) {
                        return true;
                    }
                } else {
                    if (new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className)) {
                        return true;
                    }
                }
            }
            return false;
        };
    
        /* Returns new SxQueryObject containing filtered elements */
        this.filter = function (validator) {
            return (0, _sxQuery2.default)(this.get().filter(validator));
        };
    
        this.val = function (value) {
            if (value !== undefined) {
                this._it(function (elem) {
                    elem.value = value;
                });
                return this;
            } else if (_elems.length > 0) {
                return _elems[0].value;
            }
        };
    
        this.css = function (key, value) {
            key = key.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
            if (value !== undefined) {
                if (value !== null) {
                    var valueString = value.toString();
                    if (CSS_TO_PIXEL[key] && valueString !== "auto" && valueString.indexOf("px") === -1 && valueString.indexOf("%") === -1 && valueString.indexOf("calc") === -1 && value !== 0 && value !== '') {
                        value = value.toString();
                        value += "px";
                    }
                }
                this._it(function (elem) {
                    elem.style[key] = value;
                });
            } else if (_elems.length > 0) {
                for (var i = 0; i < _elems.length; i++) {
                    try {
                        return window.getComputedStyle(_elems[i])[key];
                    } catch (e) {}
                }
                return null;
            }
        };
    
        this.append = function (content) {
            this._addNode(content, true);
            return this;
        };
    
        this.prepend = function (content) {
            this._addNode(content, false);
            return this;
        };
    
        this.parent = function () {
            var result = [];
            this._it(function (elem) {
                result.push(elem.parentNode);
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.parents = function (querySelector) {
            var result = [];
            var scope = this;
            this._it(function (elem) {
                var parent = elem.parentNode;
                while (parent && scope._canMatch(parent)) {
                    if (querySelector === undefined || scope._match(parent, querySelector)) {
                        result.push(parent);
                    }
                    parent = parent.parentNode;
                }
            });
            return result;
        };
    
        this.prev = function () {
            var result = [];
            this._it(function (elem) {
                result.push(elem.previousElementSibling);
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.next = function () {
            var result = [];
            this._it(function (elem) {
                result.push(elem.nextElementSibling);
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.closest = function (querySelector) {
            var result = [];
            var scope = this;
            this._it(function (elem) {
                var tested = elem;
                while (tested && scope._canMatch(tested) && !scope._match(tested, querySelector)) {
                    tested = tested.parentNode;
                }
                if (!scope._canMatch(tested)) {
                    tested = undefined;
                }
                result.push(tested);
            });
            return (0, _sxQuery2.default)(result);
        };
    
        this.index = function (htmlNode) {
            for (var i = 0; i < _elems.length; i++) {
                if (_elems[i] === htmlNode) {
                    return i;
                }
            }
            return -1;
        };
    
        this.offset = function () {
            if (_elems.length > 0) {
                var elem = _elems[0];
                if (!elem.getClientRects().length) {
                    return {
                        top: 0,
                        left: 0
                    };
                }
                var rect = elem.getBoundingClientRect();
                var win = elem.ownerDocument.defaultView;
                return {
                    top: rect.top + win.pageYOffset,
                    left: rect.left + win.pageXOffset
                };
            }
        };
    
        this.outerWidth = function () {
            if (_elems.length > 0) {
                return _elems[0].offsetWidth;
            }
        };
    
        this.height = function (val) {
            if (val !== null && val !== undefined) {
                if (val.toString().indexOf("px") == -1 && val.toString().indexOf("%") == -1 && val !== "auto") {
                    val = val.toString() + "px";
                }
                this.css("height", val);
            } else {
                return parseFloat(this.css("height"));
            }
        };
    
        this.outerHeight = function () {
            if (_elems.length > 0) {
                return _elems[0].offsetHeight;
            }
        };
    
        this.html = function (data) {
            if (data !== undefined) {
                this.empty();
                this.append(data);
            } else if (_elems.length > 0) {
                return _elems[0].innerHTML;
            }
        };
    
        this.empty = function () {
            this._it(function (elem) {
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            });
        };
    
        this.scrollTop = function (val) {
            if (val !== undefined) {
                this._it(function (elem) {
                    if (elem.scrollTop !== undefined) {
                        elem.scrollTop = val;
                    } else if (elem.scrollY !== undefined && elem.scrollTo !== undefined) {
                        elem.scrollTo(elem.scrollX, val);
                    }
                });
            } else if (_elems.length > 0) {
                return _elems[0].scrollTop !== undefined ? _elems[0].scrollTop : _elems[0].scrollY;
            }
        };
    
        this.ready = function (fn) {
            this._it(function (elem) {
                if (elem.attachEvent ? elem.readyState === "complete" : elem.readyState !== "loading") {
                    fn();
                } else {
                    elem.addEventListener('DOMContentLoaded', fn);
                }
            });
        };
    
        /**
         * ~ jQuery(elem).is(":visible");
         */
        this.isVisible = function () {
            if (_elems.length > 0) {
                return (0, _sxQuery2.default)(_elems[0]).css("display") !== "none";
            }
        };
    
        this.map = function (callback) {
            var result = [];
            var i = 0;
            this._it(function (elem) {
                result.push(callback(i, elem));
                i++;
            });
            return result;
        };
    
        this._animate = function (el, animationType, duration, cosParameter, setter, callback) {
            var count = 0;
            var last = +new Date();
            var tick = function tick() {
                var current = new Date();
                count += Math.PI / (duration / (current - last));
                var val = cosParameter + cosParameter * Math.cos(count);
                setter(el, val);
                last = +new Date();
                if (count >= Math.PI) {
                    if (callback !== undefined && typeof callback == "function") {
                        callback(el);
                    }
                } else {
                    _sxQuery2.default._notifyAnimation(el, animationType, _sxQuery2.default._requestAnimation(tick));
                }
            };
            _sxQuery2.default._notifyAnimation(el, animationType, _sxQuery2.default._requestAnimation(tick));
        };
    
        //animations
        this._fade = function (out, duration, callback) {
            var factor = out ? -1 : 1;
            var setter = function setter(el, val) {
                if (el == undefined || val == undefined) {
                    return;
                }
                el.style.opacity = factor > 0 ? 1 - val : val;
            };
            var completeCallback = function completeCallback(el) {
                var $el = (0, _sxQuery2.default)(el);
                $el.css("opacity", "");
                if (out) {
                    $el.hide();
                }
                if (callback && typeof callback == "function") {
                    callback.bind($el).call();
                }
            };
            var scope = this;
            this._it(function (el) {
                _sxQuery2.default._clearAnimation(el, "fade");
                if (duration != 0 && !_sxQuery2.default.prefersReducedMotion()) {
                    scope._animate(el, "fade", duration || 400, 0.5, setter, completeCallback);
                } else {
                    completeCallback(el);
                }
            });
        };
    
        this.fadeIn = function (duration, callback, displayType) {
            if (displayType === undefined || displayType != "flex") {
                this.css("display", "block");
            } else {
                this._it(function (el) {
                    var $el = (0, _sxQuery2.default)(el);
                    var style = $el.attr("style");
                    if (style.length > 0 && style[style.length - 1] != ";") {
                        style += ";";
                    }
                    style += "display: -ms-flexbox;display: -webkit-flex;display: flex;";
                    $el.attr("style", style);
                });
            }
            this._it(function (el) {
                el.style.opacity = 0;
            });
            this._fade(false, duration, callback);
        };
    
        this.fadeOut = function (duration, callback) {
            this._it(function (el) {
                el.style.opacity = 1;
            });
            this._fade(true, duration, callback);
        };
    
        this._slide = function (up, duration, callback) {
            var scope = this;
            var completeCallback = function completeCallback(el) {
                var $el = (0, _sxQuery2.default)(el);
                $el.css("height", "");
                if (up) {
                    $el.hide();
                }
                if (callback && typeof callback == "function") {
                    callback.bind($el).call();
                }
            }; //.bind(this, up, callback);
            var setter = function setter(up, height, el, val) {
                if (el == undefined || val == undefined) {
                    return;
                }
                var nHeight = up ? val : height - val;
                el.style.height = nHeight + "px";
            };
            this._it(function (el) {
                _sxQuery2.default._clearAnimation(el, 'slide');
                if (duration != 0 && !_sxQuery2.default.prefersReducedMotion()) {
                    var $el = (0, _sxQuery2.default)(el);
                    var height = $el.outerHeight();
                    $el.css("height", 0);
                    var cosParam = height / 2;
                    scope._animate(el, 'slide', duration || 400, cosParam, function (el, val) {
                        setter(up, height, el, val);
                    }, completeCallback);
                } else {
                    completeCallback(el);
                }
            });
        };
    
        this.slideDown = function (duration, callback) {
            this.css("display", "block");
            this._slide(false, duration, callback);
        };
    
        this.slideUp = function (duration, callback) {
            this._it(function (el) {
                var $el = (0, _sxQuery2.default)(el);
                $el.css("height", $el.outerHeight());
            });
            this._slide(true, duration, callback);
        };
    
        this.animateScrollTop = function (target, duration) {
            var scope = this;
            duration = duration || 400;
            var setter = function setter(startVal, target, el, newVal) {
                if (target >= startVal) {
                    el.scrollTop = startVal + (Math.abs(startVal - target) - newVal);
                } else {
                    el.scrollTop = target + newVal;
                }
            };
            this._it(function (el) {
                var startVal = el.scrollTop;
                var range = Math.abs(startVal - target);
                _sxQuery2.default._clearAnimation(el, 'scrollTop');
                if (range < 1 || duration == 0 || _sxQuery2.default.prefersReducedMotion()) {
                    el.scrollTop = target;
                    return;
                }
                var cosParameter = range / 2;
                scope._animate(el, 'scrollTop', duration || 400, cosParameter, setter.bind(this, startVal, target));
            });
        };
    
        this.animateTop = function (target, duration) {
            var scope = this;
            var completeCallback = function (target, el) {
                (0, _sxQuery2.default)(el).css("top", target);
            }.bind(this, target);
            var setter = function setter(startVal, trgt, el, nVal) {
                var val;
                if (trgt >= startVal) {
                    //FIXME: will work only for our use-case - 0 to negative and negative to 0
                    val = nVal;
                    if (startVal < 0) {
                        val *= -1;
                    }
                } else {
                    if (trgt < 0) {
                        val = trgt + nVal;
                    } else {
                        val = nVal + startVal;
                    }
                }
                (0, _sxQuery2.default)(el).css("top", val + "px");
            };
            this._it(function (el) {
                _sxQuery2.default._clearAnimation(el, 'positionTop');
                if (duration == 0 || _sxQuery2.default.prefersReducedMotion()) {
                    completeCallback(el);
                    return;
                }
                var $el = (0, _sxQuery2.default)(el);
                var crnt = parseFloat($el.css("top"));
                var isInPercent = target.indexOf("%") !== 0;
                var trgt;
                if (isInPercent) {
                    var parentHeight;
                    var position = $el.css("position");
                    if (position == "fixed") {
                        parentHeight = window.innerHeight;
                    } else {
                        parentHeight = parseFloat($el.parent().css("height"));
                    }
                    var multiplier = parseFloat(target) / 100;
                    trgt = multiplier * parentHeight;
                } else {
                    trgt = parseFloat(target);
                }
                var range = Math.abs(crnt - trgt);
                var cosParameter = range / 2;
                scope._animate(el, 'positionTop', duration || 400, cosParameter, setter.bind(this, crnt, trgt), completeCallback);
            });
        };
    
        //highlighting function
        this.highlight = function (pat, className) {
            function innerHighlight(node, pat) {
                if ((0, _sxQuery2.default)(node).parents('.' + className).length !== 0) {
                    return 1;
                }
                var skip = 0;
                if (node.nodeType == 3) {
                    var pos = node.data.toUpperCase().indexOf(pat);
                    pos -= node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length;
                    if (pos >= 0) {
                        var spannode = document.createElement('span');
                        spannode.className = className;
                        var middlebit = node.splitText(pos);
                        var endbit = middlebit.splitText(pat.length); //  don't delete this line!
                        var middleclone = middlebit.cloneNode(true);
                        spannode.appendChild(middleclone);
                        middlebit.parentNode.replaceChild(spannode, middlebit);
                        skip = 1;
                    }
                } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                    for (var i = 0; i < node.childNodes.length; ++i) {
                        i += innerHighlight(node.childNodes[i], pat);
                    }
                }
                return skip;
            }
    
            return this.length && pat && pat.length && pat.length > 2 ? this._it(function (elem) {
                innerHighlight(elem, pat.toUpperCase());
            }) : this;
        };
    };
    
    exports.default = SxQueryObject;
    
    /***/ }),
    
    /***/ 33:
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    var _sxQuery = __webpack_require__(0);
    
    var _sxQuery2 = _interopRequireDefault(_sxQuery);
    
    var _unibox = __webpack_require__(5);
    
    var _unibox2 = _interopRequireDefault(_unibox);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    (function (sxQuery) {
    
        sxQuery.fn.unibox = function (options) {
    
            options = options || {};
    
            var boxesArray = this.map(function (idx, searchBox) {
                searchBox = sxQuery(searchBox);
                var settings = sxQuery.extend({
                    // these are the defaults.
                    suggestUrl: '', // the URL where to get the search suggests
                    ivfImagePath: '', // the root path to the instant visual feedback images
                    ivfImageOffset: -80, // the vertical offset of the ivf images
                    missingErrorImage: undefined, // if an image is missing, hide it (undefined) or show a placeholder image
                    queryVisualizationHeadline: '', // the headline of the query visualization
                    highlight: true, // whether the search words should be highlighted in the results
                    throttleTime: 50, // the number of ms before the update of the search box is triggered
                    animationSpeed: 300, // general animation speed
                    instantVisualFeedback: 'all', // where to show the ivf
                    showOnMobile: true, // whether to show search suggestions on mobile devices
                    callbacks: {
                        enter: undefined, // the callback to trigger after 'enter' press or search button click (when no suggestion is selected) - args(query, searchButton [optional], hideSpecialCallback [optional])
                        enterResult: undefined, // the callback to trigger after 'enter' press or click on selected suggestion - args(query, href, hasCtrlModifier [optional])
                        type: undefined, // the callback to trigger after search box value changes - args(event, query)
                        focus: undefined, // the callback to trigger after search box is focused - args(event, query)
                        blur: undefined, // the callback to trigger after search box is abandoned - args(event, query)
                        line: undefined, // the callback to trigger after suggest line is built - args(lineString, key, index, suggest)
                        suggestsBuilt: undefined, // the callback to trigger after all suggestions are built - args(suggestBox, data)
                        preSuggest: undefined, // the callback to trigger before suggestions are fetched, return 'false' to interrupt the process  - args(query, searchBox)
                        suggestChange: undefined // the callback to trigger after the suggestion set is changed - args(isSuggestBoxVisible)
                    },
                    trackingCallbacks: {
                        abandon: undefined, // a tracking callback, called after the search box is abandoned - args(query, visible suggestionCount, searchBox)
                        select: undefined, // a tracking callback, called after a suggestion is selected - args(searchBox, suggestBox, target, query, suggestions, position, link)
                        show: undefined, // a tracking callback, called after a suggestion set is shown - args(searchBox, suggestBox, aSuggestion, query, suggestions)
                        change: undefined // a tracking callback, called after a search box value is changed - args(searchBox)
                    },
                    placeholder: undefined, // the placeholder for the input field
                    extraHtml: undefined, // extra HTML code that is shown in each search suggest
                    dataPoints: undefined, // extra HTML code by key, overrides extraHtml, e.g. {price: {html: '<span>#price# $</span>', position: 1}, category: {html: '<b>#category#</b>', position: 2}}
                    noSuggests: undefined, // the content to show when no suggests are available, if undefined, no suggests will be shown
                    emptyQuerySuggests: undefined, // empty query suggests, if someone clicks in the search field, we can show suggests
                    minChars: 3, // the minimum input before the suggest pops up
                    maxWidth: 'auto', // the maximum width of the suggest box, default: as wide as the input box
                    showDeleteAllButton: false, // show 'delete all' (x) button when focus hits back to input field
                    showImagesSuggestions: true, // whether to show images
                    disableEventPropagationHtml: true, // disable click event propagation to HTML element
                    suggestOrder: [], // sort suggests by this array, if empty, use given array order
                    suggestSelectionOrder: [], // move through selectables by this cluster order. if empty, use naturally given order by selectables
                    viewAllLabel: undefined, // label of the 'View All' button, if undefined no 'View All' button will be shown at the bottom of suggestion list
                    loaderSelector: undefined, // the loader element selector
                    viewKeyMappings: undefined, // mapping of suggestion group key to view key
                    themeColor: '#1C5D7D', // theme color, used for magnifier icon when using 'View All' button
                    enabled: true, // whether suggestions should be shown
                    specialMobileSuggest: {
                        enabled: false, // whether to show fullscreen search box + suggest box on search field focus when the viewport width is below specified breakpoint, default: false
                        breakpoint: 768, // the maximum width of device, where special mobile suggestion should be shown, default: 768 px
                        placeholder: undefined, // html/string to be shown when there are no suggest results in special mobile suggest box
                        customTopHtml: undefined, // html/string to be shown at the top of the page when special mobile suggests are visible
                        searchBoxPlaceholder: undefined, // the placeholder to show in mobile suggestion search box
                        animateTransitions: true, // whether to animate transition into special mobile suggestions
                        resizeSearchBoxOnScroll: true, // whether to resize mobile special input block (search field + icons) on special mobile suggest box scroll
                        trigger: undefined, // selector for special mobile suggest trigger, if the trigger is clicked, the fullscreen suggestion layer will be shown
                        autoHide: true, // whether to hide the mobile layer automatically on search submission, if set to false, the enterCallback becomes a hideLayer callback as 3rd parameter, which has to be called in order to hide the mobile suggestions
                        hiddenCallback: undefined // a callback that is called after the special mobile suggestions have been hidden
                    },
                    accessibility: {
                        headingLevel: 2, // the level of search suggestion heading
                        searchFieldLabel: "Search", // the invisible label of the input fields
                        srSuggestionsHiddenText: "Search suggestions are hidden", // text to announce @screen reader when search suggestions were hidden
                        srNoSuggestionsText: 'No search suggestions', // text to announce @screen reader if no suggestions are available
                        srSuggestionsCountText: '#COUNT# search suggestions shown', // text to announce @screen reader after search suggestions have been shown, #COUNT# will be replaced with the suggestion count
                        srOneSuggestionText: 'One search suggestion shown', // text to announce @screen reader after search suggestions have been shown
                        srSuggestBoxControlDescription: 'Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.' // text to announce @screen reader after search input is focused - describes keyboard controls
                    },
                    searchBoxContainer: searchBox.parent() // the search box's parent
                }, options);
                var individualUnibox = new _unibox2.default();
                individualUnibox.init(searchBox, settings);
                return individualUnibox;
            });
            if (boxesArray.length == 1) {
                return boxesArray[0];
            }
    
            return boxesArray;
        };
    })(_sxQuery2.default);
    
    window.sxQuery = _sxQuery2.default;
    
    /***/ }),
    
    /***/ 4:
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var SvgMagnifierIcon = {
        ICON: '<svg xmlns="http://www.w3.org/2000/svg" fill="#FILL#" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>'
    };
    
    exports.default = SvgMagnifierIcon;
    
    /***/ }),
    
    /***/ 5:
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    
    var _sxQuery = __webpack_require__(0);
    
    var _sxQuery2 = _interopRequireDefault(_sxQuery);
    
    var _SvgMagnifierIcon = __webpack_require__(4);
    
    var _SvgMagnifierIcon2 = _interopRequireDefault(_SvgMagnifierIcon);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var UniBox = function UniBox() {
        //// common vars
    
        // index of selected entry
        var selectedEntryIndex = -1;
    
        // the search box
        var searchBox;
    
        // the search box's parent
        var searchBoxParent;
    
        // the suggest box
        var suggestBox;
    
        // the URL where to get the search suggests
        var suggestUrl = '';
    
        // the root path to the instant visual feedback images
        var ivfImagePath = '';
    
        // the vertical offset of the ivf images
        var ivfImageOffset = -80;
    
        // if an image is missing, hide it (undefined) or show a placeholder image
        var missingErrorImage;
    
        // the number of ms before the update of the search box is triggered
        var throttleTime;
    
        // the list of all selectable divs
        var selectables = [];
    
        // whether the search words should be highlighted in the results
        var highlight = true;
    
        // extra HTML code that is shown in each search suggest
        var extraHtml;
    
        // extra HTML code by key, overrides extraHtml
        var dataPoints;
    
        // callback function to run code on each suggest line, parameters are lineCallback(currentLineString, index, suggestObject)
        var lineCallback;
    
        // general animation speed
        var animationSpeed = 300;
    
        // the headline of the query visualization
        var queryVisualizationHeadline = '';
    
        // the minimum input before the suggest pops up
        var minChars = 2;
    
        // the action that should happen if enter is pressed, takes three arguments - query, the pressed search button and function which hides the mobile suggestions
        var enterCallback;
    
        // the action that should happen if enter is pressed when a suggest result is selected
        var enterCallbackResult;
    
        // the action that should happen after each registered key stroke in the search field (other than enter)
        var typeCallback;
    
        // a callback for on focus events on the search box
        var focusCallback;
    
        // a callback for on blur events on the search box
        var blurCallback;

        // a callback when the search has started
        var loadingCallback;

        // a callback when the search has finished
        var loadedCallback;
    
        // a callback called after the suggestion block is built (and not rendered yet), takes the suggestion box and server response as arguments
        var suggestsBuiltCallback;
    
        // a mapping of callback type to certain callback intended for external tracking (callback types: 'select', 'show', 'abandon')
        var trackingCallbacks;
    
        // the placeholder for the input field
        var placeholder;
    
        // the words that were highlighted above the search bar
        var ivfWords = [];
    
        // where to show the ivf
        var instantVisualFeedback = 'all';
    
        // remember the last key stroke to avoid showing the suggests after enter
        var lastKeyCode = -1;
    
        // remember the last data object we got from the server in case we need to reuse it
        var lastData = undefined;
    
        // remember the last input, this is important because requests are asynchronous,
        // if we search for "sam" (takes 2 seconds) and then keep typing to search for "samsonite" (takes 1 second) the
        // results for the previous input will come in later and replace the results for "samsonite"
        var currentInput = "";
    
        // show 'delete all' (x) button when focus hits back to input field
        var showDeleteAllButton = false;
    
        // sort suggests by this array, if empty, use given array order
        var suggestOrder = [];
    
        // move through selectables by this cluster order. if empty, use naturally given order by selectables
        var suggestSelectionOrder = [];
    
        // the maximum width of the suggest box, default: as wide as the input box
        var maxWidth = undefined;
    
        // the content to show when no suggests are available, if undefined, no suggests will be shown
        var noSuggests = undefined;
    
        // whether to show images
        var showImagesSuggestions = true;
    
        // empty query suggests, if someone clicks in the search field, we can show suggests
        var emptyQuerySuggests = undefined;
    
        // the content to show if there exist another more complete search page
        var showMoreResults = undefined;
    
        // disable click event propagation to HTML element
        var disableEventPropagationHtml = true;
    
        // whether to show fullscreen search box + suggest box on search field focus when the viewport width is below specified breakpoint, default: false
        var useSpecialMobileSuggest = undefined;
    
        // the maximum width of device, where special mobile suggestion should be shown, default: 768
        var specialMobileSuggestBreakpoint = undefined;
    
        // html/string to be shown when there are no suggest results in special mobile suggest box
        var specialMobileSuggestPlaceholder = undefined;
    
        // special search box placeholder text
        var specialMobileSearchBoxPlaceholder = undefined;
    
        // html/string to be shown at the top of the page when special mobile suggests are visible
        var specialMobileSuggestLogoTemplate = undefined;
    
        // whether to animate transition into special mobile suggestions
        var animateSpecialMobileSuggestTransitions = undefined;
    
        // whether to resize mobile special input block (search field + icons) on special mobile suggest box scroll
        var resizeSpecialMobileSuggestOnScroll = undefined;
    
        // whether to hide the mobile layer automatically on search submission, if set to false, the enterCallback becomes a hideLayer callback as 3rd parameter, which has to be called in order to hide the mobile suggestions
        var autoHideSpecialMobileSuggest = true;
    
        // a callback that is called after the special mobile suggestions have been hidden
        var specialMobileHiddenCallback = undefined;
    
        // holds default special unibox values relevant for scrolling behavior (initialized when unibox special is shown by getting css properties)
        var specialScrollSettings = {};
    
        // whether to keep searchSuggestions on focus out (intended to keep suggestions open on longer selectable click)
        var keepSuggests = false;
    
        // callback to trigger after suggestion set is changed
        var suggestChangeCallback = undefined;
    
        // markup for heading element
        var headingElement = "h4";
    
        // label for search field
        var searchFieldLabel = "";
    
        // Apple iOS bug: no keyCode in keyup event, we save it here on keyDown event
        var savedKeyCodeOnKeyDown = undefined;
    
        // text to announce @screenreader after search suggestions have been hidden
        var srSuggestionsHiddenText = "Search suggestions are hidden";
        // text to announce @screenreader if no suggestions are available
        var srNoSuggestionsText = "No search suggestions";
        // text to announce @screenreader after search suggestions have been shown
        var srSuggestionsCountText = "#COUNT# search suggestions shown";
        // text to announce @screenreader after search suggestion have been shown
        var srOneSuggestionText = "#COUNT# search suggestion shown";
        // text to announce @screenreader after search input is focused - describes controls
        var srSuggestBoxControlDescription = "Use up and down arrows to select available result. Press enter to go to selected search result. Touch devices users can use touch and swipe gestures.";
    
        // callback to trigger before search suggests are fetched
        var preSuggestCallback = undefined;
    
        // label of the 'View All' button
        var viewAllLabel = undefined;
    
        // whether to show suggestions @767px and smaller
        var showOnMobile = true;
    
        // the loader selector
        var loaderSelector = undefined;
    
        // mapping of suggestion group key to view key
        var viewKeyMappings = undefined;
    
        // theme color, used for magnifier icon when using 'View All' button
        var themeColor = undefined;
    
        var isEnabled = true;
    
        // selector for special mobile suggest trigger
        var specialMobileTrigger = undefined;
    
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
    
        // hide the search suggests
        function resetSuggests(event) {
            event = event || window.event;
    
            if (event !== undefined) {
                var keyCode = event.keyCode || event.which;
                if (keyCode !== undefined && keyCode === 0 && savedKeyCodeOnKeyDown !== undefined) {
                    keyCode = savedKeyCodeOnKeyDown;
                    savedKeyCodeOnKeyDown = undefined;
                }
                var inputText = getSearchBox().val();
    
                // hide if tab, escape, or enter was pressed
                if (keyCode === 27 || keyCode === 13 || keyCode === 9 || inputText.length < minChars && emptyQuerySuggests === undefined) {
                    hideSuggests(event);
    
                    if (keyCode === 13 && enterCallback !== undefined && selectedEntryIndex === -1) {
                        if (shouldUseSpecialSuggestBox() && loaderSelector !== undefined && autoHideSpecialMobileSuggest === false) {
                            (0, _sxQuery2.default)(loaderSelector).css("z-index", "9999999");
                        }
                        enterCallback.call(this, inputText, undefined, shouldUseSpecialSuggestBox() && autoHideSpecialMobileSuggest === false ? function () {
                            hideSpecialSuggest();
                            if (loaderSelector !== undefined) {
                                (0, _sxQuery2.default)(loaderSelector).css("z-index", "");
                            }
                        } : undefined);
                        if (autoHideSpecialMobileSuggest !== false) {
                            hideSpecialSuggest();
                        }
                    }
                    selectedEntryIndex = -1;
                }
            } else {
                hideSuggests(event);
                selectedEntryIndex = -1;
            }
        }
    
        function hideSuggests(e) {
            var suggestBox = (0, _sxQuery2.default)("#unibox-suggest-box");
            if (isEnabled) {
                searchBox.attr("aria-expanded", "false");
                var statusElement = (0, _sxQuery2.default)("#unibox-status-message");
                var contentText = srSuggestionsHiddenText;
                if (statusElement.text() !== contentText) {
                    statusElement.text(contentText);
                }
                searchBox.removeAttribute("aria-activedescendant");
            }
            // only call blur callback here when suggest box was really shown
            if (blurCallback !== undefined && suggestBox.hasClass('uniboxActive')) {
                try {
                    blurCallback.call(this, e, searchBox.val(), false);
                } catch (ex) {
                    console.log(ex);
                }
            }
    
            suggestBox.removeClass('uniboxActive');
            if (!shouldUseSpecialSuggestBox()) {
                //do nothing for mobile suggest box
                suggestBox.slideUp(animationSpeed);
            }
            clearIvf();
        }
    
        function throttle(f, delay) {
            var timer = null;
            return function () {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = window.setTimeout(function () {
                    f.apply(context, args);
                }, delay || 50);
            };
        }
    
        // highlight search words
        function highlightSearchWords(string, searchString) {
            if (!highlight || string === undefined || searchString === undefined) {
                return string;
            }
            var words = searchString.replace(/[^a-zA-Z0-9äöüÄÖÜß]|\s+|\r?\n|\r/gmi, " ").replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, " ").split(' ');
    
            // sort words by length, longest first
            words.sort(function (a, b) {
                return b.length - a.length; // ASC -> a - b; DESC -> b - a
            });
    
            var markers = {};
            _sxQuery2.default.each(words, function (idx, word) {
                if (word.length < 1) {
                    return;
                }
                var matches = string.match(new RegExp("((" + word + ")(?!#<##|-\\d+#<##))(?!.*\\1)", 'gi'));
                if (matches != null) {
                    for (var i = 0; i < matches.length; i++) {
                        var match = matches[i];
                        var matchEsc = match.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        string = string.replace(new RegExp('(' + matchEsc + ')(?!#<##|-\\d+#<##)', 'g'), '##>#' + idx + "-" + i + '#<##');
                        markers['##>#' + idx + "-" + i + '#<##'] = '<span class="unibox-highlight">' + match + '</span>';
                    }
                }
            });
            var reversedMarkerKeys = Object.keys(markers).reverse();
            for (var i = 0; i < reversedMarkerKeys.length; i++) {
                var singleMarker = reversedMarkerKeys[i];
                var replacement = markers[singleMarker];
                string = string.replace(new RegExp(singleMarker, 'gi'), replacement);
            }
    
            return string;
        }
    
        function makeCssKey(key) {
            return key.replace(/[ "§$%&/(){}+*,.;|]/g, '_').toLowerCase();
        }
    
        function escapeHtml(string) {
            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
    
        // update suggest box when new data is given
        function updateSuggestBox(data) {
    
            var suggestBox = getSuggestBox();
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
    
            // don't do anything if the last key was enter
            if (lastKeyCode === 13 || data === undefined || !data.hasOwnProperty('suggests')) {
                resetSuggests();
                return;
            }
    
            var searchString = getSearchBox().val();
            var searchStringXss = escapeHtml(searchString);
    
            //// fill the box
            suggestBox.html('');
            (0, _sxQuery2.default)("#unibox-suggest-box-special").html('');
    
            // find out whether we have something to show in the first place
            var showSuggestBox = false;
            if (!showOnMobile && _sxQuery2.default.matchesMediaQuery("max", 767)) {
                return;
            }
    
            // set state if no suggestions notice is visible
            var showNoSuggestions = false;
    
            // suggest
            var suggestOrderToUse = Object.keys(data['suggests']);
            if (suggestOrder && suggestOrder.length > 0) {
                suggestOrderToUse = suggestOrder;
                _sxQuery2.default.each(Object.keys(data['suggests']), function (i, o) {
                    if (_sxQuery2.default.inArray(o, suggestOrderToUse) < 0) suggestOrderToUse.push(o);
                });
            }
    
            var totalCount = 0;
            if (shouldUseSpecialSuggestBox()) {
                specialSearchBox.removeAttribute("aria-activedescendant");
            } else {
                searchBox.removeAttribute("aria-activedescendant");
            }
            _sxQuery2.default.each(suggestOrderToUse, function (idx, key) {
                var values = data['suggests'][key];
                if (!values || values.length === 0) {
                    return true;
                }
    
                // check if other arrays have content, if this suggestion-block is the only one, mark it via css class
                var countOtherSuggestionValues = 0;
                _sxQuery2.default.each(suggestOrderToUse, function (idx, sKey) {
                    var values = data['suggests'][sKey];
                    if (!values || key === sKey || values.length === 0) {
                        return true;
                    }
                    countOtherSuggestionValues += values.length;
                });
    
                var cssKey = makeCssKey(key);
                var labelledBy = "";
                if (cssKey != "_") {
                    labelledBy = 'aria-labelledby="unibox-suggest-cluster-heading-' + cssKey + '"';
                }
                var suggestSet = (0, _sxQuery2.default)('<section class="unibox-suggest-cluster unibox-suggest-' + cssKey + ' ' + ('unibox-' + values.length + '-entries') + ' ' + (countOtherSuggestionValues === 0 ? 'unibox-single-suggestion-block' : '') + '" ' + labelledBy + '></section>');
    
                if (key.replace(/_/, '').length > 0 && values.length > 0) {
                    var visibleKey = key;
                    if (visibleKey in viewKeyMappings) {
                        visibleKey = viewKeyMappings[visibleKey];
                        if (visibleKey === undefined) {
                            visibleKey = '';
                        }
                    }
    
                    if (visibleKey.length > 0) {
                        var keyNode = (0, _sxQuery2.default)('<' + headingElement + ' class="unibox-suggest-heading" id="unibox-suggest-cluster-heading-' + cssKey + '">' + visibleKey + '</' + headingElement + '>');
                        suggestSet.append(keyNode);
                    }
                }
    
                _sxQuery2.default.each(values, function (index, suggest) {
    
                    var suggestLine = '<div class="unibox-selectable" aria-selected="false" role="option">';
    
                    if (suggest['image'] !== undefined && suggest['image'] !== null && showImagesSuggestions) {
                        var imageUrl = suggest['image'].length === 0 && missingErrorImage ? missingErrorImage : suggest['image'].length === 0 || suggest['image'].indexOf("/") === 0 || suggest['image'].indexOf("http") === 0 ? suggest['image'] : ivfImagePath + suggest['image'];
    
                        suggestLine += '<div class="unibox-selectable-img-container"><img src="' + imageUrl + '"';
                        var img = new Image();
                        img.src = imageUrl;
                        if (!img.complete) {
                            suggestLine += ' style="display: none;" onload="this.style.display=null;"';
                        }
                        suggestLine += ' alt aria-hidden="true" role="presentation"/></div>';
                    }
    
                    if (suggest['link'] != undefined && suggest['link'] != '') {
                        suggestLine += '<a class="uniboxSearchContent" href="' + suggest['link'] + '">';
                        suggestLine += highlightSearchWords(suggest['name'], searchStringXss);
                        suggestLine += '</a>';
                    } else if (suggest['name'] != undefined && suggest['name'] != '') {
                        suggestLine += '<span class="uniboxSearchContent">' + highlightSearchWords(suggest['name'], searchStringXss) + '</span>';
                    }
    
                    if (suggest['content'] != undefined && suggest['content'] != '') {
                        suggestLine += '<p class="unibox-result-content">' + highlightSearchWords(suggest['content'], searchStringXss) + '</p>';
                    }
    
                    if (suggest['suggestionHtml'] != undefined && suggest['suggestionHtml'] != '') {
                        suggestLine += '<span class="uniboxSearchContent">' + suggest['suggestionHtml'] + '</span>';
                    } else if (suggest['html'] != undefined) {
                        // no suggestionHtml but only HTML -> we don't show this empty result line
                        return;
                    }
    
                    var missedMatch = false;
                    var extraHtmlFilled = undefined;
                    var templateLineCallback = function templateLineCallback(template) {
                        if (template === undefined || template.length === 0) {
                            return '';
                        }
                        var matches = template.match(/#(.*?)#/gi);
                        if (matches !== null) {
                            for (var i = 0; i < matches.length; i++) {
                                var match = matches[i];
                                if (match === undefined || match.length === 0) {
                                    continue;
                                }
                                var variable = match.replace(/#/g, '');
                                var replacement = undefined;
    
                                for (var d = 0; d < suggest['dataPoints'].length; d++) {
                                    var dpo = suggest['dataPoints'][d];
                                    if (dpo.key == variable) {
                                        replacement = dpo.value;
                                        break;
                                    }
                                }
                                if (replacement === undefined) {
                                    missedMatch = true;
                                    continue;
                                }
                                var re = new RegExp(match, 'g');
                                template = template.replace(re, replacement);
                            }
                        }
                        return template;
                    };
    
                    if (dataPoints !== undefined) {
                        var usedKeys = [];
                        var filledByKey = suggest['dataPoints'].reduce(function (acc, dataPoint) {
                            if (dataPoints[dataPoint.key] !== undefined) {
                                acc[dataPoint.key] = templateLineCallback(dataPoints[dataPoint.key].html);
                                usedKeys.push(dataPoint.key);
                            }
                            return acc;
                        }, {});
                        extraHtmlFilled = usedKeys.sort(function (a, b) {
                            var posA = dataPoints[a].position !== undefined ? parseInt(dataPoints[a].position) : -1;
                            var posB = dataPoints[b].position !== undefined ? parseInt(dataPoints[b].position) : -1;
                            if (posA === posB) {
                                return 0;
                            }
                            if (posA === -1) {
                                return 1;
                            }
                            if (posB === -1) {
                                return -1;
                            }
                            return posA - posB;
                        }).reduce(function (acc, key) {
                            acc.push(filledByKey[key]);
                            return acc;
                        }, []).join('');
                    } else if (extraHtml != undefined) {
                        var matches = extraHtml.match(/#(.*?)#/gi);
                        if (matches != null) {
                            extraHtmlFilled = templateLineCallback(extraHtml);
                        }
                    }
                    if (extraHtmlFilled !== undefined) {
                        if (missedMatch) {
                            extraHtmlFilled = extraHtmlFilled.replace(/#(.*?)#/gi, "");
                        }
                        suggestLine += '<div class="unibox-extra">' + extraHtmlFilled + '</div>';
                    }
    
                    suggestLine += '<div class="unibox-ca"></div></div>';
    
                    if (lineCallback !== undefined) {
                        suggestLine = lineCallback.call(this, suggestLine, key, index, suggest);
                    }
    
                    var suggestNode = (0, _sxQuery2.default)(suggestLine);
                    suggestSet.append(suggestNode);
                    showSuggestBox = true;
                    totalCount++;
                });
    
                getSuggestBox().append(suggestSet);
            });
            //accessibility extension
            var statusText = srNoSuggestionsText;
            if (totalCount > 0) {
                if (viewAllLabel !== undefined && !shouldUseSpecialSuggestBox()) {
                    var showAllButton = (0, _sxQuery2.default)("<button class='unibox-show-all unibox-selectable'><span>" + viewAllLabel + "</span><i>" + _SvgMagnifierIcon2.default.ICON.replace(/#FILL#/g, themeColor).replace('width="24"', 'width="16"').replace('height="24"', 'height="16"') + "</i></button>");
                    showAllButton.on("click", function (e) {
                        console.log(showAllButton.get()[0]);
                        enterCallback.call(this, getSearchBox().val(), showAllButton.get()[0]);
                    });
    
                    getSuggestBox().append(showAllButton);
                }
                statusText = (totalCount > 1 ? srSuggestionsCountText : srOneSuggestionText).split("#COUNT#").join(totalCount);
            }
            var statusElement = (0, _sxQuery2.default)("#unibox-status-message");
            if (statusElement.text() !== statusText) {
                statusElement.text(statusText);
            }
    
            if (suggestsBuiltCallback !== undefined && typeof suggestsBuiltCallback == "function") {
                suggestsBuiltCallback(suggestBox, data);
            }
    
            //// update selectables for cursor navigation, use given order
            var selectablesScope = shouldUseSpecialSuggestBox() ? (0, _sxQuery2.default)("#unibox-special") : searchBoxParent;
            selectables = selectablesScope.find('.unibox-selectable');
            if (suggestSelectionOrder && suggestSelectionOrder.length > 0) {
                selectables = [];
                _sxQuery2.default.each(suggestSelectionOrder, function (idx, item) {
                    selectables = selectables.concat(selectablesScope.find('.unibox-suggest-' + makeCssKey(item) + ':first .unibox-selectable').get());
                });
                _sxQuery2.default.each(_sxQuery2.default.grep(Object.keys(data.suggests), function (elem) {
                    if (suggestSelectionOrder.indexOf(elem) < 0) return true;
                }), function (idx, item) {
                    selectables = selectables.concat(selectablesScope.find('.unibox-suggest-' + makeCssKey(item) + ':first .unibox-selectable').get());
                });
            }
            selectedEntryIndex = -1;
    
            // click handler on selectables
            (0, _sxQuery2.default)(selectables).click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var prevVal = getSearchBox().val();
                var q = (0, _sxQuery2.default)(this).find('.uniboxSearchContent:first').text();
                var isShowAllButton = viewAllLabel !== undefined && ((0, _sxQuery2.default)(e.target).hasClass("unibox-show-all") || (0, _sxQuery2.default)(e.target).parents(".unibox-show-all").length !== 0);
                if (!isShowAllButton) {
                    getSearchBox().val(q);
                }
                var href = undefined;
                try {
                    href = (0, _sxQuery2.default)(this).find('a:first').attr('href');
                } catch (e) {}
                if (enterCallbackResult != undefined && !isShowAllButton) {
                    try {
                        if (trackingCallbacks['select'] !== undefined) {
                            var sugBox = getSuggestBox();
                            var sField = getSearchBox();
                            var items = getSuggestBox().find(".unibox-selectable");
                            trackingCallbacks['select'](sField.get()[0], sugBox.get()[0], e.target, prevVal, items, _sxQuery2.default.indexInNodeList(this, items.get()) + 1, href);
                        }
                        enterCallbackResult.call(this, q, href, e.ctrlKey);
                    } catch (ex) {
                        console.log(ex);
                    }
                }
                if (!e.ctrlKey) {
                    resetSuggests();
                    hideSuggests(e);
                    hideSpecialSuggest();
                }
            });
    
            //Don't hide suggests on long click
            selectables.mousedown(function (e) {
                keepSuggests = true;
            });
    
            selectables.mouseup(function (e) {
                keepSuggests = false;
            });
    
            // click handler on selectables
            searchBoxParent.find('.unibox-selectable .unibox-extra').click(function (event) {
                event.stopPropagation();
            });
    
            if (data['words'] != undefined && !shouldUseSpecialSuggestBox()) {
    
                // trigger words / visualization
                if (data['words'].length > 0 && queryVisualizationHeadline.length > 0 && (instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom')) {
                    suggestBox.append('<' + headingElement + '>' + queryVisualizationHeadline + '</' + headingElement + '>');
                    showSuggestBox = true;
                }
    
                var newIvfWords = [];
    
                _sxQuery2.default.each(data['words'], function (key, word) {
    
                    if (instantVisualFeedback == 'all' || instantVisualFeedback == 'bottom') {
                        if (word['overlayImage'] != undefined && word['overlayImage'] != null && word['overlayImage'].length > 0) {
                            suggestBox.append('<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' + ivfImagePath + word['overlayImage'] + '" style="background-image: url(\'' + ivfImagePath + word['image'] + '\');background-size: 75%;background-repeat: no-repeat;background-position: center;">');
                        } else if (word['image'] != undefined && word['image'] != null && word['image'].length > 0) {
                            suggestBox.append('<img  alt aria-hidden="true" role="presentation" class="unibox-vis" src="' + ivfImagePath + word['image'] + '">');
                        }
                    }
    
                    var invisibleBox = searchBoxParent.find('#unibox-invisible');
                    invisibleBox.css('padding', searchBox.css('padding'));
                    invisibleBox.html(searchStringXss.replace(new RegExp(word['name'], 'gi'), '<span>' + word['name'] + '</span>'));
    
                    // show visuals above search bar
                    if ((instantVisualFeedback == 'all' || instantVisualFeedback == 'top') && _sxQuery2.default.inArray(word['image'], ivfWords) == -1) {
    
                        var span = searchBoxParent.find('#unibox-invisible span')[0];
                        if (span != undefined && word['name'].length > 0 && word['image'] != undefined && word['image'] != null && word['image'].length > 0) {
                            var posLeft = (0, _sxQuery2.default)(span).position().left;
    
                            var visImage = (0, _sxQuery2.default)('<div class="unibox-ivf"><img  alt aria-hidden="true" role="presentation" src="' + ivfImagePath + word['image'] + '" alt="' + word['name'] + '"></div>');
                            visImage.css('left', getSearchBoxOffset().left + posLeft - 10);
                            visImage.css('top', getSearchBoxOffset().top - searchBox.outerHeight() + ivfImageOffset);
                            //searchBoxParent.find('#unibox').append(visImage);
                            searchBoxParent.append(visImage);
                            setTimeout(function () {
                                searchBoxParent.find('.unibox-ivf').find('img').addClass('l');
                            }, 10);
    
                            //visImage.find('img').addClass('l');
                            newIvfWords.push(word['image']);
                        }
                    } else if (_sxQuery2.default.inArray(word['image'], ivfWords) > -1) {
                        newIvfWords.push(word['image']);
                    }
                });
    
                ivfWords = newIvfWords;
            }
    
            if (!suggestionsBelow() && !shouldUseSpecialSuggestBox()) {
                // remove images if suggestion box is on top (otherwise slow loading images move the box down and it covers the search box)
                getSuggestBox().find("img").remove();
            } else {
                // hide broken images
                _sxQuery2.default.each(getSuggestBox().find("img").get(), function (i, item) {
                    var src = item.src;
                    var image = new Image();
                    image.onerror = function () {
                        (0, _sxQuery2.default)(item).hide();
                    };
                    image.src = src;
                });
            }
    
            //// position it
            resizeAndReposition();
    
            if (noSuggests != undefined && !showSuggestBox) {
                showSuggestBox = true;
                showNoSuggestions = true;
                suggestBox.append(noSuggests);
            }
    
            var trackSuggestShown = function trackSuggestShown() {
                if (trackingCallbacks['show'] !== undefined) {
                    trackingCallbacks['show']((0, _sxQuery2.default)("#unibox-special-searchbox").hasClass("active") ? (0, _sxQuery2.default)("#unibox-special-searchbox").get()[0] : searchBox.get()[0], suggestBox.get()[0], suggestBox.find(".unibox-selectable").get()[0], searchString, suggestBox.find(".unibox-selectable"));
                }
            };
            //// show it
            if (showSuggestBox) {
                if (isEnabled) {
                    searchBox.attr("aria-expanded", "true");
                }
                // if already visible, just update position and set class
                if (suggestBox.isVisible()) {
                    suggestBox.addClass('uniboxActive');
                    //// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                    //suggestBox.css('left', getSearchBoxOffset().left);
                    //suggestBox.css('top', getSearchBoxOffset().top);
                    resizeAndReposition();
                } else {
                    if (!shouldUseSpecialSuggestBox()) {
                        //do nothing for mobile suggest box
                        if (suggestionsBelow()) {
                            // if suggestbox currently not visible, slide down
                            suggestBox.slideDown(animationSpeed, function () {
                                suggestBox.addClass('uniboxActive');
                                //// re-position it (in some cases the slide down moves the search box and the suggest box is not aligned anymore)
                                //suggestBox.css('left', getSearchBoxOffset().left);
                                //suggestBox.css('top', getSearchBoxOffset().top);
                                resizeAndReposition();
                                trackSuggestShown();
                            });
                        } else {
                            suggestBox.css('display', 'block');
                            suggestBox.addClass('uniboxActive');
                            resizeAndReposition();
                            trackSuggestShown();
                        }
                    }
                }
    
                if (shouldUseSpecialSuggestBox()) {
                    trackSuggestShown();
                }
    
                if (showMoreResults && !showNoSuggestions) {
                    suggestBox.append(showMoreResults);
                }
            } else {
                (0, _sxQuery2.default)("#unibox-status-message").text(srNoSuggestionsText);
                resetSuggests();
                showSpecialSuggestPlaceholder();
            }
            //// indicate suggestions changed
            if (suggestChangeCallback !== undefined && typeof suggestChangeCallback == "function") {
                suggestChangeCallback.call(this, showSuggestBox);
            }
        }
    
        function getSearchBoxOffset() {
            return {
                left: searchBox.offset().left - searchBoxParent.offset().left,
                top: searchBox.offset().top - searchBoxParent.offset().top + searchBox.outerHeight()
            };
        }
    
        function updateIvf() {
            var shownWords = searchBoxParent.find('.unibox-ivf img').map(function (el) {
                return (0, _sxQuery2.default)(el).attr('src');
            });
            for (var i = 0; i < shownWords.length; i++) {
                if (_sxQuery2.default.inArray(shownWords[i].replace(ivfImagePath, ''), ivfWords) == -1) {
                    searchBoxParent.find('.unibox-ivf:has(img[src*="' + shownWords[i] + '"])').remove();
                }
            }
        }
    
        function clearIvf() {
            ivfWords = [];
            searchBoxParent.find('.unibox-ivf').remove();
        }
    
        function scrollList(event) {
            savedKeyCodeOnKeyDown = event.keyCode || event.which;
    
            if (searchBox.val().length <= 1) {
                clearIvf();
            }
    
            if (trackingCallbacks['change']) {
                setTimeout(function () {
                    trackingCallbacks['change']((0, _sxQuery2.default)("#unibox-special-searchbox").hasClass("active") ? (0, _sxQuery2.default)("#unibox-special-searchbox").get()[0] : searchBox.get()[0]);
                }, 1);
            }
    
            if (typeCallback != undefined) {
                try {
                    typeCallback.call(this, event, searchBox.val());
                } catch (ex) {
                    console.log(ex);
                }
            }
    
            // return if NO arrow key is pressed
            if (event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40 && event.keyCode != 13) {
                updateIvf();
                return;
            }
    
            // if arrows are pressed move selected entry
            if (event.keyCode == 38 && selectedEntryIndex > 0) {
                // up key: move up one entry
                selectedEntryIndex--;
            } else if (event.keyCode == 40) {
                // down key: move up one entry
                selectedEntryIndex++;
            } else if (event.keyCode == 38 && selectedEntryIndex <= 0) {
                selectedEntryIndex = (selectedEntryIndex != -1 ? selectedEntryIndex - 1 : selectedEntryIndex) + selectables.length;
            } else if ((event.keyCode == 37 || event.keyCode == 39) && selectedEntryIndex > -1) {
                // left/right key: move left/up or right/down one content group if we are in the selected entries (selectedEntryIndex > -1)
                selectedEntryIndex = selectedEntryIndex % selectables.length;
                var currentSelection = (0, _sxQuery2.default)(selectables[selectedEntryIndex]);
                var currentCluster = currentSelection.closest('.unibox-suggest-cluster');
    
                var otherCluster;
    
                if (event.keyCode == 37) {
                    otherCluster = currentCluster.prev();
                } else if (event.keyCode == 39) {
                    otherCluster = currentCluster.next();
                }
    
                if (otherCluster.hasClass('unibox-suggest-cluster')) {
                    var firstSelectableInCluster = otherCluster.find('div.unibox-selectable')[0];
                    selectedEntryIndex = getSuggestBox().find("div.unibox-selectable").index(firstSelectableInCluster);
                }
            }
    
            // mark the selected selectable
            if (selectables.length > 0 && selectedEntryIndex > -1) {
                selectedEntryIndex = selectedEntryIndex % selectables.length;
                var $selectables = (0, _sxQuery2.default)(selectables);
                $selectables.removeClass("active");
                var selected = (0, _sxQuery2.default)(selectables[selectedEntryIndex]);
    
                selected.addClass('active');
    
                $selectables.attr("aria-selected", "false");
                $selectables.attr("id", "");
                selected.attr("id", "unibox-active");
                selected.attr("aria-selected", "true");
                if (selected.length > 0) {
                    var box = shouldUseSpecialSuggestBox() ? (0, _sxQuery2.default)("#unibox-special-searchbox") : searchBox;
                    box.attr("aria-activedescendant", "unibox-active");
                }
            }
    
            if (event.keyCode == 13) {
                event.preventDefault();
                event.stopPropagation();
    
                var selectablesScope = shouldUseSpecialSuggestBox() ? (0, _sxQuery2.default)("#unibox-special") : searchBoxParent;
                if (enterCallbackResult != undefined) {
                    var selectedText = getSearchBox().val();
                    var prevVal = selectedText;
                    var href = undefined;
                    if (selectedEntryIndex != -1) {
                        if (selectablesScope.find(".unibox-selectable.active.unibox-show-all").length > 0) {
                            enterCallback.call(this, selectedText, selectablesScope.find(".unibox-show-all").get()[0]);
                        } else {
                            selectedText = selectablesScope.find('.unibox-selectable.active .uniboxSearchContent:first').text();
                            getSearchBox().val(selectedText);
                            try {
                                href = (0, _sxQuery2.default)(selectablesScope.find('.unibox-selectable.active')[0]).find('a').attr('href');
                            } catch (e) {}
                            if (trackingCallbacks['select'] !== undefined) {
                                var sugBox = getSuggestBox();
                                var sField = getSearchBox();
                                var items = getSuggestBox().find(".unibox-selectable");
                                trackingCallbacks['select'](sField.get()[0], sugBox.get()[0], event.target, prevVal, items, _sxQuery2.default.indexInNodeList(this, items.get()), href);
                            }
                            try {
                                enterCallbackResult.call(this, selectedText, href);
                            } catch (ex) {
                                console.log(ex);
                            }
                        }
                    }
                } else if (selectedEntryIndex != -1) {
                    window.location.href = (0, _sxQuery2.default)(searchBoxParent.find('.unibox-selectable.active')[0]).find('a').attr('href');
                    hideSpecialSuggest();
                }
                return false;
            }
    
            if (selectedEntryIndex > -1) {
                event.preventDefault();
            }
        }
    
        // provide search suggests
        function searchSuggest(event) {
    
            // don't show suggests if alt + something is pressed
            if (lastKeyCode == 18) {
                lastKeyCode = event.keyCode;
                return;
            }
    
            lastKeyCode = event.keyCode;
    
            // if event keycode = -1 it means the box should just open, if we queried before, we do not need to update the box
            if (lastKeyCode == -1 && lastData != undefined) {
                updateSuggestBox(lastData);
                return;
            }
    
            // do nothing at ESC
            if (event.keyCode == 27) {
                return;
            }
    
            // scroll list when up or down is pressed
            if ((event.keyCode == 37 || event.keyCode == 39) && selectedEntryIndex > -1 || event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 9) {
                return;
            }
    
            var inputText = getSearchBox().val();
    
            if (lastKeyCode == 46 && inputText.length == 0) {
                clearIvf();
            }
    
            if (preSuggestCallback != undefined) {
                var keepGoing = true;
    
                try {
                    keepGoing = preSuggestCallback.call(this, inputText, searchBox.get()[0]);
                } catch (ex) {
                    console.log(ex);
                }
    
                if (!keepGoing) {
                    return;
                }
            }
    
            if (inputText.length >= minChars && suggestUrl != '' && (showOnMobile || _sxQuery2.default.matchesMediaQuery("min", 768))) {

                var self = this;
                if (loadingCallback) {
                    loadingCallback.call(self, event);
                }

                currentInput = inputText;
                var lInputText = inputText;
                _sxQuery2.default.ajax({
                    usedQuery: inputText,
                    url: suggestUrl + encodeURIComponent(inputText),
                    dataType: 'json',
                    success: function success(data) {
                        if (lInputText == currentInput) {
                            if (loadedCallback) {
                                loadedCallback.call(self, this, data);
                            }

                            updateSuggestBox(data);
                        }
                        lastData = data;
                    }
                });
            } else {
                showSpecialSuggestPlaceholder();
            }
        }
    
        // should we open to top or bottom?
        function suggestionsBelow() {
            var bb = searchBox[0].getBoundingClientRect();
            var vph = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var spaceAbove = bb.y || bb.top;
            var spaceBelow = vph - spaceAbove - bb.height;
    
            return spaceBelow >= spaceAbove;
        }
    
        // should we overflow to the right or to the left
        function suggestionsLeft(sbWidth) {
            var bb = searchBox[0].getBoundingClientRect();
            var w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            return (bb.x || bb.left) + sbWidth > w;
        }
    
        function resizeAndReposition() {
            var suggestBox = (0, _sxQuery2.default)('#unibox-suggest-box');
            var borderSize = (suggestBox.css('border-width') || "0px").replace('px', '');
            var minWidth = maxWidth == 'auto' || !parseInt(maxWidth) ? searchBox.outerWidth() - 2 * borderSize : maxWidth - 2 * borderSize;
            suggestBox.css('min-width', minWidth);
            var uniboxMaxWidth = undefined;
            if (maxWidth == 'auto' || !parseInt(maxWidth)) {
                uniboxMaxWidth = Math.max(275 - 2 * borderSize, searchBox.outerWidth() - 2 * borderSize);
            } else {
                uniboxMaxWidth = maxWidth - 2 * borderSize;
            }
            suggestBox.css('max-width', uniboxMaxWidth);
    
            if (suggestionsLeft(uniboxMaxWidth)) {
                var bb = searchBox[0].getBoundingClientRect();
                var r = (bb.x || bb.left) + bb.width;
                var l = r - uniboxMaxWidth;
                if (searchBox.parent().css("position") == "relative") {
                    var pBB = searchBox.parent()[0].getBoundingClientRect();
                    l -= pBB.x || pBB.left;
                    //would go out of the client? --> move to the right
                    var wo = (pBB.x || pBB.left) + l;
                    if (l < 0 && wo < 0) {
                        l -= wo;
                    }
                } else {
                    l = Math.max(0, l);
                }
                suggestBox.css('left', l);
            } else {
                suggestBox.css('left', getSearchBoxOffset().left);
            }
    
            if (suggestionsBelow()) {
                suggestBox.css('top', getSearchBoxOffset().top);
            } else {
                suggestBox.css('top', getSearchBoxOffset().top - suggestBox.outerHeight() - searchBox.outerHeight());
            }
    
            resizeSpecialSuggestBox();
        }
    
        // check whether special mobile suggest box should be used
        function shouldUseSpecialSuggestBox() {
            var matchesBreakpoint = _sxQuery2.default.matchesMediaQuery("max", specialMobileSuggestBreakpoint);
            var isSpecialActive = (0, _sxQuery2.default)("#unibox-special-searchbox").hasClass("active"); //check for active class to stay in context after window has been resized
            return useSpecialMobileSuggest && (matchesBreakpoint || isSpecialActive);
        }
    
        // special mobile suggestions bottom space
        function resizeSpecialSuggestBox() {
            var uniboxSpecial = (0, _sxQuery2.default)("#unibox-special");
            var specialSuggestBox = (0, _sxQuery2.default)("#unibox-suggest-box-special");
    
            if (uniboxSpecial && specialSuggestBox) {
                var uniboxLogoHeight = hasSpecialLogoTemplate() ? uniboxSpecial.find(".unibox-special-logo").height() : 0;
                var inputContainerHeight = uniboxSpecial.find(".input-container").height();
                var heightSum = uniboxLogoHeight + inputContainerHeight;
                var suggestHeight = "calc(100% - " + heightSum + "px)";
                specialSuggestBox.css("height", suggestHeight);
                specialSuggestBox.css("top", heightSum + "px");
            }
        }
    
        // get search box that is used as query input ('normal' x 'special' depending on useSpecialMobileSuggest setting and device width)
        function getSearchBox() {
            var uniboxSpecial = (0, _sxQuery2.default)("#unibox-special");
            if (shouldUseSpecialSuggestBox()) {
                if (!uniboxSpecial || uniboxSpecial.length === 0) {
                    initSpecialSuggestBox();
                }
                return (0, _sxQuery2.default)("#unibox-special-searchbox");
            }
            return searchBox;
        }
    
        // get suggest box that is used as suggestions holder ('normal' x 'special' depending on useSpecialMobileSuggest setting and device width)
        function getSuggestBox() {
            if (shouldUseSpecialSuggestBox()) {
                if ((0, _sxQuery2.default)("#unibox-suggest-box-special").length === 0) {
                    initSpecialSuggestBox();
                }
                return (0, _sxQuery2.default)("#unibox-suggest-box-special");
            }
            return (0, _sxQuery2.default)("#unibox-suggest-box");
        }
    
        // initialize DOM elements and callbacks for special mobile suggest box
        function initSpecialSuggestBox() {
            if (!useSpecialMobileSuggest || (0, _sxQuery2.default)("#unibox-suggest-box-special").length > 0) {
                return;
            }
            var currentQuery = searchBox.val();
    
            var inputFieldString = '<input type="search" id="unibox-special-searchbox" class="unibox-special-searchbox" value="' + currentQuery + '" ' + 'autocomplete="off" role="combobox" aria-describedby="unibox-controls-description" aria-owns="unibox-suggest-box-special"' + 'aria-expanded="false"/>';
            var specialSuggestBoxString = '<div id="unibox-suggest-box-special" class="unibox-special-box">' + specialMobileSuggestPlaceholder + '</div>';
            var searchButtonString = '<button id="unibox-mobile-search-btn" class="unibox-special-searchbutton unibox-special-icon" aria-label="Search"></button>';
            var closeButtonString = '<button class="unibox-special-close unibox-special-icon" aria-label="Close"></button>';
            var uniboxSpecial = (0, _sxQuery2.default)('<section role="search" id="unibox-special" style="display: none;"></section>');
    
            var inputContainer = (0, _sxQuery2.default)('<section class="input-container"></section>');
            if (searchFieldLabel) {
                var labelFieldString = "<label style='" + _sxQuery2.default.srOnlyCss + "' class='unibox-sr-only' for='unibox-special-searchbox'>" + searchFieldLabel + "</label>";
                inputContainer.append((0, _sxQuery2.default)(labelFieldString));
            }
            var closeButton = (0, _sxQuery2.default)(closeButtonString);
            inputContainer.append(closeButton);
    
            var specialSearchBox = (0, _sxQuery2.default)(inputFieldString);
            var placeholder = searchBox.attr("placeholder") || specialMobileSearchBoxPlaceholder;
            specialSearchBox.attr("placeholder", placeholder);
            inputContainer.append(specialSearchBox);
    
            var searchButton = (0, _sxQuery2.default)(searchButtonString);
            inputContainer.append(searchButton);
    
            var specialSuggestBox = (0, _sxQuery2.default)(specialSuggestBoxString);
    
            if (hasSpecialLogoTemplate()) {
                uniboxSpecial.append('<div class="unibox-special-logo">' + specialMobileSuggestLogoTemplate + '</div>');
            }
            uniboxSpecial.append(inputContainer);
            uniboxSpecial.append(specialSuggestBox);
    
            // prepend special mobile suggest box to body
            var body = (0, _sxQuery2.default)("body");
            body.prepend(uniboxSpecial);
            body.append('<div id="unibox-special-hidden-content" style="overflow: hidden;"></div>');
    
            // bind listeners
            specialSearchBox.keydown(throttle(searchSuggest, throttleTime));
            specialSearchBox.keydown(scrollList);
            // to update suggestions after search event is triggered (especially on delete button in input[type='search']
            specialSearchBox.on("search", function (e) {
                searchSuggest(e);
            });
    
            if (enterCallback) {
                searchButton.on("click", function () {
                    console.log("Special search button clicked");
                    var query = specialSearchBox.val() || "";
                    if (loaderSelector !== undefined && autoHideSpecialMobileSuggest === false) {
                        (0, _sxQuery2.default)(loaderSelector).css("z-index", "9999999");
                    }
                    enterCallback.call(this, query, searchButton.get()[0], autoHideSpecialMobileSuggest === false ? function () {
                        hideSpecialSuggest(function () {
                            if (loaderSelector !== undefined) {
                                (0, _sxQuery2.default)(loaderSelector).css("z-index", "");
                            }
                        });
                    } : undefined);
                    if (autoHideSpecialMobileSuggest !== false) {
                        console.log("Hiding from search button");
                        hideSpecialSuggest();
                    }
                });
            } else if (autoHideSpecialMobileSuggest !== false) {
                searchButton.on("click", hideSpecialSuggest);
            }
            specialSearchBox.keyup(resetSuggests);
            specialSearchBox.keyup(function (e) {
                var keyCode = e.keyCode || e.which;
                // hide on esc
                if (keyCode == 27) {
                    hideSpecialSuggest();
                }
            });
            closeButton.on("click", hideSpecialSuggest);
    
            // init scroll callback to resize the input container when user scrolls
            if (resizeSpecialMobileSuggestOnScroll) {
                // resize input elements on scroll
                specialSuggestBox.scroll(function (e) {
                    var scrollTop = e.target.scrollTop;
    
                    var resizeFactor = scrollTop / 100 / 2; //200px for complete transition
                    if (resizeFactor > 1 || resizeFactor < 0) {
                        return;
                    }
                    //simulate slightly smoother scroll feeling (especially for slow scroll)
                    resizeFactor = Math.log1p(resizeFactor);
                    var maxResizeFactorValue = Math.log1p(1);
                    resizeFactor *= 1 / maxResizeFactorValue;
                    resizeSpecialInputField(resizeFactor);
                    resizeSpecialSuggestBox();
                });
            }
    
            //element for transition animation
            if (animateSpecialMobileSuggestTransitions) {
                var animationDuration = parseFloat(animationSpeed);
                var existingBackground = (0, _sxQuery2.default)("#unibox-special-transition-background");
                var specialMobileSuggestAnimationElem = existingBackground.length > 0 ? existingBackground : (0, _sxQuery2.default)('<div id="unibox-special-transition-background" style="background: #fff; position: fixed; width: 100%; height: 100%; z-index: 1000001; left: 100%; top: 0; display: none;"></div>');
                specialMobileSuggestAnimationElem.css("transition", "transform " + animationDuration + "ms");
                if (existingBackground.length === 0) {
                    (0, _sxQuery2.default)("body").append(specialMobileSuggestAnimationElem);
                }
            }
        }
    
        function resizeSpecialInputField(resizeFactor) {
            //calculate new special search box height and font size
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
            var uniboxSpecial = (0, _sxQuery2.default)("#unibox-special");
    
            var maxHeight = specialScrollSettings.box.height;
            var fontSizeProportion = specialScrollSettings.box.fontSize / maxHeight;
            var minHeight = 32;
            var heightDif = maxHeight - minHeight;
            var effectiveHeightDif = heightDif * resizeFactor;
            var newHeight = Math.round(maxHeight - effectiveHeightDif);
            var newFontSize = Math.round(fontSizeProportion * newHeight);
            specialSearchBox.css("height", newHeight);
            specialSearchBox.css("font-size", newFontSize);
    
            //calculate icon dimension
            var maxWidthIcon = specialScrollSettings.icons.width;
            var maxHeightIcon = specialScrollSettings.icons.height;
            var minDimensionIcon = minHeight + 2;
            var widthDifIcon = maxWidthIcon - minDimensionIcon;
            var heightDifIcon = maxHeightIcon - minDimensionIcon;
            var effectiveWidthDifIcon = widthDifIcon * resizeFactor;
            var effectiveHeightDifIcon = heightDifIcon * resizeFactor;
            var newWidthIcon = Math.round(maxWidthIcon - effectiveWidthDifIcon);
            var newHeightIcon = Math.round(maxHeightIcon - effectiveHeightDifIcon);
            var icons = uniboxSpecial.find(".unibox-special-icon");
            icons.css("height", newHeightIcon);
            icons.css("width", newWidthIcon);
    
            //calculate new special search box width and margins
            var defaultMargin = specialScrollSettings.box.marginLeft;
            var newMargin = defaultMargin - (maxWidthIcon - newWidthIcon);
            var newWidht = "calc(100% - 2*" + newMargin + "px)";
            specialSearchBox.css("width", newWidht);
            specialSearchBox.css("margin-left", newMargin);
            specialSearchBox.css("margin-right", newMargin);
        }
    
        // show special mobile suggest box
        function showSpecialSuggest() {
            if (!useSpecialMobileSuggest) {
                return;
            }
            if (shouldPreventIosBounce()) {
                registerIosBouncePreventer();
            } else {}
            var uniboxSpecial = (0, _sxQuery2.default)("#unibox-special");
            if (!uniboxSpecial || uniboxSpecial.length === 0) {
                initSpecialSuggestBox();
                uniboxSpecial = (0, _sxQuery2.default)("#unibox-special");
            }
    
            //iPhone 5 fix
            uniboxSpecial.get()[0].scrollTop = 0;
    
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
            specialSearchBox.addClass("active");
            if (isEnabled) {
                specialSearchBox.attr("aria-expanded", "true");
            }
    
            if (specialSearchBox.val() == "") {
                (0, _sxQuery2.default)("#unibox-suggest-box-special").html("");
            }
    
            var resizeCallback = function resizeCallback() {
                uniboxSpecial.get()[0].scrollTop = 0;
                // fix layout if logo template is being shown
                var icons = uniboxSpecial.find(".unibox-special-icon");
                if (hasSpecialLogoTemplate()) {
                    var uniboxLogoHeight = uniboxSpecial.find(".unibox-special-logo").height();
                    var iconMarginTop = uniboxLogoHeight + parseFloat(specialSearchBox.css("margin-top") || "0");
                    icons.css("top", iconMarginTop);
                }
    
                // reset scroll behavior
                if (resizeSpecialMobileSuggestOnScroll) {
                    icons.css("width", "");
                    icons.css("height", "");
                    specialSearchBox.css("height", "");
                    specialSearchBox.css("width", "");
                    specialSearchBox.css("margin-left", "");
                    specialSearchBox.css("margin-right", "");
                    specialSearchBox.css("font-size", "");
                    (0, _sxQuery2.default)("#unibox-suggest-box-special").scrollTop(0);
    
                    // read and save initial scroll settings
                    specialScrollSettings.icons = {};
                    specialScrollSettings.icons.width = parseFloat(icons.css("width"));
                    specialScrollSettings.icons.height = parseFloat(icons.css("height"));
                    specialScrollSettings.box = {};
                    specialScrollSettings.box.height = parseFloat(specialSearchBox.css("height"));
                    specialScrollSettings.box.marginLeft = parseFloat(specialSearchBox.css("margin-left"));
                    specialScrollSettings.box.fontSize = parseFloat(specialSearchBox.css("font-size"));
                }
            };
    
            // hide all visible content except of suggestions
            var bodyElems = (0, _sxQuery2.default)("#unibox-special ~ *:not(#unibox-special-transition-background):not(#unibox-special-hidden-content):not(.unibox-sr-only)");
            bodyElems = bodyElems.filter(function (el) {
                return (0, _sxQuery2.default)(el).isVisible();
            });
            var hiddenContainer = (0, _sxQuery2.default)("#unibox-special-hidden-content");
            var body = (0, _sxQuery2.default)("body");
            body.append(hiddenContainer);
            hiddenContainer.append(bodyElems);
    
            //make sure the html and body element do have full height
            (0, _sxQuery2.default)("html, body").addClass("unibox-stretch");
            //run blend-in animation
            if (animateSpecialMobileSuggestTransitions) {
                animateSpecial(hiddenContainer, uniboxSpecial, resizeCallback, function () {
                    specialSearchBox.focus();
                });
            } else {
                hiddenContainer.hide();
                uniboxSpecial.show();
                specialSearchBox.focus();
                resizeCallback();
            }
        }
    
        function hideSpecialSuggest(callback) {
            if (!shouldUseSpecialSuggestBox()) {
                return;
            }
            if (shouldPreventIosBounce()) {
                removeIosBouncePreventer();
            }
    
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
            if (trackingCallbacks['abandon'] !== undefined && (0, _sxQuery2.default)(this).hasClass("unibox-special-close")) {
                trackingCallbacks['abandon'](specialSearchBox.val(), (0, _sxQuery2.default)("#unibox-special .unibox-selectable").length, specialSearchBox.get()[0]);
            }
    
            (0, _sxQuery2.default)("#unibox-special").hide();
            var wasSpecialUsed = (0, _sxQuery2.default)("#unibox-special-searchbox").hasClass("active");
            specialSearchBox.removeClass("active");
            specialSearchBox.attr("aria-expanded", "false");
            specialSearchBox.removeAttribute("aria-activedescendant");
            var hiddenContainer = (0, _sxQuery2.default)("#unibox-special-hidden-content");
            var bodyElems = hiddenContainer.children();
            (0, _sxQuery2.default)("body").append(bodyElems);
            if (wasSpecialUsed) {
                syncSearchBoxQuery();
            }
    
            var callbackWrapper = function (callback) {
                //remove changes from body and html element
                (0, _sxQuery2.default)("html, body").removeClass("unibox-stretch");
                if (callback !== undefined && typeof callback == "function") {
                    callback();
                }
                if (specialMobileHiddenCallback !== undefined && typeof specialMobileHiddenCallback == "function") {
                    specialMobileHiddenCallback();
                }
            }.bind(this, callback);
            //run animation
            if (animateSpecialMobileSuggestTransitions) {
                animateSpecial((0, _sxQuery2.default)("#unibox-special"), (0, _sxQuery2.default)("#unibox-special ~ *:not(#unibox-special-transition-background)").filter(function (el) {
                    return (0, _sxQuery2.default)(el).isVisible();
                }), undefined, callbackWrapper);
            } else {
                callbackWrapper();
            }
        }
    
        var shouldIosBounceBePrevented = undefined;
        //check whether to prevent iOS Safari bounce effect, which tends to break mobile suggestions scrolling by moving the whole viewport
        function shouldPreventIosBounce() {
            if (shouldIosBounceBePrevented === undefined) {
                var elem = (0, _sxQuery2.default)("<div id='ios-bounce-test' style='-webkit-overflow-scrolling: touch;'></div>");
                (0, _sxQuery2.default)("body").append(elem);
                shouldIosBounceBePrevented = elem.css('-webkit-overflow-scrolling') ? true : false;
                elem.remove();
            }
            return shouldIosBounceBePrevented;
        }
    
        function registerIosBouncePreventer() {
            (0, _sxQuery2.default)(window).on('touchstart.iosPreventer', function (e) {
                var y = e.touches ? e.touches[0].screenY : e.screenY;
                if (!y && window.event) {
                    y = window.event.touches ? window.event.touches[0].screenY : window.event.screenY;
                }
                var boundPreventer = preventIosBounce.bind(this, y);
                (0, _sxQuery2.default)(window).on('touchmove.iosPreventer', boundPreventer);
                (0, _sxQuery2.default)(window).on('touchend.iosPreventer', function () {
                    (0, _sxQuery2.default)(window).off('touchmove.iosPreventer,touchend.iosPreventer');
                });
            });
        }
    
        function removeIosBouncePreventer() {
            (0, _sxQuery2.default)(window).off('touchstart.iosPreventer, touchmove.iosPreventer, touchend.iosPreventer');
        }
    
        // prevent iOS Safari bounce effect, which tends to break mobile suggestions scrolling by moving the whole viewport
        function preventIosBounce(yStart, e) {
    
            (0, _sxQuery2.default)(window).off('touchmove.iosPreventer'); //we only need to prevent the bounce once after touchstart --> performance
            var target = e.target || window.event.target;
            // get touch start position
            var yNow = e.touches ? e.touches[0].screenY : e.screenY;
            if (!yNow && window.event) {
                yNow = window.event.touches ? window.event.touches[0].screenY : window.event.screenY;
            }
            // loop through all DOM parents of touchemove target until scrollable element is found
            while (target !== document.body) {
                var $target = (0, _sxQuery2.default)(target);
                var overflowY = $target.css('overflow-y');
                // check whether the target is scrollable and has enough height to be scrolled
                var isScrollable = $target.css('-webkit-overflow-scrolling') === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
                var canScroll = target.scrollHeight > target.offsetHeight;
    
                if (isScrollable && canScroll) {
                    if (yStart <= yNow && target.scrollTop === 0) {
                        // prevent bounce - the element which is completely scrolled to top is tried to be scrolled up
                        e.preventDefault();
                    } else {
                        var height = $target.height();
                        if (yStart >= yNow && target.scrollHeight - target.scrollTop === height) {
                            // prevent bounce  - the element which is completely scrolled to bottom is tried to be scrolled upwards
                            e.preventDefault();
                        }
                    }
                    return; // allow scroll
                }
                target = target.parentNode; //move up the DOM
            }
            //no scrollable element was found, prevent bounce
            e.preventDefault();
        }
    
        function animateSpecial(elemToHide, elemToShow, afterElemShownCallback, finishCallback) {
            var backgroundElem = (0, _sxQuery2.default)("#unibox-special-transition-background");
            // start with content to be shown hidden and content to be hidden visible
            elemToShow.hide();
            elemToHide.show();
            backgroundElem.show();
            var animationOffset = 140;
    
            // animate blend-in (move animation element to the left)
            setTimeout(function (backgroundElem) {
                backgroundElem.addClass("move--left");
            }.bind(this, backgroundElem), animationOffset); // this little offset helps to boost animation performance
    
            // move animation element back to the right and show the content
            setTimeout(function (elemToShow, elemToHide, elemToMove, firstCallback, finishCallback) {
                elemToHide.hide();
                elemToShow.show();
                // the element was shown, notify this
                if (firstCallback) {
                    firstCallback();
                }
                elemToMove.removeClass("move--left");
                elemToMove.addClass("move--right");
                // notify animation is completed
                setTimeout(function (elemToHide, callback) {
                    elemToMove.hide();
                    elemToMove.removeClass("move--left");
                    elemToMove.removeClass("move--right");
                    if (callback !== undefined && typeof callback == "function") {
                        callback();
                    }
                }.bind(this, elemToMove, finishCallback), parseFloat(animationSpeed));
            }.bind(this, elemToShow, elemToHide, backgroundElem, afterElemShownCallback, finishCallback), parseFloat(animationSpeed) + animationOffset);
        }
    
        function syncSearchBoxQuery() {
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
            if (specialSearchBox && searchBox) {
                searchBox.val(specialSearchBox.val());
            }
        }
    
        function syncSpecialSearchBoxQuery() {
            var specialSearchBox = (0, _sxQuery2.default)("#unibox-special-searchbox");
            if (searchBox) {
                specialSearchBox.val(searchBox.val());
            }
        }
    
        function showSpecialSuggestPlaceholder() {
            if (shouldUseSpecialSuggestBox()) {
                (0, _sxQuery2.default)("#unibox-suggest-box-special").html(specialMobileSuggestPlaceholder);
            }
        }
    
        function hasSpecialLogoTemplate() {
            return specialMobileSuggestLogoTemplate && specialMobileSuggestLogoTemplate.length > 0;
        }
    
        // return an object, through closure all methods keep bound to returned object
        return {
            updateSuggests: function updateSuggests(data) {
                updateSuggestBox(data);
            },
            updateSuggestUrl: function updateSuggestUrl(newUrl) {
                suggestUrl = newUrl;
            },
            hideSuggestBox: function hideSuggestBox() {
                resetSuggests();
                hideSpecialSuggest();
            },
            setIvfImagePath: function setIvfImagePath(path) {
                ivfImagePath = path;
                if (ivfImagePath.charAt(ivfImagePath.length - 1) != '/') {
                    ivfImagePath += '/';
                }
            },
            changeInstantVisualFeedbackState: function changeInstantVisualFeedbackState(state) {
                instantVisualFeedback = state;
            },
            render: function render() {
                resizeAndReposition();
            },
            getText: function getText() {
                return getSearchBox().val();
            },
            init: function init(searchBoxObject, options) {
                searchBox = searchBoxObject;
                searchBoxParent = options.searchBoxContainer;
                highlight = options.highlight;
                extraHtml = options.extraHtml;
                dataPoints = options.dataPoints;
                lineCallback = options.callbacks.line;
                suggestUrl = options.suggestUrl;
                ivfImagePath = options.ivfImagePath;
                ivfImageOffset = options.ivfImageOffset;
                missingErrorImage = options.missingErrorImage;
                throttleTime = options.throttleTime;
                animationSpeed = options.animationSpeed;
                minChars = options.minChars;
                enterCallback = options.callbacks.enter;
                enterCallbackResult = options.callbacks.enterResult;
                typeCallback = options.callbacks.type;
                focusCallback = options.callbacks.focus;
                blurCallback = options.callbacks.blur;
                loadingCallback = options.callbacks.loading;
                loadedCallback = options.callbacks.loaded;
                suggestsBuiltCallback = options.callbacks.suggestsBuilt;
                trackingCallbacks = options.trackingCallbacks || {};
                placeholder = options.placeholder;
                instantVisualFeedback = options.instantVisualFeedback;
                queryVisualizationHeadline = options.queryVisualizationHeadline;
                showDeleteAllButton = options.showDeleteAllButton;
                showImagesSuggestions = options.showImagesSuggestions;
                suggestOrder = options.suggestOrder;
                suggestSelectionOrder = options.suggestSelectionOrder;
                maxWidth = options.maxWidth;
                noSuggests = options.noSuggests;
                emptyQuerySuggests = options.emptyQuerySuggests;
                showMoreResults = options.showMoreResults;
                disableEventPropagationHtml = options.disableEventPropagationHtml;
                preSuggestCallback = options.callbacks.preSuggest;
                viewAllLabel = options.viewAllLabel;
                showOnMobile = options.showOnMobile !== undefined ? options.showOnMobile : true;
                loaderSelector = options.loaderSelector;
                viewKeyMappings = options.viewKeyMappings || {};
                themeColor = options.themeColor;
    
                isEnabled = options.enabled;
    
                var sms = options.specialMobileSuggest;
                useSpecialMobileSuggest = sms.enabled;
                specialMobileSuggestBreakpoint = sms.breakpoint || 768;
                specialMobileSuggestPlaceholder = sms.placeholder || '';
                specialMobileSuggestLogoTemplate = sms.customTopHtml || '';
                animateSpecialMobileSuggestTransitions = sms.animateTransitions && !_sxQuery2.default.prefersReducedMotion();
                resizeSpecialMobileSuggestOnScroll = sms.resizeSearchBoxOnScroll;
                specialMobileSearchBoxPlaceholder = sms.searchBoxPlaceholder || "Search";
                specialMobileTrigger = sms.trigger;
                autoHideSpecialMobileSuggest = sms.autoHide !== undefined ? sms.autoHide : true;
                specialMobileHiddenCallback = sms.hiddenCallback;
    
                suggestChangeCallback = options.callbacks.suggestChange;
                var acConfig = options.accessibility;
                headingElement = "h" + Math.min(Math.max(1, acConfig.headingLevel || 4), 6);
                searchFieldLabel = acConfig.searchFieldLabel;
                srSuggestionsHiddenText = acConfig.srSuggestionsHiddenText;
                srNoSuggestionsText = acConfig.srNoSuggestionsText;
                srSuggestionsCountText = acConfig.srSuggestionsCountText;
                srOneSuggestionText = acConfig.srOneSuggestionText;
                srSuggestBoxControlDescription = acConfig.srSuggestBoxControlDescription;
    
                // insert necessary values for inputfield
                searchBox.attr("autocomplete", "off");
    
                //append invisible label for search field (if no label is defined)
                if (searchFieldLabel && (!searchBox.attr("id") || (0, _sxQuery2.default)("label[for='" + searchBox.attr("id") + "']").length === 0)) {
                    if (!searchBox.attr("id")) {
                        if (!window.uniboxCounter) {
                            window.uniboxCounter = 0;
                        }
                        window.uniboxCounter++;
                        searchBox.attr("id", "unibox-search-box-" + window.uniboxCounter);
                    }
                    var forId = searchBox.attr("id");
                    var sbLabel = "<label style='" + _sxQuery2.default.srOnlyCss + "' class='unibox-sr-only' for='" + forId + "'>" + searchFieldLabel + "</label>";
                    searchBox.parent().prepend(sbLabel);
                }
    
                if (isEnabled) {
                    if ((0, _sxQuery2.default)("#unibox-controls-description").length === 0) {
                        var controlDescriptionText = srSuggestBoxControlDescription;
                        var controlDescription = "<span id='unibox-controls-description' style='" + _sxQuery2.default.srOnlyCss + "' class='unibox-sr-only' tabindex='-1'>" + controlDescriptionText + "</span>";
                        searchBox.parent().append(controlDescription);
                    }
                    if ((0, _sxQuery2.default)("#unibox-status-message").length === 0) {
                        //add aria-live region to announce search results
                        var ariaLive = (0, _sxQuery2.default)('<span id="unibox-status-message" style="' + _sxQuery2.default.srOnlyCss + '" tabindex="-1" aria-live="polite" aria-atomic="true" role="status" class="unibox-sr-only">');
                        searchBox.parent().append(ariaLive);
                    }
                    searchBox.attr("role", "combobox");
                    searchBox.attr("aria-describedby", "unibox-controls-description");
                    searchBox.attr("aria-owns", "unibox-suggest-box");
                    searchBox.attr("aria-expanded", "false");
                }
    
                // position and size the suggest box
                (0, _sxQuery2.default)('#unibox-suggest-box').remove();
                suggestBox = (0, _sxQuery2.default)('<div id="unibox-suggest-box" class="normal-suggest-box" role="listbox" aria-label="Search Suggestions"></div>');
                searchBoxParent.prepend(suggestBox);
                var pos = searchBoxParent.css('position');
                if (pos != 'absolute') {
                    searchBoxParent.css('position', 'relative');
                }
                var borderSize = (suggestBox.css('border-width') || "0px").replace('px', '');
                suggestBox.css('min-width', searchBox.outerWidth() - 2 * borderSize);
                suggestBox.css('max-width', options.maxWidth - 2 * borderSize);
    
                // add event listeners
                searchBox.keydown(scrollList);
                searchBox.keydown(throttle(searchSuggest, throttleTime));
                searchBox.keyup(resetSuggests);
    
                searchBox.focusout(function (e) {
                    if (keepSuggests) {
                        return;
                    }
                    hideSuggests(e);
                    if (blurCallback != undefined && !shouldUseSpecialSuggestBox()) {
                        blurCallback.call(this, e, (0, _sxQuery2.default)(this).val(), true);
                    }
                });
    
                if (specialMobileTrigger !== undefined) {
                    (0, _sxQuery2.default)(specialMobileTrigger).click(function () {
                        showSpecialSuggest();
                    });
                }
    
                var moveUnibox = options.hasMultipleSearchBoxes;
                searchBox.focus(function (e) {
                    e = e || window.event;
                    e.stopPropagation();
    
                    if (shouldUseSpecialSuggestBox()) {
                        showSpecialSuggest();
                        syncSpecialSearchBoxQuery();
                    } else if (moveUnibox) {
                        //move unibox to current sb context (if multiple search boxes and not using special mobile)
                        var isUniboxFirstLevelChild = function isUniboxFirstLevelChild(parentNode) {
                            if (parentNode.children) {
                                for (var i = 0; i < parentNode.children.length; i++) {
                                    if (parentNode.children[i].getAttribute("id") == "unibox-suggest-box") {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                        var parent = (0, _sxQuery2.default)(e.target).parent();
                        if (parent.length > 0 && (parent.find("#unibox-suggest-box").length === 0 || !isUniboxFirstLevelChild(parent))) {
                            parent.prepend((0, _sxQuery2.default)("#unibox-suggest-box"));
                            parent.append((0, _sxQuery2.default)("#unibox-invisible"));
                        }
                    }
    
                    var curSbVal = (0, _sxQuery2.default)(this).val();
                    if (curSbVal.length > 0) {
                        searchSuggest({
                            keyCode: currentInput === curSbVal ? -1 : -2
                        }); // should we only show the suggest box or fetch new suggests?
                    } else if (emptyQuerySuggests != undefined) {
                        updateSuggestBox(emptyQuerySuggests);
                    }
                    if (focusCallback !== undefined) {
                        try {
                            focusCallback.call(this, e, (0, _sxQuery2.default)(this).val());
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                });
    
                suggestBox.mouseenter(function () {
                    suggestBox.find('.unibox-selectable.active').removeClass('active');
                });
    
                // click outside of suggest div closes it
                (0, _sxQuery2.default)('html').click(function (e) {
                    try {
                        if (e != undefined && (0, _sxQuery2.default)(e.target).attr('id') == searchBox.attr('id')) {
                            return;
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
    
                    if (suggestBox.hasClass('uniboxActive')) {
                        hideSuggests(e);
                    }
                });
    
                // special for tab key (because if shift+tab when getting focus back)
                searchBox.keydown(function (e) {
                    e = e || window.event;
                    var keyCode = e.keyCode || e.which;
                    if (keyCode == 9) {
                        hideSuggests(e);
                    }
                });
                searchBox.focusout(function (e) {
                    if (keepSuggests) {
                        return;
                    }
                    e = e || window.event;
                    setTimeout(function () {
                        if ((0, _sxQuery2.default)(document.activeElement).parents('#unibox-suggest-box').length === 0) {
                            hideSuggests(e);
                        }
                    }, 10);
                });
    
                // disable click event propagation to html element
                if (disableEventPropagationHtml) {
                    searchBox.click(function (event) {
                        event.stopPropagation();
                    });
                    suggestBox.click(function (event) {
                        event.stopPropagation();
                    });
                }
    
                // handling the placeholder
                // check if original input has placeholder attribute
                var originalPlaceholder = searchBox.attr('placeholder');
                // if so, then assign to placeholder and use from now on
                placeholder = originalPlaceholder && originalPlaceholder.length > 0 ? originalPlaceholder : placeholder;
                // if placeholder is now undefined and length > 0 go on, else no placeholder at all
                if (placeholder && placeholder.length > 0) {
                    // check if browser supports HTML5 placeholder
                    var testInput = document.createElement('input');
    
                    // emulate HTML5 placeholder behaviour
                    if (!('placeholder' in testInput)) {
                        searchBox.focus(function () {
                            var localPlaceholder = (0, _sxQuery2.default)(this).attr('placeholder');
                            if (localPlaceholder && localPlaceholder.length > 0 && localPlaceholder != '' && (0, _sxQuery2.default)(this).val() == localPlaceholder) {
                                (0, _sxQuery2.default)(this).val('').removeClass('hasPlaceholder');
                            }
                        }).blur(function () {
                            var localPlaceholder = (0, _sxQuery2.default)(this).attr('placeholder');
                            if (localPlaceholder && localPlaceholder.length > 0 && localPlaceholder != '' && ((0, _sxQuery2.default)(this).val() == '' || (0, _sxQuery2.default)(this).val() == localPlaceholder)) {
                                (0, _sxQuery2.default)(this).val(localPlaceholder).addClass('hasPlaceholder');
                            }
                        });
    
                        // set placeholder if defined, remove input of the search box
                        searchBox.val(placeholder);
                    }
                    searchBox.attr('placeholder', placeholder);
                }
    
                // copy search box styles to an invisible element so we can determine the text width
                (0, _sxQuery2.default)('#unibox-invisible').remove();
                var invisible = (0, _sxQuery2.default)('<div id="unibox-invisible">&nbsp;<span>&nbsp;</span></div>');
                searchBoxParent.append(invisible);
    
                // if showDeleteAllButton == true, prepare button
                if (showDeleteAllButton) {
                    (0, _sxQuery2.default)('#unibox-dab-holder').remove();
                    var dab = (0, _sxQuery2.default)('<div id="unibox-dab-holder"><div id="unibox-dab"></div></div>');
                    searchBoxParent.append(dab);
                    // Events:
                    // if clicking the deleteAllButton erase the search field
                    (0, _sxQuery2.default)(dab).mousedown(function (e) {
                        (e || window.event).stopPropagation();
                        searchBox.val('');
                        searchBox.focus();
                        return false;
                    });
                    searchBox.focus(function () {
                        if (searchBox.val().length > 0) {
                            dab.show();
                        } else {
                            dab.hide();
                        }
                    }).blur(function () {
                        dab.hide();
                    }).keydown(function () {
                        if ((0, _sxQuery2.default)(this).val().length > 0) {
                            (0, _sxQuery2.default)(dab).show();
                        }
                    });
                    // CSS:
                    // css height for dab: respect border width and height of search field and box shadow
                    var sbPaddingTop = parseInt(searchBox.css('paddingTop').replace('px', '').trim());
                    var heightOfSb = searchBox.outerHeight();
                    var borderWidthOfSb = parseInt(searchBox.css('borderTopWidth').replace('px', '').trim());
                    var shadowInfo = searchBox.css('boxShadow').match(/\d{1,3}px/g);
                    var shadowOfSb = shadowInfo && shadowInfo.length > 2 ? parseInt(shadowInfo[2].replace('px', '').trim()) : 0;
                    dab.height(heightOfSb - 2 * borderWidthOfSb - shadowOfSb - sbPaddingTop);
    
                    // put some padding to the right of the search field
                    var sbPaddingRight = parseInt(searchBox.css('paddingRight').replace('px', '').trim());
                    sbPaddingRight = sbPaddingRight > 25 ? sbPaddingRight : 25;
                    searchBox.css('paddingRight', sbPaddingRight);
    
                    // calc position of dab inside parent of searchbox
                    var topDistance = borderWidthOfSb + shadowOfSb + (searchBox.offset().top - searchBox.parent().offset().top - searchBox.parent().scrollTop());
                    var leftDistance = Math.abs(searchBox[0].getBoundingClientRect().left - searchBox.parent()[0].getBoundingClientRect().left) + searchBox.outerWidth() - dab.outerWidth() - borderWidthOfSb - sbPaddingRight;
                    dab.css('top', topDistance);
                    dab.css('left', leftDistance);
                }
    
                if (instantVisualFeedback == 'none') {
                    (0, _sxQuery2.default)('#unibox-invisible').css('display', 'none');
                }
                initSpecialSuggestBox();
            }
        };
    };
    
    exports.default = UniBox;
    
    /***/ })
    
    /******/ });