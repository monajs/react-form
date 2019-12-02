"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("./context");

var _util = require("./util");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

function withVerifyContext(WrappedComponent) {
  var Component = function Component(props) {
    var _props$bn = props.bn,
        bn = _props$bn === void 0 ? '' : _props$bn,
        other = (0, _objectWithoutProperties2["default"])(props, ["bn"]);

    if (!bn) {
      return _react["default"].createElement(WrappedComponent, other);
    }

    var getVerifyMsg = function getVerifyMsg(verifyInfo) {
      var verify = verifyInfo[bn] || {};
      var verifyMsg = verify.verifyMsg;
      if (!verifyMsg) return '';
      if (typeof verifyMsg === 'string' || typeof verifyMsg === 'number') return '' + verifyMsg;
      if ((0, _util.isFunction)(verifyMsg)) return '' + verifyMsg(verify);
      return '';
    };

    return _react["default"].createElement(_context.FormVerifyContext.Consumer, null, function () {
      var verifyInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _react["default"].createElement(WrappedComponent, (0, _extends2["default"])({
        verifyMsg: getVerifyMsg(verifyInfo)
      }, other));
    });
  };

  Component.propTypes = {
    bn: _propTypes["default"].string
  };
  return Component;
}

var _default = withVerifyContext;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(withVerifyContext, "withVerifyContext", "/Users/fangke/Desktop/react-form/package/core/withVerifyContext.js");
  reactHotLoader.register(_default, "default", "/Users/fangke/Desktop/react-form/package/core/withVerifyContext.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();