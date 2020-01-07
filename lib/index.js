"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _context = require("./core/context");

var _util = require("./core/util");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _proxy = _interopRequireDefault(require("./proxy"));

var _withVerifyContext = _interopRequireDefault(require("./core/withVerifyContext"));

var _withFormContext = _interopRequireDefault(require("./core/withFormContext"));

var _collectFormData = _interopRequireDefault(require("./core/collectFormData"));

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

// Why class Component?
// In order to use React.createRef
var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Form, _Component);

  function Form() {
    var _this;

    (0, _classCallCheck2["default"])(this, Form);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Form).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cancelWatcher", function (bn) {
      _this.itemMap["delete"](bn);

      _this.verifyBnWithOrder = _this.verifyBnWithOrder.filter(function (v) {
        return v.key !== bn;
      });

      _this.setState(function (prevState) {
        return {
          verifyContextValue: (0, _objectSpread4["default"])({}, prevState.verifyContextValue || {}, (0, _defineProperty2["default"])({}, bn, {}))
        };
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscibeReport", function (bn, vm) {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "itemMap", new Map());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "verifyBnWithOrder", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "formData", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getVerifyInfo", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reset", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getFormData", function () {
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
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "verifyHandler", function (bn, verifyInfo) {
      // true means pass
      _this.setState(function (prevState) {
        return {
          verifyContextValue: (0, _objectSpread4["default"])({}, prevState.verifyContextValue || {}, (0, _defineProperty2["default"])({}, bn, verifyInfo === true ? null : verifyInfo))
        };
      });
    });
    _this.state = {
      formDataContextValue: {
        subscibeReport: _this.subscibeReport.bind((0, _assertThisInitialized2["default"])(_this)),
        // callback and common data of FormDataContext
        report: function report(key, val) {
          return (0, _collectFormData["default"])(_this.formData, key, val);
        },
        verify: _this.verifyHandler.bind((0, _assertThisInitialized2["default"])(_this)),
        cancelWatcher: _this.cancelWatcher.bind((0, _assertThisInitialized2["default"])(_this))
      },
      verifyContextValue: {}
    };
    return _this;
  } // cancel watcher
  // form member unMount


  (0, _createClass2["default"])(Form, [{
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Form, "Form", "/Users/fangke/Desktop/react-form/package/index.jsx");
  reactHotLoader.register(_default, "default", "/Users/fangke/Desktop/react-form/package/index.jsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();