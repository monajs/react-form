"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormVerifyContext = exports.FormDataContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * context
 * author: yangxi
 */
// form data context
var FormDataContext = _react["default"].createContext(null); // verify context


exports.FormDataContext = FormDataContext;

var FormVerifyContext = _react["default"].createContext(null);

exports.FormVerifyContext = FormVerifyContext;