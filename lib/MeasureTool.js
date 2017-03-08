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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _contextMenu = __webpack_require__(4);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  function ContextMenu(div, options) {
    _classCallCheck(this, ContextMenu);

    this._defaultOptions = {
      width: 150
    };
    this._options = Object.assign({}, this._defaultOptions, options || {});
    this._parentDiv = div;
    this._containerDiv = document.createElement("div");
    this._containerDiv.classList.add("measure-tool-context-menu");
    this._containerDiv.stylesheet = _contextMenu2.default;
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
      this._containerDiv.style.cssText = "\n      display: block;\n      visibility: hidden;\n      position: absolute;\n      width: " + this._options.width + "px; \n    ";
      var isXOverflow = this._parentDiv.getBoundingClientRect().width <= point.x + this.width;
      var isYOverflow = this._parentDiv.getBoundingClientRect().height <= point.y + this.height;

      this._containerDiv.style.cssText += "\n      " + (isXOverflow ? "right: 0px;" : "left: " + point.x + "px;") + "\n      " + (isYOverflow ? "bottom: 14px;" : "top: " + point.y + "px;") + "\n      visibility: visible;\n    ";
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".measure-tool-context-menu ul {\n  padding: 0px;\n  margin: 0px;\n  border: 1px solid grey;\n  background-color: white; }\n  .measure-tool-context-menu ul li {\n    padding: 3px 10px;\n    cursor: pointer;\n    background-color: white; }\n    .measure-tool-context-menu ul li:hover {\n      background-color: azure; }\n", "", {"version":3,"sources":["/./src/context-menu.scss"],"names":[],"mappings":"AAAA;EAEI,aAAY;EACZ,YAAW;EACX,uBAAsB;EACtB,wBAAuB,EAWxB;EAhBH;IAQM,kBAAiB;IACjB,gBAAe;IACf,wBAAuB,EAKxB;IAfL;MAaQ,wBAAuB,EACxB","file":"context-menu.scss","sourcesContent":[".measure-tool-context-menu {\n  ul {\n    padding: 0px;\n    margin: 0px;\n    border: 1px solid grey;\n    background-color: white;\n\n    li {\n      padding: 3px 10px;\n      cursor: pointer;\n      background-color: white;\n\n      &:hover {\n        background-color: azure;\n      }\n    }\n  }\n}"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--2-1!../node_modules/sass-loader/lib/loader.js??ref--2-2!./context-menu.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--2-1!../node_modules/sass-loader/lib/loader.js??ref--2-2!./context-menu.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import css from 'style.scss';


var _contextMenu = __webpack_require__(0);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeasureTool = function () {
  function MeasureTool(map) {
    _classCallCheck(this, MeasureTool);

    this._map = map;
    this._map.setClickableIcons(false);
    this._init();
  }

  _createClass(MeasureTool, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._contextMenu = new _contextMenu2.default(this._map.getDiv(), { width: 160 });
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=MeasureTool.js.map