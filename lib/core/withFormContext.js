"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = require("./context");

var _util = require("./util");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

// default way to get value
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

  var FormItemComponent =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(FormItemComponent, _Component);

    function FormItemComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, FormItemComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(FormItemComponent).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "compRef", _react["default"].createRef());
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reportHandler", null);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "verifyReport", null);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cancelWatcher", null);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscibeStatus", true);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "verifyPass", true);
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscibeHandler", function () {
        if (!_this.reportHandler || !_this.bn) return;
        var val = _this.state.val;

        _this.reportHandler(_this.bn, val);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reset", function () {
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
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "verifyHandler", function (val) {
        if (!_this.verify || !_this.bn) return;
        var baseInfo = {
          id: _this.id,
          val: val,
          vm: (0, _assertThisInitialized2["default"])(_this),
          verifyMsg: _this.verifyMsg
        };

        var c = function c() {
          _this.verifyPass = false;
        };

        if (_this.verify === true && (0, _util.isEmpty)(val)) {
          c();
          var verifyInfo = (0, _objectSpread2["default"])({}, baseInfo, {
            isEmptyVerify: true
          });

          _this.verifyReport(verifyInfo);

          return verifyInfo;
        }

        if ((0, _util.isRegExp)(_this.verify) && !_this.verify.test(val)) {
          c();

          var _verifyInfo = (0, _objectSpread2["default"])({}, baseInfo, {
            isRegVerify: true
          });

          _this.verifyReport(_verifyInfo);

          return _verifyInfo;
        }

        if ((0, _util.isFunction)(_this.verify) && !_this.verify(val)) {
          c();

          var _verifyInfo2 = (0, _objectSpread2["default"])({}, baseInfo, {
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
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "changeHandler", function (e) {
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

      if (!_this.bn) {
        !_util.isProd && _util.log.warn('The prop `bn` is required for form member, but its value is `undefined`.');
      }

      _this.verify = verify || config.verify;
      _this.verifyMsg = verifyMsg || config.verifyMsg;

      if (_this.verify && !_this.verifyMsg) {
        !_util.isProd && _util.log.warn('The prop `verifyMsg` is required with form member when `verify` is accessed, but its value is `undefined`.');
      }

      if (!_this.verify && _this.verifyMsg) {
        !_util.isProd && _util.log.warn('The prop `verifyMsg` is unnecessary with form member when `verify` is not accessed.');
      }

      _this.state = {
        val: _value || _defaultValue
      };
      return _this;
    }

    (0, _createClass2["default"])(FormItemComponent, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // cancel subscibe when already subscibed
        this.subscibeStatus && this.cancelWatcher && this.cancelWatcher(this.bn);
      } // subscibe report handler

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
            other = (0, _objectWithoutProperties2["default"])(_this$props2, ["bn", "defaultValue", "value", "onChange", "verify", "verifyMsg"]);
        /* eslint-disable no-unused-vars */

        var val = this.state.val;
        if (!this.bn) return (// if prop `bn` missed, return the origin element
          _react["default"].createElement(WrappedComponent, this.props)
        );
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

          return _react["default"].createElement(WrappedComponent, (0, _extends2["default"])({
            ref: _this2.compRef,
            value: val,
            onChange: _this2.changeHandler
          }, other));
        });
      }
    }, {
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
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
  return FormItemComponent;
};

var _default = withFormContext;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DefaultWayToGetValue, "DefaultWayToGetValue", "/Users/fangke/Desktop/react-form/package/core/withFormContext.js");
  reactHotLoader.register(id, "id", "/Users/fangke/Desktop/react-form/package/core/withFormContext.js");
  reactHotLoader.register(withFormContext, "withFormContext", "/Users/fangke/Desktop/react-form/package/core/withFormContext.js");
  reactHotLoader.register(_default, "default", "/Users/fangke/Desktop/react-form/package/core/withFormContext.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();