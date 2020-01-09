"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("./context");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function withVerifyContext(WrappedComponent) {
  var Component = function Component(props) {
    var _props$bn = props.bn,
        bn = _props$bn === void 0 ? '' : _props$bn,
        other = _objectWithoutProperties(props, ["bn"]);

    if (!bn) {
      return _react["default"].createElement(WrappedComponent, other);
    }

    var getVerifyMsg = function getVerifyMsg() {
      var verifyInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var verify = verifyInfo[bn] || {};
      var verifyMsg = verify.verifyMsg;
      if (!verifyMsg) return;
      if (typeof verifyMsg === 'string' || typeof verifyMsg === 'number') return '' + verifyMsg;
      if ((0, _util.isFunction)(verifyMsg)) return '' + verifyMsg(verify);
    };

    return _react["default"].createElement(_context.FormVerifyContext.Consumer, null, function (verifyInfo) {
      if (!verifyInfo) {
        return _react["default"].createElement(WrappedComponent, other);
      }

      return _react["default"].createElement(WrappedComponent, _extends({
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
exports["default"] = _default;