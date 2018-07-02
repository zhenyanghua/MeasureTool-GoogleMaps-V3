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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectAll__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exit__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__merge__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__order__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__call__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nodes__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__size__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__empty__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__each__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__attr__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__style__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__property__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__classed__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__text__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__html__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__raise__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lower__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__append__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__insert__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__remove__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__datum__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__on__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dispatch__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return root; });
/* harmony export (immutable) */ __webpack_exports__["b"] = Selection;






























var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: __WEBPACK_IMPORTED_MODULE_0__select__["a" /* default */],
  selectAll: __WEBPACK_IMPORTED_MODULE_1__selectAll__["a" /* default */],
  filter: __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* default */],
  data: __WEBPACK_IMPORTED_MODULE_3__data__["a" /* default */],
  enter: __WEBPACK_IMPORTED_MODULE_4__enter__["a" /* default */],
  exit: __WEBPACK_IMPORTED_MODULE_5__exit__["a" /* default */],
  merge: __WEBPACK_IMPORTED_MODULE_6__merge__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_7__order__["a" /* default */],
  sort: __WEBPACK_IMPORTED_MODULE_8__sort__["a" /* default */],
  call: __WEBPACK_IMPORTED_MODULE_9__call__["a" /* default */],
  nodes: __WEBPACK_IMPORTED_MODULE_10__nodes__["a" /* default */],
  node: __WEBPACK_IMPORTED_MODULE_11__node__["a" /* default */],
  size: __WEBPACK_IMPORTED_MODULE_12__size__["a" /* default */],
  empty: __WEBPACK_IMPORTED_MODULE_13__empty__["a" /* default */],
  each: __WEBPACK_IMPORTED_MODULE_14__each__["a" /* default */],
  attr: __WEBPACK_IMPORTED_MODULE_15__attr__["a" /* default */],
  style: __WEBPACK_IMPORTED_MODULE_16__style__["a" /* default */],
  property: __WEBPACK_IMPORTED_MODULE_17__property__["a" /* default */],
  classed: __WEBPACK_IMPORTED_MODULE_18__classed__["a" /* default */],
  text: __WEBPACK_IMPORTED_MODULE_19__text__["a" /* default */],
  html: __WEBPACK_IMPORTED_MODULE_20__html__["a" /* default */],
  raise: __WEBPACK_IMPORTED_MODULE_21__raise__["a" /* default */],
  lower: __WEBPACK_IMPORTED_MODULE_22__lower__["a" /* default */],
  append: __WEBPACK_IMPORTED_MODULE_23__append__["a" /* default */],
  insert: __WEBPACK_IMPORTED_MODULE_24__insert__["a" /* default */],
  remove: __WEBPACK_IMPORTED_MODULE_25__remove__["a" /* default */],
  datum: __WEBPACK_IMPORTED_MODULE_26__datum__["a" /* default */],
  on: __WEBPACK_IMPORTED_MODULE_27__on__["c" /* default */],
  dispatch: __WEBPACK_IMPORTED_MODULE_28__dispatch__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = selection;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_creator__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "creator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_creator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_local__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "local", function() { return __WEBPACK_IMPORTED_MODULE_1__src_local__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_matcher__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matcher", function() { return __WEBPACK_IMPORTED_MODULE_2__src_matcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mouse__ = __webpack_require__(40);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return __WEBPACK_IMPORTED_MODULE_3__src_mouse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_namespace__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return __WEBPACK_IMPORTED_MODULE_4__src_namespace__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_namespaces__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return __WEBPACK_IMPORTED_MODULE_5__src_namespaces__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_select__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_6__src_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_selectAll__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return __WEBPACK_IMPORTED_MODULE_7__src_selectAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_selection_index__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return __WEBPACK_IMPORTED_MODULE_8__src_selection_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_selector__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return __WEBPACK_IMPORTED_MODULE_9__src_selector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectorAll", function() { return __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_touch__ = __webpack_require__(70);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return __WEBPACK_IMPORTED_MODULE_11__src_touch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_touches__ = __webpack_require__(71);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touches", function() { return __WEBPACK_IMPORTED_MODULE_12__src_touches__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_window__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "window", function() { return __WEBPACK_IMPORTED_MODULE_13__src_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_selection_on__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return __WEBPACK_IMPORTED_MODULE_14__src_selection_on__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "customEvent", function() { return __WEBPACK_IMPORTED_MODULE_14__src_selection_on__["b"]; });

















/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = exports.Config = {
  prefix: "measure-tool",
  tooltipText1: 'Drag to change, click to remove',
  tooltipText2: 'Drag to change'
};

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__namespaces__ = __webpack_require__(6);



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */] && document.documentElement.namespaceURI === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */]
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespaces__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */].hasOwnProperty(prefix) ? {space: __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */][prefix], local: name} : name;
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return xhtml; });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ __webpack_exports__["a"] = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return event; });
/* harmony export (immutable) */ __webpack_exports__["b"] = customEvent;
var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ __webpack_exports__["c"] = function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
};

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function none() {}

/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_on__ = __webpack_require__(8);


/* harmony default export */ __webpack_exports__["a"] = function() {
  var current = __WEBPACK_IMPORTED_MODULE_0__selection_on__["a" /* event */], source;
  while (source = current.sourceEvent) current = source;
  return current;
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
};


/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var UnitTypeId = exports.UnitTypeId = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
  NAUTICAL: 'nautical'
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noevent__ = __webpack_require__(15);
/* harmony export (immutable) */ __webpack_exports__["b"] = yesdrag;



