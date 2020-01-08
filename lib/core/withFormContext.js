"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("./context");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DefaultWayToGetValue = function DefaultWayToGetValue(val) {
  return val;
};

var id = 0;
/**
 * Form item component wrap
 * with form context
 * @param WrappedComponent
 * @param getValue
 * @param config
 * @returns {function(*)}
 */

var withFormContext = function withFormContext(WrappedComponent) {
  var getValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultWayToGetValue;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // when WrappedComponent is already withFormContext
  if (WrappedComponent._isWithFormContext) {
    !_util.isProd && _util.log.warn("If you are using the `Proxy` components, please check if the prop `to`\uFF08".concat(WrappedComponent._cname, "\uFF09 is already powered with `withFormContext`."));

    var C = function C(props) {
      return _react["default"].createElement(WrappedComponent, _extends({}, props, config));
    };

    return C;
  }

  var FormItemComponent =
  /*#__PURE__*/
  function (_Component) {
    _inherits(FormItemComponent, _Component);

    function FormItemComponent(props) {
      var _this;

      _classCallCheck(this, FormItemComponent);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FormItemComponent).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "compRef", _react["default"].createRef());

      _defineProperty(_assertThisInitialized(_this), "reportHandler", null);

      _defineProperty(_assertThisInitialized(_this), "verifyReport", null);

      _defineProperty(_assertThisInitialized(_this), "cancelWatcher", null);

      _defineProperty(_assertThisInitialized(_this), "subscibeStatus", true);

      _defineProperty(_assertThisInitialized(_this), "verifyPass", true);

      _defineProperty(_assertThisInitialized(_this), "devWarning", function () {
        if (_util.isProd) return;
        var CompInfo = "{Component: `".concat(WrappedComponent.name, "`, id: ").concat(_this.id, "}");

        if (!_this.bn) {
          _util.log.warn("The prop `bn` is required for form member (".concat(CompInfo, "), but its value is `undefined`."));

          if (_this.verify || _this.verifyMsg) {
            _util.log.warn("The prop `bn` is missed with Component\uFF08".concat(CompInfo, "\uFF09.If you want to use original Component, then the prop `verify` and `verifyMsg` is needless."));
          }

          return;
        }

        if (_this.verify && !_this.verifyMsg) {
          _util.log.warn('The prop `verifyMsg` is required with form member when `verify` is accessed, but its value is `undefined`.');

          return;
        }

        if (!_this.verify && _this.verifyMsg) {
          _util.log.warn('The prop `verifyMsg` is unnecessary with form member when `verify` is not accessed.');
        }
      });

      _defineProperty(_assertThisInitialized(_this), "subscibeHandler", function () {
        if (!_this.reportHandler || !_this.bn) return;
        var val = _this.state.val;

        _this.reportHandler(_this.bn, val);
      });

      _defineProperty(_assertThisInitialized(_this), "reset", function () {
        var _this$props = _this.props,
            value = _this$props.value,
            defaultValue = _this$props.defaultValue; // reset verify info

        if (!_this.verifyPass) {
          _this.verifyPass = true;

          _this.verifyReport(true);
        } // reset value


        _this.setState({
          val: value || defaultValue
        });
      });

      _defineProperty(_assertThisInitialized(_this), "verifyHandler", function (val) {
        if (!_this.verify || !_this.bn) return;
        var baseInfo = {
          id: _this.id,
          val: val,
          vm: _assertThisInitialized(_this),
          verifyMsg: _this.verifyMsg
        };

        var c = function c() {
          _this.verifyPass = false;
        };

        if (_this.verify === true && (0, _util.isEmpty)(val)) {
          c();

          var verifyInfo = _objectSpread({}, baseInfo, {
            isEmptyVerify: true
          });

          _this.verifyReport(verifyInfo);

          return verifyInfo;
        }

        if ((0, _util.isRegExp)(_this.verify) && !_this.verify.test(val)) {
          c();

          var _verifyInfo = _objectSpread({}, baseInfo, {
            isRegVerify: true
          });

          _this.verifyReport(_verifyInfo);

          return _verifyInfo;
        }

        if ((0, _util.isFunction)(_this.verify) && !_this.verify(val)) {
          c();

          var _verifyInfo2 = _objectSpread({}, baseInfo, {
            isFunctionVerify: true
          });

          _this.verifyReport(_verifyInfo2);

          return _verifyInfo2;
        }

        if (!_this.verifyPass) {
          _this.verifyPass = true;

          _this.verifyReport(true);
        }

        return true;
      });

      _defineProperty(_assertThisInitialized(_this), "changeHandler", function (e) {
        var onChange = _this.props.onChange;
        var compVal = getValue(e);

        _this.setState(function () {
          return {
            val: compVal
          };
        });

        _this.verifyHandler(compVal);

        onChange && onChange(e, compVal);
      });

      var _defaultValue = props.defaultValue,
          _value = props.value,
          bn = props.bn,
          verify = props.verify,
          verifyMsg = props.verifyMsg;
      _this.inited = false;
      _this.id = id++;
      _this.bn = bn || config.bn;
      _this.verify = verify || config.verify;
      _this.verifyMsg = verifyMsg || config.verifyMsg;

      _this.devWarning();

      _this.state = {
        val: _value || _defaultValue
      };
      return _this;
    }

    _createClass(FormItemComponent, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // cancel subscibe when already subscibed
        this.subscibeStatus && this.cancelWatcher && this.cancelWatcher(this.bn);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        /* eslint-disable no-unused-vars */
        var _this$props2 = this.props,
            bn = _this$props2.bn,
            defaultValue = _this$props2.defaultValue,
            value = _this$props2.value,
            onChange = _this$props2.onChange,
            verify = _this$props2.verify,
            verifyMsg = _this$props2.verifyMsg,
            other = _objectWithoutProperties(_this$props2, ["bn", "defaultValue", "value", "onChange", "verify", "verifyMsg"]);
        /* eslint-disable no-unused-vars */


        var val = this.state.val;

        if (!this.bn) {
          return (// if prop `bn` missed, return the origin element
            _react["default"].createElement(WrappedComponent, this.props)
          );
        }

        return _react["default"].createElement(_context.FormDataContext.Consumer, null, function (_ref) {
          var report = _ref.report,
              verify = _ref.verify,
              subscibeReport = _ref.subscibeReport,
              cancelWatcher = _ref.cancelWatcher;

          if (!_this2.inited) {
            _this2.reportHandler = report;
            _this2.cancelWatcher = cancelWatcher;

            _this2.verifyReport = function (verifyInfo) {
              return verify(_this2.bn, verifyInfo);
            };

            _this2.subscibeStatus = subscibeReport(_this2.bn, _this2);
            _this2.inited = true;
          }

          return _react["default"].createElement(WrappedComponent, _extends({
            ref: _this2.compRef,
            value: val,
            onChange: _this2.changeHandler
          }, other));
        });
      }
    }]);

    return FormItemComponent;
  }(_react.Component);

  FormItemComponent.propTypes = {
    value: _propTypes["default"].any,
    defaultValue: _propTypes["default"].any,
    bn: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    verify: _propTypes["default"].any,
    verifyMsg: _propTypes["default"].any
  };
  FormItemComponent._cname = WrappedComponent.name;
  FormItemComponent._isWithFormContext = true;
  return FormItemComponent;
};

var _default = withFormContext;
exports["default"] = _default;