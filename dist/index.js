(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-dom")) : factory(root["react"], root["react-dom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames3 = __webpack_require__(4);

	var _classnames4 = _interopRequireDefault(_classnames3);

	__webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**!
	 * iScroll React Component
	 * iScroll: http://iscrolljs.com/
	 * reactjs-iscroll: https://github.com/reactjs-ui/reactjs-iscroll
	 *
	 */

	/**
	 * iScroll event name
	 beforeScrollStart, executed as soon as user touches the screen but before the scrolling has initiated.
	 scrollCancel, scroll initiated but didn't happen.
	 scrollStart, the scroll started.
	 scroll, the content is scrolling. Available only in scroll-probe.js edition. See onScroll event.
	 scrollEnd, content stopped scrolling.
	 flick, user flicked left/right.
	 zoomStart, user started zooming.
	 zoomEnd, zoom ended.
	 * @type {*[]}
	 */
	var iScrollEvents = ['beforeScrollStart', 'scrollCancel', 'scrollStart', 'scroll', 'scrollEnd', 'flick', 'zoomStart', 'zoomEnd'];

	var ReactIScroll = function (_Component) {
	  _inherits(ReactIScroll, _Component);

	  function ReactIScroll(props) {
	    _classCallCheck(this, ReactIScroll);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactIScroll).call(this, props));

	    _this.state = {
	      y: 0,
	      pullDownState: 0,
	      pullUpState: 0,
	      isScrolling: false,
	      pullDownCls: 'scrolled-up',
	      pullUpCls: 'scrolled-up'
	    };
	    return _this;
	  }

	  _createClass(ReactIScroll, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.initIscroll();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.destoryIScroll();
	    }
	  }, {
	    key: 'initIscroll',
	    value: function initIscroll() {
	      // Create new iscroll instance here
	      var _props = this.props;
	      var iScroll = _props.iScroll;
	      var options = _props.options;

	      var iScrollInstance = new iScroll(_reactDom2.default.findDOMNode(this), options);
	      this.iScrollInstance = iScrollInstance;
	    }
	  }, {
	    key: 'destoryIScroll',
	    value: function destoryIScroll() {
	      if (this.iScrollInstance) {
	        this.iScrollInstance.destroy();
	        this.iScrollInstance = null;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var pullDownState = _state.pullDownState;
	      var pullUpState = _state.pullUpState;
	      var pullDownCls = _state.pullDownCls;
	      var pullUpCls = _state.pullUpCls;
	      var _props2 = this.props;
	      var pullDown = _props2.pullDown;
	      var pullUp = _props2.pullUp;
	      var pullDownText = _props2.pullDownText;
	      var pullUpText = _props2.pullUpText;


	      return _react2.default.createElement(
	        'div',
	        { className: 'iscroll-wrapper' },
	        _react2.default.createElement(
	          'div',
	          { className: 'scroll-body' },
	          pullDown ? _react2.default.createElement(
	            'div',
	            { className: (0, _classnames4.default)(_defineProperty({ 'pull-down': true }, pullDownCls, true)) },
	            _react2.default.createElement('span', { className: 'pull-down-icon' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'pull-down-label' },
	              pullDownText[pullDownState]
	            )
	          ) : null,
	          this.props.children,
	          pullUp ? _react2.default.createElement(
	            'div',
	            { className: (0, _classnames4.default)(_defineProperty({ 'pull-up': true }, pullUpCls, true)) },
	            _react2.default.createElement('span', { className: 'pull-up-icon' }),
	            _react2.default.createElement(
	              'span',
	              { className: 'pull-up-label' },
	              pullUpText[pullUpState]
	            )
	          ) : null
	        )
	      );
	    }
	  }]);

	  return ReactIScroll;
	}(_react.Component);

	ReactIScroll.defaultProps = {
	  options: {
	    mouseWheel: false, // 是否支持鼠标滚轮
	    scrollbars: true, // 是否显示滚动条
	    probeType: 2, // 滚动的节奏
	    bounceTime: 250, // 滚动动画持续的时间，默认为600
	    bounceEasing: 'quadratic', // 动画算法
	    fadeScrollbars: true, // 是否使用滚动 fade 效果
	    interactiveScrollbars: false // 滚动条是否可以被拖拽
	  },
	  pullDownText: ['向下滑动刷新页面...', '松开刷新页面...', '加载中...'],
	  pullUpText: ['向上滑动加载更多数据...', '松开加载数据...', '加载中...']
	};

	ReactIScroll.propTypes = {
	  options: _react.PropTypes.object.isRequired,
	  iScroll: _react.PropTypes.func.isRequired,
	  children: _react.PropTypes.node,
	  pullDown: _react.PropTypes.bool, //是否显示向下刷新加载
	  pullUp: _react.PropTypes.bool, //是否显示向上加载更多
	  pullDownText: _react.PropTypes.object,
	  pullUpText: _react.PropTypes.object
	};

	exports.default = ReactIScroll;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./iscroll.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./iscroll.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".iscroll-wrapper {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  background: #ccc;\n  overflow: hidden;\n}\n\n.scroll-body {\n  position: absolute;\n  z-index: 1;\n  -webkit-tap-highlight-color: transparent;\n  width: 100%;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-size-adjust: none;\n}\n\n.pull-down, .pull-up {\n  background: #eee;\n  padding: 5px 10px;\n  border-bottom: 1px solid #ccc;\n  font-weight: bold;\n  color: #888;\n  text-align: center;\n}\n\n.pull-down.scrolled-up {\n  margin-top: -51px;\n}\n\n.pull-down .pull-down-icon, .pull-up .pull-up-icon {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  /*background: url(\"../images/pull-icon@2x.png\") 0 0 no-repeat;*/\n  -webkit-background-size: 40px 80px;\n  background-size: 40px 80px;\n  -webkit-transition-property: -webkit-transform;\n  -webkit-transition-duration: 250ms;\n  vertical-align: middle;\n  margin: 0 5px;\n}\n\n.pull-down .pull-down-icon {\n  -webkit-transform: rotate(0deg) translateZ(0);\n}\n\n.pull-up .pull-up-icon {\n  -webkit-transform: rotate(-180deg) translateZ(0);\n}\n\n.pull-down.iscroll-flip .pull-down-icon {\n  -webkit-transform: rotate(-180deg) translateZ(0);\n}\n\n.pull-up.iscroll-flip .pull-up-icon {\n  -webkit-transform: rotate(0deg) translateZ(0);\n}\n\n.pull-down.iscroll-loading .pull-down-icon,\n.pull-up.iscroll-loading .pull-up-icon {\n  background-position: 0 100%;\n  -webkit-transform: rotate(0deg) translateZ(0);\n  -webkit-transition-duration: 0ms;\n  -webkit-animation-name: iscroll-loading;\n  -webkit-animation-duration: 2s;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n}\n\n@-webkit-keyframes iscroll-loading {\n  from {\n    -webkit-transform: rotate(0deg) translateZ(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg) translateZ(0);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
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


/***/ }
/******/ ])
});
;