/* harmony default export */ __webpack_exports__["a"] = function(view) {
  var root = view.document.documentElement,
      selection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["select"])(view).on("dragstart.drag", __WEBPACK_IMPORTED_MODULE_1__noevent__["a" /* default */], true);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", __WEBPACK_IMPORTED_MODULE_1__noevent__["a" /* default */], true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
};

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["select"])(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", __WEBPACK_IMPORTED_MODULE_1__noevent__["a" /* default */], true);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = nopropagation;


function nopropagation() {
  __WEBPACK_IMPORTED_MODULE_0_d3_selection__["event"].stopImmediatePropagation();
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  __WEBPACK_IMPORTED_MODULE_0_d3_selection__["event"].preventDefault();
  __WEBPACK_IMPORTED_MODULE_0_d3_selection__["event"].stopImmediatePropagation();
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = matcher;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["b"] = EnterNode;



/* harmony default export */ __webpack_exports__["a"] = function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._enter || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
};

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(update) {
  return new Array(update.length);
};


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(2);

var _contextMenu = __webpack_require__(72);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenu = function () {
  _createClass(ContextMenu, [{
    key: 'left',
    get: function get() {
      return this._containerDiv.getBoundingClientRect().left;
    }
  }, {
    key: 'top',
    get: function get() {
      return this._containerDiv.getBoundingClientRect().top;
    }
  }, {
    key: 'width',
    get: function get() {
      return this._containerDiv.getBoundingClientRect().width;
    }
  }, {
    key: 'height',
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
    this._containerDiv.classList.add(_config.Config.prefix + '-context-menu');
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
    key: 'addItem',
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
    key: 'hideItem',
    value: function hideItem(item) {
      item.style.cssText = 'display: none';
    }
  }, {
    key: 'showItem',
    value: function showItem(item) {
      item.style.cssText = 'display: block';
    }
  }, {
    key: 'toggleItems',
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
    key: 'show',
    value: function show(point) {
      this._isVisible = true;
      this._containerDiv.style.cssText = '\n      display: block;\n      visibility: hidden;\n      position: absolute;\n      width: ' + this._options.width + 'px; \n    ';
      var isXOverflow = this._parentDiv.getBoundingClientRect().width <= point.x + this.width;
      var isYOverflow = this._parentDiv.getBoundingClientRect().height <= point.y + this.height;

      this._containerDiv.style.cssText += '\n      ' + (isXOverflow ? "right: 0px;" : "left: " + point.x + "px;") + '\n      ' + (isYOverflow ? "bottom: 14px;" : "top: " + point.y + "px;") + '\n      visibility: visible;\n    ';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._isVisible = false;
      this._containerDiv.style.cssText = 'display: none';
    }
  }, {
    key: 'toggle',
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
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var EVENT_START = 'measure_start';
var EVENT_END = 'measure_end';
var EVENT_CHANGE = 'measure_change';

exports.EVENT_START = EVENT_START;
exports.EVENT_END = EVENT_END;
exports.EVENT_CHANGE = EVENT_CHANGE;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geometry = exports.Geometry = function () {
  _createClass(Geometry, [{
    key: "nodes",
    get: function get() {
      return this._nodes;
    }
  }, {
    key: "lines",
    get: function get() {
      var segments = [];
      if (this._nodes.length > 1) {
        for (var i = 1; i < this._nodes.length; i++) {
          segments.push([this._nodes[i - 1], this._nodes[i]]);
        }
      }
      return segments;
    }
  }]);

  function Geometry() {
    _classCallCheck(this, Geometry);

    this._nodes = [];
  }

  _createClass(Geometry, [{
    key: "addNode",
    value: function addNode(point) {
      this._nodes.push(point);
    }
  }, {
    key: "updateNode",
    value: function updateNode(i, newPoint) {
      this._nodes[i] = newPoint;
    }
  }, {
    key: "removeNode",
    value: function removeNode(i) {
      this._nodes.splice(i, 1);
    }
  }, {
    key: "insertNode",
    value: function insertNode(i, point) {
      this._nodes.splice(i, 0, point);
    }
  }]);

  return Geometry;
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UnitTypeId = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
  function Helper(options) {
    _classCallCheck(this, Helper);

    this._options = {
      unit: _UnitTypeId.UnitTypeId.METRIC
    };
    Object.assign(this._options, options);
    this.init();
  }

  _createClass(Helper, [{
    key: 'init',
    value: function init() {
      this.initUnits();
    }
  }, {
    key: 'initUnits',
    value: function initUnits() {
      switch (this._options.unit.toLowerCase()) {
        case _UnitTypeId.UnitTypeId.METRIC:
          this._lengthMultiplier = 1;
          this.formatLength = this._formatLengthMetric;
          this._areaMultiplier = 1;
          this.formatArea = this._formatAreaMetric;
          break;
        case _UnitTypeId.UnitTypeId.IMPERIAL:
          this._lengthMultiplier = 3.28084;
          this.formatLength = this._formatLengthImperial;
          this._areaMultiplier = 10.7639;
          this.formatArea = this._formatAreaImperial;
          break;
        case _UnitTypeId.UnitTypeId.NAUTICAL:
          this._lengthMultiplier = 1;
          this.formatLength = this._formatLengthNautical;
          this._areaMultiplier = 1;
          this.formatArea = this._formatAreaMetric;
          break;
        default:
          this._lengthMultiplier = 1;
          this.formatLength = this._formatLengthMetric;
          this._areaMultiplier = 1;
          this.formatArea = this._formatAreaMetric;
          break;
      }
    }

    /**
     * Updates a configuration option with a new value.  This is passed from the main index.js setOption function
     * @param option - option to update
     * @param value - value to set
     */

  }, {
    key: 'setOption',
    value: function setOption(option, value) {
      if (!this._options[option]) {
        throw new Error(option + ' is not a valid option on MeasureTool helper');
      }

      // TODO: figure out some option validation
      this._options[option] = value;

      this.initUnits();
    }

    /**
     * Calculate the distance in meters between two points.
     * @param p1
     * @param p2
     * @return {*}
     */

  }, {
    key: 'computeLengthBetween',
    value: function computeLengthBetween(p1, p2) {
      return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(p1[1], p1[0]), new google.maps.LatLng(p2[1], p2[0])) * this._lengthMultiplier;
    }
  }, {
    key: 'computePathLength',
    value: function computePathLength(points) {
      var sum = 0;
      for (var i = 1; i < points.length; i++) {
        sum += google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(points[i - 1][1], points[i - 1][0]), new google.maps.LatLng(points[i][1], points[i][0]));
      }
      return sum * this._lengthMultiplier;
    }
  }, {
    key: 'computeArea',
    value: function computeArea(points) {
      return google.maps.geometry.spherical.computeArea(points.map(function (p) {
        return new google.maps.LatLng(p[1], p[0]);
      })) * this._areaMultiplier;
    }
  }, {
    key: '_formatLengthMetric',
    value: function _formatLengthMetric(value) {
      var unit = void 0;
      if (value / 1000 >= 1) {
        unit = 'km';
        value /= 1000;
      } else {
        unit = 'm';
      }
      return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
    }
  }, {
    key: '_formatLengthImperial',
    value: function _formatLengthImperial(value) {
      var unit = void 0;
      if (value / 5280 >= 1) {
        unit = 'mi';
        value /= 5280;
      } else {
        unit = 'ft';
      }
      return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
    }
  }, {
    key: '_formatLengthNautical',
    value: function _formatLengthNautical(value) {
      var unit = 'NM';
      value /= 1852;
      return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
    }
  }, {
    key: '_formatAreaMetric',
    value: function _formatAreaMetric(value) {
      var unit = void 0;
      if (value / 1000000 >= 1) {
        unit = 'km²';
        value /= 1000000;
      } else {
        unit = 'm²';
      }
      return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
    }
  }, {
    key: '_formatAreaImperial',
    value: function _formatAreaImperial(value) {
      var unit = void 0;
      if (value * 3.587e-8 >= 1) {
        unit = 'mi²';
        value *= 3.587e-8;
      } else {
        unit = 'ft²';
      }
      return this._numberToLocale(this._roundUp(value, 2)) + ' ' + unit;
    }
  }, {
    key: '_roundUp',
    value: function _roundUp(value, decimals) {
      return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
    }
  }, {
    key: '_numberToLocale',
    value: function _numberToLocale(number) {
      return new Intl.NumberFormat().format(number);
    }

    /**
     * Calculate the LatLng which lies the given fraction of the way between the origin LatLng and the destination LatLng.
     * @param p1
     * @param p2
     * @param fraction
     * @return {*}
     * @private
     */

  }], [{
    key: 'findTouchPoint',
    value: function findTouchPoint(segment, point) {
      var k = ((segment[1][1] - segment[0][1]) * (point[0] - segment[0][0]) - (segment[1][0] - segment[0][0]) * (point[1] - segment[0][1])) / (Math.pow(segment[1][1] - segment[0][1], 2) + Math.pow(segment[1][0] - segment[0][0], 2));
      return [point[0] - k * (segment[1][1] - segment[0][1]), point[1] + k * (segment[1][0] - segment[0][0])];
    }
  }, {
    key: 'findMidPoint',
    value: function findMidPoint(segment) {
      return [(segment[0][0] + segment[1][0]) / 2, (segment[0][1] + segment[1][1]) / 2];
    }
  }, {
    key: 'transformText',
    value: function transformText(p1, p2) {
      var mid = Helper.findMidPoint([p1, p2]);
      var angle = void 0;
      if (p1[0] === p2[0]) {
        if (p2[1] > p1[1]) angle = 90;else if (p2[1] < p1[1]) angle = 270;else angle = 0;
      } else {
        angle = Math.atan((p2[1] - p1[1]) / (p2[0] - p1[0])) * 180 / Math.PI;
      }
      return 'translate(' + mid[0] + ', ' + mid[1] + ') rotate(' + angle + ')';
    }
  }, {
    key: 'makeId',
    value: function makeId(n) {
      return (Math.random().toString(36) + '00000000000000000').slice(2, n + 2);
    }
  }, {
    key: '_interpolate',
    value: function _interpolate(p1, p2, fraction) {
      var point = google.maps.geometry.spherical.interpolate(new google.maps.LatLng(p1[1], p1[0]), new google.maps.LatLng(p2[1], p2[0]), fraction);
      return [point.lng(), point.lat()];
      // use interception equation y = mx + b
      // let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
      // let b = p1[1] - m * p1[0];
      // let x = p1[0] + (p2[0] - p1[0]) * fraction;
      // let y = m * x + b;
      // return [x, y];
    }
  }]);

  return Helper;
}();

exports.default = Helper;
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ObjectAssign = exports.ObjectAssign = function ObjectAssign() {
  if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
      'use strict';

      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectionUtility = function () {
  function ProjectionUtility(div, projection, options) {
    _classCallCheck(this, ProjectionUtility);

    this._defaultOptions = {
      offsetRate: 8000
    };
    this._options = Object.assign({}, this._defaultOptions, options || {});
    this._container = div;
    this._projection = projection;
  }

  _createClass(ProjectionUtility, [{
    key: "latLngToSvgPoint",
    value: function latLngToSvgPoint(coords) {
      var rate = this._options.offsetRate / 2;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var svgPoint = this._projection.fromLatLngToDivPixel(latLng);
      return [svgPoint.x + rate, svgPoint.y + rate];
    }
  }, {
    key: "svgPointToLatLng",
    value: function svgPointToLatLng(point) {
      var rate = this._options.offsetRate / 2;
      var svgPoint = new google.maps.Point(point[0] - rate, point[1] - rate);
      var coords = this._projection.fromDivPixelToLatLng(svgPoint);
      return [coords.lng(), coords.lat()];
    }
  }, {
    key: "svgPointToContainerPoint",
    value: function svgPointToContainerPoint(point) {
      var svgPoint = this.svgPointToLatLng(point);
      return this._projection.fromLatLngToContainerPixel(new google.maps.LatLng(svgPoint[1], svgPoint[0]));
    }
  }, {
    key: "latLngToContainerPoint",
    value: function latLngToContainerPoint(coords) {
      return this._projection.fromLatLngToContainerPixel(new google.maps.LatLng(coords[1], coords[0]));
    }
  }]);

  return ProjectionUtility;
}();

exports.default = ProjectionUtility;
;
module.exports = exports["default"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Segment = exports.Segment = function () {
  function Segment(start, end, length, lengthText) {
    _classCallCheck(this, Segment);

    this._start = start;
    this._end = end;
    this._length = length;
    this._lengthText = lengthText;
  }

  _createClass(Segment, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        "start_location": {
          "lat": this._start[1],
          "lng": this._start[0]
        },
        "end_location": {
          "lat": this._end[1],
          "lng": this._end[0]
        },
        "length": {
          "text": this._lengthText,
          "value": this._length
        }
      };
    }
  }]);

  return Segment;
}();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(2);

var _tooltip = __webpack_require__(73);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  function Tooltip(div) {
    _classCallCheck(this, Tooltip);

    this._parentDiv = div;
    this._containerDiv = document.createElement('div');
    this._containerDiv.classList.add(_config.Config.prefix + '-tooltip');
    this._containerDiv.stylesheet = _tooltip2.default;
    div.appendChild(this._containerDiv);
  }

  _createClass(Tooltip, [{
    key: 'show',
    value: function show(point, text) {
      this._containerDiv.innerHTML = text;
      this._containerDiv.style.cssText = '\n      display: block;\n      visibility: hidden;\n      position: absolute;\n    ';
      var w = this._parentDiv.getBoundingClientRect().width;
      var h = this._parentDiv.getBoundingClientRect().height;
      this._containerDiv.style.cssText += point.x < w / 2 ? 'left: ' + point.x + 'px;' : 'right: ' + (w - point.x) + 'px;';
      this._containerDiv.style.cssText += point.y < h / 2 ? 'top: ' + point.y + 'px' : 'bottom: ' + (h - point.y) + 'px;';
      this._containerDiv.style.cssText += 'visibility: visible;';
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._containerDiv.style.cssText = 'display: none';
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_drag__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "drag", function() { return __WEBPACK_IMPORTED_MODULE_0__src_drag__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_nodrag__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dragDisable", function() { return __WEBPACK_IMPORTED_MODULE_1__src_nodrag__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dragEnable", function() { return __WEBPACK_IMPORTED_MODULE_1__src_nodrag__["b"]; });




/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, ".measure-tool-context-menu {\n  font-family: Roboto, Arial, sans-serif;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  outline: none;\n  position: fixed;\n  display: none;\n  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);\n  transform: translate3d(0, 0, 0);\n  max-width: 265px;\n  z-index: 1;\n  outline-offset: -2px;\n  background: #fff;\n  padding: 6px 0;\n  white-space: nowrap;\n  cursor: default;\n  margin: 0; }\n  .measure-tool-context-menu ul {\n    padding: 0px;\n    margin: 0px;\n    background-color: white; }\n    .measure-tool-context-menu ul li {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      border-color: transparent;\n      border-style: dotted;\n      border-width: 1px 0;\n      color: #333;\n      font-size: 13px;\n      font-weight: normal;\n      margin: 0;\n      padding: 4px 44px 4px 16px;\n      position: relative;\n      white-space: nowrap; }\n      .measure-tool-context-menu ul li:hover {\n        background-color: #f1f1f1;\n        border-color: #f1f1f1;\n        color: #222;\n        transition: background 0s; }\n", "", {"version":3,"sources":["/./src/context-menu.scss"],"names":[],"mappings":"AACA;EACE,uCAFqC;EAGrC,qCAAiC;EACjC,cAAa;EACb,gBAAe;EACf,cAAa;EAEb,yCAAqC;EACrC,gCAA6B;EAC7B,iBAAgB;EAChB,WAAU;EACV,qBAAoB;EAEpB,iBAAgB;EAChB,eAAc;EACd,oBAAmB;EACnB,gBAAe;EACf,UAAS,EA6BV;EA9CD;IAmBI,aAAY;IACZ,YAAW;IACX,wBAAuB,EAwBxB;IA7CH;MAwBM,gBAAe;MACf,cAAa;MACb,oBAAmB;MACnB,0BAAyB;MACzB,qBAAoB;MACpB,oBAAmB;MACnB,YAAW;MACX,gBAAe;MACf,oBAAmB;MACnB,UAAS;MACT,2BAA0B;MAC1B,mBAAkB;MAClB,oBAAmB,EAQpB;MA5CL;QAuCQ,0BAAyB;QACzB,sBAAqB;QACrB,YAAW;QACX,0BAAyB,EAC1B","file":"context-menu.scss","sourcesContent":["$font-family: Roboto, Arial, sans-serif;\n.measure-tool-context-menu {\n  font-family: $font-family;\n  border: 1px solid rgba(0,0,0,0.2);\n  outline: none;\n  position: fixed;\n  display: none;\n\n  box-shadow: 0 2px 2px rgba(0,0,0,0.2);\n  transform: translate3d(0,0,0);\n  max-width: 265px;\n  z-index: 1;\n  outline-offset: -2px;\n\n  background: #fff;\n  padding: 6px 0;\n  white-space: nowrap;\n  cursor: default;\n  margin: 0;\n  ul {\n    padding: 0px;\n    margin: 0px;\n    background-color: white;\n\n    li {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      border-color: transparent;\n      border-style: dotted;\n      border-width: 1px 0;\n      color: #333;\n      font-size: 13px;\n      font-weight: normal;\n      margin: 0;\n      padding: 4px 44px 4px 16px;\n      position: relative;\n      white-space: nowrap;\n\n      &:hover {\n        background-color: #f1f1f1;\n        border-color: #f1f1f1;\n        color: #222;\n        transition: background 0s;\n      }\n    }\n  }\n}"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, ".measure-tool-svg-overlay {\n  position: absolute;\n  top: -4000px;\n  left: -4000px;\n  width: 8000px;\n  height: 8000px; }\n\n.dragging-circle,\n.cover-circle {\n  fill: white;\n  stroke: black;\n  stroke-width: 2.5px; }\n  .dragging-circle:hover,\n  .cover-circle:hover {\n    cursor: pointer; }\n\n.grey-circle {\n  fill: #fcfcfc;\n  stroke: #646464;\n  stroke-width: 2.5px;\n  pointer-events: none; }\n\n.base-line {\n  fill: none;\n  stroke: black;\n  stroke-width: 2.5px; }\n\n.aux-line {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 8px;\n  cursor: pointer; }\n\n.segment-measure-text {\n  stroke: black;\n  pointer-events: none; }\n\n.node-measure-text {\n  text-shadow: -1.4px -1.4px rgba(255, 255, 255, 0.4), -1.4px 1.4px rgba(255, 255, 255, 0.4), 1.4px 1.4px rgba(255, 255, 255, 0.4), 1.4px -1.4px rgba(255, 255, 255, 0.4), -1.4px 0 rgba(255, 255, 255, 0.4), 0 1.4px rgba(255, 255, 255, 0.4), 1.4px 0 rgba(255, 255, 255, 0.4), 0 -1.4px rgba(255, 255, 255, 0.4);\n  pointer-events: none; }\n  .node-measure-text.head-text {\n    visibility: hidden; }\n", "", {"version":3,"sources":["/./src/index.scss"],"names":[],"mappings":"AAEA;EACE,mBAAkB;EAClB,aAAY;EACZ,cAAa;EACb,cAAa;EACb,eAAc,EACf;;AAED;;EAEE,YAAW;EACX,cAAa;EACb,oBAAmB,EAIpB;EARD;;IAMI,gBAAe,EAChB;;AAGH;EACE,cAAwB;EACxB,gBAA0B;EAC1B,oBAAmB;EACnB,qBAAoB,EAIrB;;AAED;EACE,WAAU;EACV,cAAa;EACb,oBAAmB,EACpB;;AAED;EACE,WAAU;EACV,oBAAmB;EACnB,kBAAiB;EACjB,gBAAe,EAChB;;AAED;EACE,cAAa;EACb,qBAAoB,EACrB;;AAED;EACE,kTAjDqC;EAyDrC,qBAAoB,EAKrB;EAdD;IAYI,mBAAkB,EACnB","file":"index.scss","sourcesContent":["$opaque-white: rgba(255, 255, 255, 0.4);\n\n.measure-tool-svg-overlay{\n  position: absolute;\n  top: -4000px;\n  left: -4000px;\n  width: 8000px;\n  height: 8000px;\n}\n\n.dragging-circle,\n.cover-circle {\n  fill: white;\n  stroke: black;\n  stroke-width: 2.5px;\n  &:hover {\n    cursor: pointer;\n  }\n}\n\n.grey-circle {\n  fill: rgb(252, 252, 252);\n  stroke: rgb(100, 100, 100);\n  stroke-width: 2.5px;\n  pointer-events: none;\n  //&:hover {\n  //  cursor: pointer;\n  //}\n}\n\n.base-line {\n  fill: none;\n  stroke: black;\n  stroke-width: 2.5px;\n}\n\n.aux-line {\n  fill: none;\n  stroke: transparent;\n  stroke-width: 8px;\n  cursor: pointer;\n}\n\n.segment-measure-text {\n  stroke: black;\n  pointer-events: none;\n}\n\n.node-measure-text {\n  text-shadow: -1.4px -1.4px $opaque-white,\n               -1.4px 1.4px $opaque-white,\n                1.4px 1.4px $opaque-white,\n                1.4px -1.4px $opaque-white,\n                -1.4px 0 $opaque-white,\n                0 1.4px $opaque-white,\n                1.4px 0 $opaque-white,\n                0 -1.4px $opaque-white;\n  pointer-events: none;\n\n  &.head-text {\n    visibility: hidden;\n  }\n}\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, ".measure-tool-tooltip {\n  display: none;\n  font-family: Roboto, Arial, sans-serif;\n  margin: 6px 15px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);\n  padding: 10px;\n  overflow: hidden;\n  pointer-events: none;\n  font-size: 0.7rem;\n  z-index: 999; }\n", "", {"version":3,"sources":["/./src/tooltip.scss"],"names":[],"mappings":"AACA;EACE,cAAa;EACb,uCAHqC;EAIrC,iBAAgB;EAChB,uBAAsB;EACtB,mBAAkB;EAClB,yCAAqC;EACrC,cAAa;EACb,iBAAgB;EAChB,qBAAoB;EACpB,kBAAiB;EACjB,aAAY,EACb","file":"tooltip.scss","sourcesContent":["$font-family: Roboto, Arial, sans-serif;\n.measure-tool-tooltip {\n  display: none;\n  font-family: $font-family;\n  margin: 6px 15px;\n  background-color: #fff;\n  border-radius: 2px;\n  box-shadow: 0 1px 4px rgba(0,0,0,0.3);\n  padding: 10px;\n  overflow: hidden;\n  pointer-events: none;\n  font-size: 0.7rem;\n  z-index: 999;\n}"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatch__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatch__["a"]; });



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ __webpack_exports__["a"] = dispatch;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(x) {
  return function() {
    return x;
  };
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_dispatch__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_selection__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nodrag__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__noevent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constant__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__event__ = __webpack_require__(37);







// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(d) {
  return d == null ? {x: __WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].x, y: __WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].y} : d;
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      gestures = {},
      listeners = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_dispatch__["a" /* dispatch */])("start", "drag", "end"),
      active = 0,
      mousemoving,
      touchending;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) return;
    var gesture = beforestart("mouse", container.apply(this, arguments), __WEBPACK_IMPORTED_MODULE_1_d3_selection__["mouse"], this, arguments);
    if (!gesture) return;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["select"])(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__nodrag__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].view);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["b" /* nopropagation */])();
    mousemoving = false;
    gesture("start");
  }

  function mousemoved() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["a" /* default */])();
    mousemoving = true;
    gestures.mouse("drag");
  }

  function mouseupped() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["select"])(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].view).on("mousemove.drag mouseup.drag", null);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__nodrag__["b" /* yesdrag */])(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].view, mousemoving);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["a" /* default */])();
    gestures.mouse("end");
  }

  function touchstarted() {
    if (!filter.apply(this, arguments)) return;
    var touches = __WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].changedTouches,
        c = container.apply(this, arguments),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(touches[i].identifier, c, __WEBPACK_IMPORTED_MODULE_1_d3_selection__["touch"], this, arguments)) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["b" /* nopropagation */])();
        gesture("start");
      }
    }
  }

  function touchmoved() {
    var touches = __WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["a" /* default */])();
        gesture("drag");
      }
    }
  }

  function touchended() {
    var touches = __WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__noevent__["b" /* nopropagation */])();
        gesture("end");
      }
    }
  }

  function beforestart(id, container, point, that, args) {
    var p = point(container, id), s, dx, dy,
        sublisteners = listeners.copy();

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["customEvent"])(new __WEBPACK_IMPORTED_MODULE_5__event__["a" /* default */](drag, "beforestart", s, id, active, p[0], p[1], 0, 0, sublisteners), function() {
      if ((__WEBPACK_IMPORTED_MODULE_1_d3_selection__["event"].subject = s = subject.apply(that, args)) == null) return false;
      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;
      return true;
    })) return;

    return function gesture(type) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[id] = gesture, n = active++; break;
        case "end": delete gestures[id], --active; // nobreak
        case "drag": p = point(container, id), n = active; break;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["customEvent"])(new __WEBPACK_IMPORTED_MODULE_5__event__["a" /* default */](drag, type, s, id, n, p[0] + dx, p[1] + dy, p[0] - p0[0], p[1] - p0[1], sublisteners), sublisteners.apply, sublisteners, [type, that, args]);
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__constant__["a" /* default */])(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__constant__["a" /* default */])(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__constant__["a" /* default */])(_), drag) : subject;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  return drag;
};


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DragEvent;
function DragEvent(target, type, subject, id, active, x, y, dx, dy, dispatch) {
  this.target = target;
  this.type = type;
  this.subject = subject;
  this.identifier = id;
  this.active = active;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this._ = dispatch;
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(x) {
  return function() {
    return x;
  };
};


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = local;
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(7);



/* harmony default export */ __webpack_exports__["a"] = function(node) {
  var event = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])();
  if (event.changedTouches) event = event.changedTouches[0];
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, event);
};


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[document.querySelector(selector)]], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[selector]], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
};


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([document.querySelectorAll(selector)], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([selector == null ? [] : selector], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
};


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
};


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(5);


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
};


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enter__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(38);




