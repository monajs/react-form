"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = exports.performance = exports.log = exports.isProd = exports.isRegExp = exports.isFunction = exports.isEmpty = void 0;

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var isEmpty = function isEmpty(val) {
  if (typeof val === 'string') {
    return !val;
  }

  if (typeof val === 'number') {
    return val !== 0 && !val;
  }

  if (val instanceof Array) {
    return val.length === 0;
  }

  if (val instanceof Object) {
    return Object.keys(val).length === 0;
  }

  return !val;
};

exports.isEmpty = isEmpty;

var isFunction = function isFunction(arg) {
  return arg instanceof Function;
};

exports.isFunction = isFunction;

var isRegExp = function isRegExp(arg) {
  return arg instanceof RegExp;
};

exports.isRegExp = isRegExp;
var isProd = process.env.NODE_ENV === 'production';
exports.isProd = isProd;

var symbol = function symbol() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'log';
  console.log("%c ----------- @monajs/react-form/".concat(type, " ----------- "), 'color: #048ffd; font-weight: bold; font-size: 12px');
};

var log = function log() {
  symbol();
  console.log(arguments);
};

exports.log = log;
var performance = {
  start: function start() {
    var _console;

    symbol('performance');

    (_console = console).time.apply(_console, arguments);
  },
  end: function end() {
    var _console2;

    (_console2 = console).timeEnd.apply(_console2, arguments);
  }
};
exports.performance = performance;

var getValue = function getValue() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return e.target.value;
};

exports.getValue = getValue;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(isEmpty, "isEmpty", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(isFunction, "isFunction", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(isRegExp, "isRegExp", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(isProd, "isProd", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(symbol, "symbol", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(log, "log", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(performance, "performance", "/Users/fangke/Desktop/react-form/package/core/util.js");
  reactHotLoader.register(getValue, "getValue", "/Users/fangke/Desktop/react-form/package/core/util.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();