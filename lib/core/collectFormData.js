"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = require("./util");

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).enterModule;
  enterModule && enterModule(module);
})();

// patern：a[0][1][2]
// limit the length of array, max: 999
var keyChainReg = /^(\w+)((\[[0-9]{1,3}\])+)$/g;

var collectFormData = function collectFormData(formData, key, val) {
  var keyChain = key.split('.');
  var len = keyChain.length;
  var d = formData;
  keyChain.forEach(function (k, i) {
    var keyParseList = keyChainReg.exec(k);

    if (!keyParseList) {
      // handle the patern of json
      if (i === len - 1) {
        d[k] = val;
        return;
      }

      if (!(0, _util.isPlainObject)(d[k])) {
        d[k] = {};
      }

      d = d[k];
    } else {
      // handle the patern of array
      k = keyParseList[1];

      if (!Array.isArray(d[k])) {
        d[k] = [];
      }

      d = d[k];
      var items = keyParseList[2]; // [0][1][2]

      items = items.substring(1, items.length - 1).split(']['); // [0,1,2]

      items.forEach(function (item, j) {
        // then end of item array
        if (j === items.length - 1) {
          // the end of chain
          if (i === len - 1) {
            d[item] = val;
            return;
          } // check is already object


          if (!(0, _util.isPlainObject)(d[item])) {
            d[item] = {};
          }

          d = d[item];
          return;
        }

        if (!Array.isArray(d[item])) {
          d[item] = [];
        }

        d = d[item];
      });
    }
  });
};

var _default = collectFormData;
var _default2 = _default;
exports["default"] = _default2;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(keyChainReg, "keyChainReg", "/Users/fangke/Desktop/react-form/package/core/collectFormData.js");
  reactHotLoader.register(collectFormData, "collectFormData", "/Users/fangke/Desktop/react-form/package/core/collectFormData.js");
  reactHotLoader.register(_default, "default", "/Users/fangke/Desktop/react-form/package/core/collectFormData.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : require('react-hot-loader')).leaveModule;
  leaveModule && leaveModule(module);
})();