var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
};


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(11);


function dispatchEvent(node, type, params) {
  var window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node),
      event = window.CustomEvent;

  if (event) {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
};


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
};


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  return !this.node();
};


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._exit || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
};


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matcher__ = __webpack_require__(16);



/* harmony default export */ __webpack_exports__["a"] = function(match) {
  if (typeof match !== "function") match = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__matcher__["a" /* default */])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
};


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
};


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(9);



function constantNull() {
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = function(name, before) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(lower);
};


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](merges, this._parents);
};


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
};


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
};


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
};


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
};


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(raise);
};


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(remove);
};


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(9);



/* harmony default export */ __webpack_exports__["a"] = function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
};


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectorAll__ = __webpack_require__(19);



/* harmony default export */ __webpack_exports__["a"] = function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectorAll__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, parents);
};


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
};


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](sortgroups, this._parents).order();
};

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(11);


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value, priority) {
  var node;
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node = this.node())
          .getComputedStyle(node, null)
          .getPropertyValue(name);
};


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
};


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(7);



/* harmony default export */ __webpack_exports__["a"] = function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touch);
    }
  }

  return null;
};


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(7);



/* harmony default export */ __webpack_exports__["a"] = function(node, touches) {
  if (touches == null) touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touches[i]);
  }

  return points;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./context-menu.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./context-menu.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(12)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./tooltip.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/sass-loader/lib/loader.js??ref--1-2!./tooltip.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(29);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(2);

