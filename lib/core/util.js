"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = exports._typeof = exports.getValue = exports.performance = exports.log = exports.isProd = exports.isRegExp = exports.isFunction = exports.isEmpty = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var symbol = '[@monajs/react-form] ';
var log = {
  warn: function warn(msg, link) {
    var reference = 'Reference: ' + link;
    console.error(symbol + 'Warning: ' + msg + (link ? '\n' + reference : ''));
  },
  info: function info(msg) {
    var reference = 'Reference' + link;
    console.error(symbol + 'Info: ' + msg + (link ? '\n' + reference : ''));
  }
};
exports.log = log;
var performance = {
  start: function start() {
    var _console;

    var _arguments = Array.prototype.slice.call(arguments),
        key = _arguments[0],
        other = _arguments.slice(1);

    (_console = console).time.apply(_console, [symbol + key].concat(_toConsumableArray(other)));
  },
  end: function end() {
    var _console2;

    var _arguments2 = Array.prototype.slice.call(arguments),
        key = _arguments2[0],
        other = _arguments2.slice(1);

    (_console2 = console).timeEnd.apply(_console2, [symbol + key].concat(_toConsumableArray(other)));
  }
};
exports.performance = performance;

var getValue = function getValue() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return e.target.value;
};
/**
 * get real type
 *
 * @example
 * _typeof({}) // object
 * _typeof([]) // array
 * _typeof('') // string
 * _typeof(1) // number
 * _typeof(null) // null
 * _typeof(undefined) // undefined
 *
 */


exports.getValue = getValue;

var _typeof = function _typeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
/**
 * check is object. response will be boolean
 */


exports._typeof = _typeof;

var isPlainObject = function isPlainObject(obj) {
  return _typeof(obj) === 'object';
};

exports.isPlainObject = isPlainObject;