"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _context = require("./core/context");

var _util = require("./core/util");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _proxy = _interopRequireDefault(require("./proxy"));

var _withVerifyContext = _interopRequireDefault(require("./core/withVerifyContext"));

var _withFormContext = _interopRequireDefault(require("./core/withFormContext"));

var _collectFormData = _interopRequireDefault(require("./core/collectFormData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

// Why class Component?
// In order to use React.createRef
var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this));

    _defineProperty(_assertThisInitialized(_this), "cancelWatcher", function (bn) {
      _this.itemMap["delete"](bn);

      _this.verifyBnWithOrder = _this.verifyBnWithOrder.filter(function (v) {
        return v.key !== bn;
      });

      _this.setState(function (prevState) {
        return {
          verifyContextValue: _objectSpread({}, prevState.verifyContextValue || {}, _defineProperty({}, bn, {}))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "subscibeReport", function (bn, vm) {
      if (_this.itemMap.has(bn)) {
        !_util.isProd && _util.log.warn("Encountered two form member with the same `bn`, `bn`: \"".concat(bn, "\" should be unique so that form collect their value correctly."));
        return false;
      }

      _this.itemMap.set(bn, vm);

      if (vm.verify) _this.verifyBnWithOrder.push({
        key: bn,
        vm: vm
      });
      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "itemMap", new Map());

    _defineProperty(_assertThisInitialized(_this), "verifyBnWithOrder", []);

    _defineProperty(_assertThisInitialized(_this), "formData", {});

    _defineProperty(_assertThisInitialized(_this), "getVerifyInfo", function () {
      var verifyContextValue = _this.state.verifyContextValue;
      var verifyResList = [];

      _this.verifyBnWithOrder.forEach(function (verifyItem) {
        if (Reflect.has(verifyContextValue, verifyItem.key)) {
          var verifyInfo = verifyContextValue[verifyItem.key];
          if (verifyInfo !== null) verifyResList.push(verifyInfo);
        } else {
          var _verifyInfo = verifyItem.vm.verifyHandler(verifyItem.vm.state.val);

          if (_verifyInfo !== true) verifyResList.push(_verifyInfo);
        }
      });

      return verifyResList;
    });

    _defineProperty(_assertThisInitialized(_this), "reset", function () {
      _this.formData = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.itemMap.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var vm = _step.value;
          vm && vm.reset && vm.reset();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFormData", function () {
      // reset formData
      _this.formData = {};
      !_util.isProd && _util.performance.start('collect formData');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.itemMap.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var vm = _step2.value;
          vm && vm.subscibeHandler && vm.subscibeHandler();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      !_util.isProd && _util.performance.end('collect formData');
      return _this.formData;
    });

    _defineProperty(_assertThisInitialized(_this), "verifyHandler", function (bn, verifyInfo) {
      // true means pass
      _this.setState(function (prevState) {
        return {
          verifyContextValue: _objectSpread({}, prevState.verifyContextValue || {}, _defineProperty({}, bn, verifyInfo === true ? null : verifyInfo))
        };
      });
    });

    _this.state = {
      formDataContextValue: {
        subscibeReport: _this.subscibeReport.bind(_assertThisInitialized(_this)),
        // callback and common data of FormDataContext
        report: function report(key, val) {
          return (0, _collectFormData["default"])(_this.formData, key, val);
        },
        verify: _this.verifyHandler.bind(_assertThisInitialized(_this)),
        cancelWatcher: _this.cancelWatcher.bind(_assertThisInitialized(_this))
      },
      verifyContextValue: {}
    };
    return _this;
  } // cancel watcher
  // form member unMount


  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          formDataContextValue = _this$state.formDataContextValue,
          verifyContextValue = _this$state.verifyContextValue;
      var children = this.props.children;
      return _react["default"].createElement(_context.FormDataContext.Provider, {
        value: formDataContextValue
      }, _react["default"].createElement(_context.FormVerifyContext.Provider, {
        value: verifyContextValue
      }, _react["default"].createElement(_react["default"].Fragment, null, children)));
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  children: _propTypes["default"].any
};
Form.FormDataContext = _context.FormDataContext;
Form.FormVerifyContext = _context.FormVerifyContext;
Form.Proxy = _proxy["default"];
Form.withFormContext = _withFormContext["default"];
Form.withVerifyContext = _withVerifyContext["default"];
var _default = Form;
exports["default"] = _default;