var _contextMenu = __webpack_require__(20);

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _tooltip = __webpack_require__(27);

var _tooltip2 = _interopRequireDefault(_tooltip);

var _d3Selection = __webpack_require__(1);

var _projectionUtility = __webpack_require__(25);

var _projectionUtility2 = _interopRequireDefault(_projectionUtility);

var _geometry = __webpack_require__(22);

var _segment = __webpack_require__(26);

var _d3Drag = __webpack_require__(28);

var _helper = __webpack_require__(23);

var _helper2 = _interopRequireDefault(_helper);

var _UnitTypeId = __webpack_require__(13);

var _events = __webpack_require__(21);

var _polyfills = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeasureTool = function () {
  _createClass(MeasureTool, [{
    key: 'lengthText',
    get: function get() {
      return this._helper.formatLength(this._length || 0);
    }
  }, {
    key: 'areaText',
    get: function get() {
      return this._helper.formatArea(this._area || 0);
    }
  }, {
    key: 'length',
    get: function get() {
      return this._length || 0;
    }
  }, {
    key: 'area',
    get: function get() {
      return this._area || 0;
    }
  }, {
    key: 'segments',
    get: function get() {
      return this._segments || [];
    }
  }], [{
    key: 'UnitTypeId',
    get: function get() {
      return _UnitTypeId.UnitTypeId;
    }
  }]);

  function MeasureTool(map, options) {
    _classCallCheck(this, MeasureTool);

    this._initPolyfills();

    this._options = {
      showSegmentLength: true,
      showAccumulativeLength: true,
      contextMenu: true,
      tooltip: true,
      unit: _UnitTypeId.UnitTypeId.METRIC
    };
    Object.assign(this._options, options);
    this._map = map;
    this._map.setClickableIcons(false);
    this._id = _helper2.default.makeId(4);
    this._events = new Map();
    this._init();
  }

  _createClass(MeasureTool, [{
    key: '_initPolyfills',
    value: function _initPolyfills() {
      (0, _polyfills.ObjectAssign)();
    }
  }, {
    key: '_init',
    value: function _init() {
      this._containerDiv = this._map.getDiv().querySelector("div:first-child");

      if (this._options.contextMenu) {
        this._contextMenu = new _contextMenu2.default(this._containerDiv, { width: 160 });
        this._startElementNode = this._contextMenu.addItem("Measure distance", true, this.start, this);
        this._endElementNode = this._contextMenu.addItem("Clear measurement", false, this.end, this);
        this._bindToggleContextMenu();
      }

      if (this._options.tooltip) {
        this._tooltip = new _tooltip2.default(this._containerDiv);
      }

      this._helper = new _helper2.default({
        unit: this._options.unit
      });
      this._initOverlay();
    }
  }, {
    key: '_bindToggleContextMenu',
    value: function _bindToggleContextMenu() {
      var _this = this;

      this._map.addListener('rightclick', function (mouseEvent) {
        _this._firstClick = mouseEvent;
        _this._contextMenu.show(_this._projection.fromLatLngToContainerPixel(mouseEvent.latLng));
      });
      document.addEventListener('keydown', function (event) {
        if (event.which === 27) {
          _this._contextMenu.hide();
        }
      });
      this._containerDiv.addEventListener('mousedown', function (event) {
        if (event.clientX >= _this._contextMenu.left && event.clientX <= _this._contextMenu.left + _this._contextMenu.width && event.clientY >= _this._contextMenu.top && event.clientY <= _this._contextMenu.top + _this._contextMenu.height) {
          return;
        }
        _this._contextMenu.hide();
      });
    }

    /**
     * start measuring
     */

  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (this._started) return;
      this._overlay.setMap(this._map);
      this._geometry = new _geometry.Geometry();
      this._segments = [];

      if (this._options.contextMenu && this._firstClick) {
        this._checkClick(this._firstClick);
        this._contextMenu.toggleItems([this._endElementNode], [this._startElementNode]);
      }

      this._mapClickEvent = this._map.addListener('click', function (mouseEvent) {
        return _this2._checkClick(mouseEvent);
      });
      this._mapZoomChangedEvent = this._map.addListener('zoom_changed', function () {
        return _this2._redrawOverlay();
      });
      this._map.setOptions({ draggableCursor: 'default' });
      this._started = true;

      if (typeof this._events.get(_events.EVENT_START) === "function") {
        this._events.get(_events.EVENT_START)();
      }
    }

    /**
     * end measuring
     */

  }, {
    key: 'end',
    value: function end() {
      if (!this._started) return;
      if (this._options.contextMenu) {
        this._contextMenu.toggleItems([this._startElementNode], [this._endElementNode]);
      }

      this._mapClickEvent.remove();
      this._mapZoomChangedEvent.remove();

      this._geometry = new _geometry.Geometry();
      this._onRemoveOverlay();
      this._setOverlay();
      this._overlay.setMap(null);
      this._map.setOptions({ draggableCursor: null });
      this._started = false;

      if (typeof this._events.get(_events.EVENT_END) === "function") {
        this._events.get(_events.EVENT_END)({
          result: {
            length: this.length,
            lengthText: this.lengthText,
            area: this.area,
            areaText: this.areaText,
            segments: this.segments
          }
        });
      }
    }

    /**
     * register an event
     * @param event - available events: 'measure-start', 'measure-end'
     * @param cb - callback function
     */

  }, {
    key: 'addListener',
    value: function addListener(event, cb) {
      this._events.set(event, cb);
    }

    /**
     * unregister an event
     * @param event - available events: 'measure-start', 'measure-end'
     */

  }, {
    key: 'removeListener',
    value: function removeListener(event) {
      this._events.delete(event);
    }

    /**
     * Updates a configuration option with a new value
     * @param option - option to update
     * @param value - value to set
     */

  }, {
    key: 'setOption',
    value: function setOption(option, value) {
      if (!this._options[option]) {
        throw new Error(option + ' is not a valid option on MeasureTool');
      }

      // TODO: figure out some option validation
      this._options[option] = value;

      // if this is an option that exists on the helper, try to set it there as well
      if (this._helper._options[option]) {
        this._helper.setOption(option, value);
      }

      // update any values that might be there
      if (this._overlay && this._nodeCircles) {
        // only do this if there is actually an overlay to re-render
        this._redrawOverlay();
      }
    }
  }, {
    key: '_initOverlay',
    value: function _initOverlay() {
      this._setOverlay();
      this._initComplete = false;
    }
  }, {
    key: '_setOverlay',
    value: function _setOverlay() {
      this._overlay = new google.maps.OverlayView();
      this._overlay.onAdd = this._onAddOverlay.bind(this);
      this._overlay.draw = this._onDrawOverlay.bind(this);
      this._overlay.onRemove = this._onRemoveOverlay.bind(this);
      this._overlay.setMap(this._map);
    }
  }, {
    key: '_onAddOverlay',
    value: function _onAddOverlay() {
      if (!this._initComplete) {
        this._initComplete = true;
      }

      this._projection = this._overlay.getProjection();
      this._projectionUtility = new _projectionUtility2.default(this._containerDiv, this._projection);
      // Add svg to Pane
      this._svgOverlay = (0, _d3Selection.select)(this._overlay.getPanes().overlayMouseTarget).append('div').attr('class', _config.Config.prefix + '-measure-points-' + this._id).append('svg').attr('class', _config.Config.prefix + '-svg-overlay');

      this._linesBase = this._svgOverlay.append('g').attr('class', 'base');
      this._linesBase.selectAll("line").data(this._geometry ? this._geometry.lines : []);

      this._linesAux = this._svgOverlay.append('g').attr('class', 'aux');
      this._linesAux.selectAll("line").data(this._geometry ? this._geometry.lines : []);

      this._nodeCircles = this._svgOverlay.append('g').attr('class', 'node-circle');
      this._nodeCircles.selectAll('circle').data(this._geometry ? this._geometry.nodes : []);

      if (this._options.showSegmentLength) {
        this._segmentText = this._svgOverlay.append('g').attr('class', 'segment-text');
        this._segmentText.selectAll('text').data(this._geometry ? this._geometry.lines : []);
      }

      if (this._options.showAccumulativeLength) {
        this._nodeText = this._svgOverlay.append('g').attr('class', 'node-text');
        this._nodeText.selectAll('text').data(this._geometry ? this._geometry.nodes : []);
      }

      this._hoverCircle = this._svgOverlay.append('g').attr('class', 'hover-circle');
      this._hoverCircle.append("circle").attr('class', 'grey-circle').attr('r', 5);

      if (this._initComplete && !this._started) {
        this._overlay.setMap(null);
      }
    }

    /**
     * Update svg stuff here
     * @private
     */

  }, {
    key: '_onDrawOverlay',
    value: function _onDrawOverlay() {
      this._updateCircles();
      this._updateLine();
      if (this._options.showSegmentLength) {
        this._updateSegmentText();
      }
      if (this._options.showAccumulativeLength) {
        this._updateNodeText();
      }
      if (this._geometry) {
        this._updateArea(this._geometry.nodes.length - 1, this._geometry.nodes[this._geometry.nodes.length - 1]);
      }
      this._dispatchMeasureEvent();
    }
  }, {
    key: '_onRemoveOverlay',
    value: function _onRemoveOverlay() {
      (0, _d3Selection.select)('.' + _config.Config.prefix + '-measure-points-' + this._id).remove();
    }

    /**
     * In some cases we must redraw overlay so the svg container size gets recomputed
     * whenever the map scale changes. we usually bind this map resize or similar events.
     * @private
     */

  }, {
    key: '_redrawOverlay',
    value: function _redrawOverlay() {
      this._onRemoveOverlay();
      this._setOverlay();
      this._overlay.draw();
    }
  }, {
    key: '_checkClick',
    value: function _checkClick(mouseEvent) {
      // Use circle radius 'r' as a flag to determine if it is a delete or add event.
      if (!this._dragged && this._nodeCircles.selectAll('circle[r="6"]').size() == 0 && !this._hoverCircle.select("circle").attr('cx')) {
        var latLng = [mouseEvent.latLng.lng(), mouseEvent.latLng.lat()];
        this._geometry.addNode(latLng);
        this._overlay.draw();
      }
      this._dragged = false;
    }
  }, {
    key: '_updateCircles',
    value: function _updateCircles() {
      var _this3 = this;

      var self = this;
      // join with old data
      var circles = this._nodeCircles.selectAll("circle").data(this._geometry ? this._geometry.nodes : []).attr('class', function (d, i) {
        return i === 0 ? 'cover-circle head-circle' : 'cover-circle';
      }).attr('r', 5).attr('cx', function (d) {
        return _this3._projectionUtility.latLngToSvgPoint(d)[0];
      }).attr('cy', function (d) {
        return _this3._projectionUtility.latLngToSvgPoint(d)[1];
      }).on('mouseover', function (d, i) {
        self._onOverCircle(d, i, this);
      }).on('mouseout', function (d) {
        self._onOutCircle(d, this);
      }).on('touchstart', function (d, i) {
        self._onOverCircle(d, i, this);
      }).on('touchleave', function (d) {
        self._onOutCircle(d, this);
      }).on('mousedown', function () {
        return _this3._hideTooltip();
      }).call(this._onDragCircle());

      // enter and seat the new data with same style.
      circles.enter().append('circle').attr('class', 'cover-circle').attr('r', 5).attr('cx', function (d) {
        return _this3._projectionUtility.latLngToSvgPoint(d)[0];
      }).attr('cy', function (d) {
        return _this3._projectionUtility.latLngToSvgPoint(d)[1];
      }).on('mouseover', function (d, i) {
        self._onOverCircle(d, i, this);
      }).on('mouseout', function (d) {
        self._onOutCircle(d, this);
      }).on('touchstart', function (d, i) {
        self._onOverCircle(d, i, this);
      }).on('touchleave', function (d) {
        self._onOutCircle(d, this);
      }).on('mousedown', function () {
        return _this3._hideTooltip();
      }).call(this._onDragCircle());

      this._nodeCircles.selectAll(".removed-circle").remove();
    }
  }, {
    key: '_updateLine',
    value: function _updateLine() {
      var _this4 = this;

      this._segments = [];

      var linesBase = this._linesBase.selectAll("line").data(this._geometry ? this._geometry.lines : []).attr("class", "base-line").attr('x1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[0];
      }).attr('y1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[1];
      }).attr('x2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[0];
      }).attr('y2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[1];
      }).each(function (d) {
        return _this4._updateSegment(d);
      });

      linesBase.enter().append('line').attr("class", "base-line").attr('x1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[0];
      }).attr('y1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[1];
      }).attr('x2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[0];
      }).attr('y2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[1];
      }).each(function (d) {
        return _this4._updateSegment(d);
      });

      linesBase.exit().remove();

      var linesAux = this._linesAux.selectAll("line").data(this._geometry ? this._geometry.lines : []).attr("class", "aux-line").attr('x1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[0];
      }).attr('y1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[1];
      }).attr('x2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[0];
      }).attr('y2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[1];
      }).on('mousemove', function (d) {
        var point = _helper2.default.findTouchPoint([_this4._projectionUtility.latLngToSvgPoint(d[0]), _this4._projectionUtility.latLngToSvgPoint(d[1])], [_d3Selection.event.offsetX, _d3Selection.event.offsetY]);
        _this4._updateHoverCirclePosition(point[0], point[1]);
      }).on('mouseout', function (d) {
        return _this4._hideHoverCircle();
      }).on('mousedown', function () {
        return _this4._hideTooltip();
      }).call(this._onDragLine());

      linesAux.enter().append('line').attr("class", "aux-line").attr('x1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[0];
      }).attr('y1', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[0])[1];
      }).attr('x2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[0];
      }).attr('y2', function (d) {
        return _this4._projectionUtility.latLngToSvgPoint(d[1])[1];
      }).on('mousemove', function (d) {
        var point = _helper2.default.findTouchPoint([_this4._projectionUtility.latLngToSvgPoint(d[0]), _this4._projectionUtility.latLngToSvgPoint(d[1])], [_d3Selection.event.offsetX, _d3Selection.event.offsetY]);
        _this4._updateHoverCirclePosition(point[0], point[1]);
      }).on('mouseout', function (d) {
        return _this4._hideHoverCircle();
      }).on('mousedown', function () {
        return _this4._hideTooltip();
      }).call(this._onDragLine());

      linesAux.exit().remove();
    }
  }, {
    key: '_updateSegmentText',
    value: function _updateSegmentText() {
      var _this5 = this;

      var text = this._segmentText.selectAll("text").data(this._geometry ? this._geometry.lines : []).attr('class', 'segment-measure-text').attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').attr('transform', function (d) {
        var p1 = _this5._projectionUtility.latLngToSvgPoint(d[0]);
        var p2 = _this5._projectionUtility.latLngToSvgPoint(d[1]);
        return _helper2.default.transformText(p1, p2);
      }).text(function (d, i) {
        return _this5._helper.formatLength(_this5._helper.computeLengthBetween(d[0], d[1]));
      });

      text.enter().append('text').attr('class', 'segment-measure-text').attr('text-anchor', 'middle').attr('dominant-baseline', 'text-before-edge').attr('transform', function (d) {
        var p1 = _this5._projectionUtility.latLngToSvgPoint(d[0]);
        var p2 = _this5._projectionUtility.latLngToSvgPoint(d[1]);
        return _helper2.default.transformText(p1, p2);
      }).text(function (d, i) {
        return _this5._helper.formatLength(_this5._helper.computeLengthBetween(d[0], d[1]));
      });

      text.exit().remove();
    }
  }, {
    key: '_updateNodeText',
    value: function _updateNodeText() {
      var _this6 = this;

      var text = this._nodeText.selectAll("text").data(this._geometry ? this._geometry.nodes : []).attr('class', function (d, i) {
        return i === 0 ? 'node-measure-text head-text' : 'node-measure-text';
      }).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-after-edge').attr('x', function (d) {
        return _this6._projectionUtility.latLngToSvgPoint(d)[0];
      }).attr('y', this._transformNodeTextY.bind(this)).text(function (d, i) {
        var len = _this6._helper.computePathLength(_this6._geometry.nodes.slice(0, i + 1));
        if (i === _this6._geometry.nodes.length - 1) {
          _this6._length = len;
        }
        return _this6._helper.formatLength(len);
      });

      text.enter().append('text').attr('class', function (d, i) {
        return i === 0 ? 'node-measure-text head-text' : 'node-measure-text';
      }).attr('text-anchor', 'middle').attr('dominant-baseline', 'text-after-edge').attr('x', function (d) {
        return _this6._projectionUtility.latLngToSvgPoint(d)[0];
      }).attr('y', this._transformNodeTextY.bind(this)).text(function (d, i) {
        var len = _this6._helper.computePathLength(_this6._geometry.nodes.slice(0, i + 1));
        if (i === _this6._geometry.nodes.length - 1) {
          _this6._length = len;
        }
        return _this6._helper.formatLength(len);
      });

      text.exit().remove();
    }
  }, {
    key: '_onOverCircle',
    value: function _onOverCircle(d, i, target) {
      if (this._dragging) return;
      (0, _d3Selection.select)(target).attr('r', 6);
      if (this._options.tooltip) {
        this._tooltip.show(this._projectionUtility.latLngToContainerPoint(d), i === 0 ? _config.Config.tooltipText2 : _config.Config.tooltipText1);
      }
    }
  }, {
    key: '_onOutCircle',
    value: function _onOutCircle(d, target) {
      (0, _d3Selection.select)(target).attr('r', 5);
      this._hideTooltip();
    }
  }, {
    key: '_onDragCircle',
    value: function _onDragCircle() {
      var self = this;
      var isDragged = false;

      var circleDrag = (0, _d3Drag.drag)().on('drag', function (d, i) {
        isDragged = true;
        self._dragging = true;

        (0, _d3Selection.select)(this).attr('cx', _d3Selection.event.x).attr('cy', _d3Selection.event.y);
        self._updateLinePosition.call(self, self._linesBase, i);
        self._updateLinePosition.call(self, self._linesAux, i);
        if (self._options.showSegmentLength) {
          self._updateSegmentTextPosition(i);
        }
        if (self._options.showAccumulativeLength) {
          self._updateNodeTextPosition(i);
        }
        self._updateArea(i, self._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
      });

      circleDrag.on('start', function (d) {
        _d3Selection.event.sourceEvent.stopPropagation();
        (0, _d3Selection.select)(this).raise().attr('r', 6);
        self._disableMapScroll();
      });

      circleDrag.on('end', function (d, i) {
        self._enableMapScroll();
        if (!isDragged) {
          if (i > 0) {
            self._geometry.removeNode(i);
            (0, _d3Selection.select)(this).classed('removed-circle', true);
          } else {
            self._geometry.addNode(d);
            self._dragged = true;
          }
        } else {
          self._geometry.updateNode(i, self._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
          self._showTooltipOnEvent(i === 0 ? _config.Config.tooltipText2 : _config.Config.tooltipText1);
        }
        isDragged = false;
        self._dragging = false;
        self._overlay.draw();
      });

      return circleDrag;
    }
  }, {
    key: '_onDragLine',
    value: function _onDragLine() {
      var _this7 = this;

      var isDragged = false;
      var lineDrag = (0, _d3Drag.drag)().on('drag', function (d, i) {
        _this7._dragging = true;
        if (!isDragged) {
          isDragged = true;
          _this7._geometry.insertNode(i + 1, _this7._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
          _this7._updateLine();
          if (_this7._options.showSegmentLength) {
            _this7._updateSegmentText();
          }
          if (_this7._options.showAccumulativeLength) {
            _this7._updateNodeText();
          }
        }
        _this7._updateHoverCirclePosition(_d3Selection.event.x, _d3Selection.event.y);
        _this7._updateLinePosition(_this7._linesBase, i + 1);
        _this7._updateLinePosition(_this7._linesAux, i + 1);
        if (_this7._options.showSegmentLength) {
          _this7._updateSegmentTextPosition(i + 1);
        }
        if (_this7._options.showAccumulativeLength) {
          _this7._updateNodeTextPosition(i + 1);
        }
        _this7._updateArea(i + 1, _this7._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
      });

      lineDrag.on('start', function () {
        _d3Selection.event.sourceEvent.stopPropagation();
        _this7._hoverCircle.select("circle").attr('class', "cover-circle");
        _this7._disableMapScroll();
      });

      lineDrag.on('end', function (d, i) {
        _this7._enableMapScroll();
        if (isDragged) {
          _this7._geometry.updateNode(i + 1, _this7._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
          _this7._hideHoverCircle();
          _this7._overlay.draw();
          isDragged = false;
          _this7._showTooltipOnEvent(_config.Config.tooltipText1);
        }
        _this7._updateArea(i + 1, _this7._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]));
        _this7._hoverCircle.select("circle").attr('class', "grey-circle");
        _this7._dragging = false;
      });

      return lineDrag;
    }
  }, {
    key: '_updateLinePosition',
    value: function _updateLinePosition(group, i) {
      if (i < this._geometry.lines.length) {
        group.select('line:nth-child(' + (i + 1) + ')').attr('x1', _d3Selection.event.x).attr('y1', _d3Selection.event.y);
      }
      if (i > 0) {
        group.select('line:nth-child(' + i + ')').attr('x2', _d3Selection.event.x).attr('y2', _d3Selection.event.y);
      }
    }
  }, {
    key: '_updateSegmentTextPosition',
    value: function _updateSegmentTextPosition(index) {
      var _this8 = this;

      if (index < this._geometry.lines.length) {
        this._segmentText.select('text:nth-child(' + (index + 1) + ')').attr('transform', function (d) {
          var p1 = [_d3Selection.event.x, _d3Selection.event.y];
          var p2 = _this8._projectionUtility.latLngToSvgPoint(d[1]);
          return _helper2.default.transformText(p1, p2);
        }).text(function (d) {
          return _this8._helper.formatLength(_this8._helper.computeLengthBetween(_this8._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y]), d[1]));
        });
      }
      if (index > 0) {
        this._segmentText.select('text:nth-child(' + index + ')').attr('transform', function (d) {
          var p1 = _this8._projectionUtility.latLngToSvgPoint(d[0]);
          var p2 = [_d3Selection.event.x, _d3Selection.event.y];
          return _helper2.default.transformText(p1, p2);
        }).text(function (d) {
          return _this8._helper.formatLength(_this8._helper.computeLengthBetween(d[0], _this8._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y])));
        });
      }
    }
  }, {
    key: '_updateNodeTextPosition',
    value: function _updateNodeTextPosition(index) {
      var _this9 = this;

      this._nodeText.select('text:nth-child(' + (index + 1) + ')').attr('x', _d3Selection.event.x).attr('y', function () {
        var offset = void 0;
        if (index > 0 && _this9._projectionUtility.latLngToSvgPoint(_this9._geometry.nodes[index - 1])[1] < _d3Selection.event.y) {
          offset = 23;
        } else {
          offset = -7;
        }
        return _d3Selection.event.y + offset;
      });
      this._nodeText.select('text:nth-child(' + (index + 2) + ')').attr('y', function (d) {
        var offset = void 0;
        if (index + 1 > 0 && _d3Selection.event.y < _this9._projectionUtility.latLngToSvgPoint(d)[1]) {
          offset = 23;
        } else {
          offset = -7;
        }
        return _this9._projectionUtility.latLngToSvgPoint(d)[1] + offset;
      });
      var followingNodes = this._nodeText.selectAll('text').filter(function (d, i) {
        return i >= index;
      });
      followingNodes.text(function (d, i) {
        var len = _this9._helper.computePathLength([].concat(_toConsumableArray(_this9._geometry.nodes.slice(0, index)), [_this9._projectionUtility.svgPointToLatLng([_d3Selection.event.x, _d3Selection.event.y])], _toConsumableArray(_this9._geometry.nodes.slice(index + 1, index + 1 + i))));
        if (index + i === _this9._geometry.nodes.length - 1) {
          _this9._length = len;
        }
        return _this9._helper.formatLength(len);
      });
    }
  }, {
    key: '_updateHoverCirclePosition',
    value: function _updateHoverCirclePosition(x, y) {
      this._hoverCircle.select("circle").attr('cx', x).attr('cy', y);
      if (this._dragging) return;
      if (this._options.tooltip) {
        this._tooltip.show(this._projectionUtility.svgPointToContainerPoint([x, y]), _config.Config.tooltipText2);
      }
    }
  }, {
    key: '_hideHoverCircle',
    value: function _hideHoverCircle() {
      this._hoverCircle.select("circle").attr('cx', null).attr('cy', null);
      this._hideTooltip();
    }
  }, {
    key: '_disableMapScroll',
    value: function _disableMapScroll() {
      this._zoomControl = !!document.querySelector("button[aria-label='Zoom in']");
      this._map.setOptions({ scrollwheel: false, gestureHandling: "none", zoomControl: false });
    }
  }, {
    key: '_enableMapScroll',
    value: function _enableMapScroll() {
      this._map.setOptions({ scrollwheel: true, gestureHandling: "auto", zoomControl: this._zoomControl });
    }
  }, {
    key: '_transformNodeTextY',
    value: function _transformNodeTextY(d, i) {
      var offset = void 0;
      if (i > 0 && this._geometry.nodes[i - 1][1] > d[1]) {
        offset = 23;
      } else {
        offset = -7;
      }
      return this._projectionUtility.latLngToSvgPoint(d)[1] + offset;
    }
  }, {
    key: '_updateArea',
    value: function _updateArea(i, pointToCompare) {
      if (!this._geometry) return;
      var n = this._geometry.nodes.length;
      var tolerance = 1 / 80 * this.length;
      var offset = void 0,
          area = 0;
      if (n > 2) {
        if (i === 0) {
          offset = this._helper.computeLengthBetween(this._geometry.nodes[n - 1], pointToCompare);
          area = offset > tolerance ? 0 : this._helper.computeArea([pointToCompare].concat(_toConsumableArray(this._geometry.nodes.slice(1, n - 1))));
        } else if (i === n - 1) {
          offset = this._helper.computeLengthBetween(pointToCompare, this._geometry.nodes[0]);
          area = offset > tolerance ? 0 : this._helper.computeArea(this._geometry.nodes.slice(0, n - 1));
        } else if (i > 0 && i < n - 1) {
          offset = this._helper.computeLengthBetween(this._geometry.nodes[0], this._geometry.nodes[n - 1]);
          area = offset > tolerance ? 0 : this._helper.computeArea([].concat(_toConsumableArray(this._geometry.nodes.slice(0, i)), [pointToCompare], _toConsumableArray(this._geometry.nodes.slice(i + 1))));
        } else {
          offset = this._helper.computeLengthBetween(this._geometry.nodes[0], this._geometry.nodes[n - 1]);
          area = offset > tolerance ? 0 : this._helper.computeArea(this._geometry.nodes);
        }
      }
      this._area = area;
      if (area > 0) {
        this._nodeText.select(':last-child').text('Total distance: ' + this.lengthText + '; Total area: ' + this.areaText + '.');
      }
    }
  }, {
    key: '_showTooltipOnEvent',
    value: function _showTooltipOnEvent(text) {
      if (this._options.tooltip) {
        this._tooltip.show(this._projectionUtility.svgPointToContainerPoint([_d3Selection.event.x, _d3Selection.event.y]), text);
      }
    }
  }, {
    key: '_hideTooltip',
    value: function _hideTooltip() {
      if (this._options.tooltip) {
        this._tooltip.hide();
      }
    }
  }, {
    key: '_dispatchMeasureEvent',
    value: function _dispatchMeasureEvent() {
      if (!this._started) return;
      var result = {
        result: {
          length: this.length,
          lengthText: this.lengthText,
          area: this.area,
          areaText: this.areaText,
          segments: this.segments
        }
      };
      if (this._lastMeasure && this._lastMeasure.result.lengthText === this.lengthText && this._lastMeasure.result.areaText === this.areaText) return;
      if (typeof this._events.get(_events.EVENT_CHANGE) === "function") {
        this._events.get(_events.EVENT_CHANGE)(this._lastMeasure = result);
      }
    }
  }, {
    key: '_updateSegment',
    value: function _updateSegment(d) {
      var len = this._helper.computeLengthBetween(d[0], d[1]);
      var lenTxt = this._helper.formatLength(len);
      this.segments.push(new _segment.Segment(d[0], d[1], len, lenTxt).toJSON());
    }
  }]);

  return MeasureTool;
}();

exports.default = MeasureTool;
;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=MeasureTool.js.map