"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withFormContext = _interopRequireDefault(require("./core/withFormContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Proxy =
/*#__PURE__*/
function (_Component) {
  _inherits(Proxy, _Component);

  function Proxy(props) {
    var _this;

    _classCallCheck(this, Proxy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Proxy).call(this, props));
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

  _createClass(Proxy, [{
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
          other = _objectWithoutProperties(_this$props2, ["bn", "verify", "verifyMsg", "children", "getValue", "to"]);
      /* eslint-disable no-unused-vars */


      var C = this.C;
      return _react["default"].createElement(C, other, children);
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
exports["default"] = _default;