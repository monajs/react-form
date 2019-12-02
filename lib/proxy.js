"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withFormContext = _interopRequireDefault(require("./core/withFormContext"));

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

var Proxy =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Proxy, _Component);

  function Proxy(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Proxy);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Proxy).call(this, props));
    var _this$props = _this.props,
        bn = _this$props.bn,
        verify = _this$props.verify,
        verifyMsg = _this$props.verifyMsg,
        getValue = _this$props.getValue,
        to = _this$props.to; // avoid withFormContext API exec many times

    _this.C = (0, _withFormContext["default"])(to, getValue, {
      bn: bn,
      verify: verify,
      verifyMsg: verifyMsg
    });
    return _this;
  }

  (0, _createClass2["default"])(Proxy, [{
    key: "render",
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _this$props2 = this.props,
          bn = _this$props2.bn,
          verify = _this$props2.verify,
          verifyMsg = _this$props2.verifyMsg,
          children = _this$props2.children,
          getValue = _this$props2.getValue,
          to = _this$props2.to,
          other = (0, _objectWithoutProperties2["default"])(_this$props2, ["bn", "verify", "verifyMsg", "children", "getValue", "to"]);
      /* eslint-disable no-unused-vars */

      var C = this.C;
      return _react["default"].createElement(C, other, children);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);
  return Proxy;
}(_react.Component);

Proxy.propTypes = {
  to: _propTypes["default"].elementType.isRequired,
  getValue: _propTypes["default"].func,
  bn: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func,
  verify: _propTypes["default"].any,
  verifyMsg: _propTypes["default"].any,
  children: _propTypes["default"].node
};
var _default = Proxy;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Proxy, "Proxy", "/Users/fangke/Desktop/react-form/package/proxy.jsx");
  reactHotLoader.register(_default, "default", "/Users/fangke/Desktop/react-form/package/proxy.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();