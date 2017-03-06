(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MeasureTool", [], factory);
	else if(typeof exports === 'object')
		exports["MeasureTool"] = factory();
	else
		root["MeasureTool"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contextMenu = __webpack_require__(1);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeasureTool = function () {
  function MeasureTool(map) {
    _classCallCheck(this, MeasureTool);

    this._map = map;
    this._init();
  }

  _createClass(MeasureTool, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._contextMenu = new _contextMenu2.default(this._map.getDiv());
      this._startNode = this._contextMenu.addItem("Measure distance", true, this._startMeasure, this);
      this._endNode = this._contextMenu.addItem("Clear measurement", false, this._endMeasure, this);

      this._overlay = new google.maps.OverlayView();
      this._overlay.onAdd = function () {
        _this._projection = _this._overlay.getProjection();
      };
      this._overlay.draw = function () {};
      this._overlay.setMap(this._map);
      this._bindToggleContextMenu();
    }
  }, {
    key: "_bindToggleContextMenu",
    value: function _bindToggleContextMenu() {
      var _this2 = this;

      this._map.addListener('rightclick', function (mouseEvent) {
        _this2._firstPoint = mouseEvent.latLng;
        _this2._contextMenu.show(_this2._projection.fromLatLngToContainerPixel(mouseEvent.latLng));
      });

      document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
          _this2._contextMenu.hide();
        }
      });
      this._map.getDiv().addEventListener('mousedown', function (event) {
        if (event.clientX >= _this2._contextMenu.left && event.clientX <= _this2._contextMenu.left + _this2._contextMenu.width && event.clientY >= _this2._contextMenu.top && event.clientY <= _this2._contextMenu.top + _this2._contextMenu.height) {
          return;
        }
        _this2._contextMenu.hide();
      });
    }
  }, {
    key: "_startMeasure",
    value: function _startMeasure() {
      console.log("start measure", this._firstPoint);
      this._contextMenu.toggleItems([this._endNode], [this._startNode]);
    }
  }, {
    key: "_endMeasure",
    value: function _endMeasure() {
      console.log("end measure");
      this._contextMenu.toggleItems([this._startNode], [this._endNode]);
    }
  }]);

  return MeasureTool;
}();

exports.default = MeasureTool;
;
module.exports = exports["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenu = function () {
  _createClass(ContextMenu, [{
    key: "left",
    get: function get() {
      return this._containerDiv.getBoundingClientRect().left;
    }
  }, {
    key: "top",
    get: function get() {
      return this._containerDiv.getBoundingClientRect().top;
    }
  }, {
    key: "width",
    get: function get() {
      return this._containerDiv.getBoundingClientRect().width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._containerDiv.getBoundingClientRect().height;
    }
  }]);

  function ContextMenu(div) {
    _classCallCheck(this, ContextMenu);

    this._containerDiv = document.createElement("div");
    this._containerDiv.oncontextmenu = function (event) {
      return event.preventDefault();
    };
    this._list = document.createElement("ul");
    this._containerDiv.appendChild(this._list);
    div.appendChild(this._containerDiv);
    this._isVisible = false;
  }

  _createClass(ContextMenu, [{
    key: "addItem",
    value: function addItem(name, isVisible, cb) {
      var _this = this;

      var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

      var item = document.createElement("li");
      var content = document.createTextNode(name);

      item.appendChild(content);
      item.onclick = function (e) {
        e.preventDefault();
        cb.apply(context);
        _this.hide();
      };
      if (isVisible) {
        this.showItem(item);
      } else {
        this.hideItem(item);
      }
      this._list.appendChild(item);
      return item;
    }
  }, {
    key: "hideItem",
    value: function hideItem(item) {
      item.style.cssText = "display: none";
    }
  }, {
    key: "showItem",
    value: function showItem(item) {
      item.style.cssText = "display: block";
    }
  }, {
    key: "toggleItems",
    value: function toggleItems(itemsToShow, itemsToHide) {
      var _this2 = this;

      itemsToShow.forEach(function (item) {
        return _this2.showItem(item);
      });
      itemsToHide.forEach(function (item) {
        return _this2.hideItem(item);
      });
    }
  }, {
    key: "show",
    value: function show(point) {
      this._isVisible = true;
      this._containerDiv.style.cssText = "\n      display: block;\n      position: absolute; \n      top: " + point.y + "px; \n      left: " + point.x + "px;\n    ";
    }
  }, {
    key: "hide",
    value: function hide() {
      this._isVisible = false;
      this._containerDiv.style.cssText = "display: none";
    }
  }, {
    key: "toggle",
    value: function toggle(point) {
      if (this._isVisible) {
        this.hide();
      } else {
        this.show(point);
      }
    }
  }]);

  return ContextMenu;
}();

exports.default = ContextMenu;
;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=MeasureTool.js.map