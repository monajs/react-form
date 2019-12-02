"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormVerifyContext = exports.FormDataContext = void 0;

var _react = _interopRequireDefault(require("react"));

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

// form data context
var FormDataContext = _react["default"].createContext(null); // verify context


exports.FormDataContext = FormDataContext;

var FormVerifyContext = _react["default"].createContext(null);

exports.FormVerifyContext = FormVerifyContext;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormDataContext, "FormDataContext", "/Users/fangke/Desktop/react-form/package/core/context.js");
  reactHotLoader.register(FormVerifyContext, "FormVerifyContext", "/Users/fangke/Desktop/react-form/package/core/context.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();