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
	      isScrolling: false, //是否正在滚动
	      pullDownState: 0, //下拉状态，0 表示下拉，1表示松开，2表示加载数据中
	      pullUpState: 0, //上拉状态，0 表示上拉，1表示松开，2表示加载数据中
	      pullDownCls: 'scrolled-up',
	      pullUpCls: '',
	      pullDownStyle: null,
	      pullUpStyle: null
	    };

	    // 中间辅助值
	    _this.scrollStartPos = 0; // 开始位置
	    _this.pullDownOffset = 0; // 向下刷新框偏移量
	    _this.lock = false; // 当加载数据时，锁住
	    return _this;
	  }

	  _createClass(ReactIScroll, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var pullDownEl = this.refs.pullDown;
	      this.pullDownOffset = pullDownEl.offsetHeight;
	      this.initIscroll();
	      this.bindIScrollEvents();
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
	    key: 'getIScroll',
	    value: function getIScroll() {
	      return this.iScrollInstance;
	    }
	  }, {
	    key: 'bindIScrollEvents',
	    value: function bindIScrollEvents() {
	      var _this2 = this;

	      var iScrollInstance = this.getIScroll();
	      var len = iScrollEvents.length;

	      var _loop = function _loop(i) {
	        var item = iScrollEvents[i];
	        var event = _this2.props[item] ? _this2.props[item] : _this2[item];
	        if (event) {
	          event = event.bind(_this2);
	          iScrollInstance.on(item, function () {
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            event.apply(undefined, [iScrollInstance].concat(args));
	          });
	        }
	      };

	      for (var i = 0; i < len; i++) {
	        _loop(i);
	      }

	      // 执行，恢复到默认状态
	      this.refresh(iScrollInstance);

	      //注册刷新事件
	      var origRefresh = iScrollInstance.refresh;
	      iScrollInstance.refresh = function () {
	        origRefresh.apply(iScrollInstance);
	        _this2.refresh(iScrollInstance);
	      };
	    }

	    // IScroll events start
	    /**
	     * 开始滚动时事件
	     * @param iScroll
	     */

	  }, {
	    key: 'scrollStart',
	    value: function scrollStart(iScroll) {
	      if (this.lock) {
	        return;
	      }
	      this.setState({
	        isScrolling: true
	      });
	      this.scrollStartPos = iScroll.y;
	    }

	    /**
	     * 滚动过程中事件
	     * @param iScroll
	     */

	  }, {
	    key: 'scroll',
	    value: function scroll(iScroll) {
	      var _this3 = this;

	      if (this.lock) {
	        return;
	      }
	      var y = iScroll.y;
	      var _props2 = this.props;
	      var pullDown = _props2.pullDown;
	      var pullUp = _props2.pullUp;
	      var pullDownThreshold = _props2.pullDownThreshold;
	      var pullUpThreshold = _props2.pullUpThreshold;
	      //如果没设置下拉刷新或向上加载更多时，则直接返回

	      if (!pullDown && !pullUp) {
	        return;
	      }

	      var _state = this.state;
	      var pullDownCls = _state.pullDownCls;
	      var pullUpCls = _state.pullUpCls;


	      if (this.scrollStartPos === 0 && y === 0) {
	        // 解决当内容太少时，drag 或 scroll 不起作用，我们通过重新设置 hasVerticalScroll 为 true 来激活拖拽或滚动
	        iScroll.hasVerticalScroll = true;
	        // 设置为 -1000 稍后重新检测
	        this.scrollStartPos = -1000;
	      }

	      // 向下滑
	      if (pullDown) {
	        //如果向下滑动超过一定的范围则改变样式，默认范围为加载条高度+5px
	        if (y > this.pullDownOffset + pullDownThreshold && pullDownCls !== 'iscroll-flip') {
	          this.setState({
	            pullDownStyle: {
	              transitionDuration: '',
	              marginTop: ''
	            },
	            pullDownCls: 'iscroll-flip',
	            pullDownState: 1
	          }, function () {
	            // Adjust scrolling position to match the change in pullDownEl's margin-top
	            iScroll.scrollBy(0, -_this3.pullDownOffset, 0);
	          });
	        } else if (y < 0 && pullDownCls === 'iscroll-flip') {
	          //重新向上滑动时恢复默认样子
	          this.setState({
	            pullDownStyle: {
	              transitionDuration: '',
	              marginTop: ''
	            },
	            pullDownCls: 'scrolled-up',
	            pullDownState: 0
	          }, function () {
	            // Adjust scrolling position to match the change in pullDownEl's margin-top
	            iScroll.scrollBy(0, _this3.pullDownOffset, 0);
	          });
	        }
	      }

	      // 向上滑
	      if (pullUp) {
	        if (y < iScroll.maxScrollY - pullUpThreshold && pullUpCls !== 'iscroll-flip') {
	          this.setState({
	            pullUpCls: 'iscroll-flip',
	            pullUpState: 1
	          }, function () {
	            iScroll.hasVerticalScroll = true;
	            iScroll.scrollBy(0, 0, 0);
	          });
	        } else if (y > iScroll.maxScrollY - pullUpThreshold && pullUpCls === 'iscroll-flip') {
	          this.setState({
	            pullUpCls: '',
	            pullUpState: 0
	          }, function () {
	            iScroll.hasVerticalScroll = true;
	          });
	        }
	      }
	    }

	    /**
	     * 滑动结束
	     * @param iScroll
	     */

	  }, {
	    key: 'scrollEnd',
	    value: function scrollEnd(iScroll) {
	      if (this.lock) {
	        return;
	      }
	      var _props3 = this.props;
	      var pullDown = _props3.pullDown;
	      var pullUp = _props3.pullUp;
	      var _state2 = this.state;
	      var pullDownCls = _state2.pullDownCls;
	      var pullUpCls = _state2.pullUpCls;

	      if (pullDown && pullDownCls === 'iscroll-flip') {
	        this.setState({
	          pullDownStyle: {
	            transitionDuration: '',
	            marginTop: ''
	          },
	          pullDownCls: 'iscroll-loading',
	          pullDownState: 2
	        });
	        this.pullActionHandler(iScroll, 'down');
	      }

	      if (pullUp && pullUpCls === 'iscroll-flip') {
	        this.setState({
	          pullUpCls: 'iscroll-loading',
	          pullUpState: 2
	        });
	        this.pullActionHandler(iScroll, 'up');
	      }

	      if (this.scrollStartPos === -1000) {
	        // 重新计算 iScroll 是否可以拖拽或滚动
	        this.hasVerticalScroll = iScroll.options.scrollY && iScroll.maxScrollY < 0;
	      }
	    }

	    // IScroll events end

	    /**
	     * 刷新
	     * @param iScroll
	     */

	  }, {
	    key: 'refresh',
	    value: function refresh(iScroll) {
	      var _this4 = this;

	      if (this.lock) {
	        return;
	      }
	      var y = iScroll.y;
	      var animTime = void 0;
	      var type = void 0;
	      var _props4 = this.props;
	      var pullDown = _props4.pullDown;
	      var pullUp = _props4.pullUp;
	      var _state3 = this.state;
	      var pullDownCls = _state3.pullDownCls;
	      var pullUpCls = _state3.pullUpCls;
	      var isScrolling = _state3.isScrolling;


	      if (pullDown) {
	        if (pullDownCls === 'iscroll-loading' && isScrolling === false) {
	          var state = {
	            pullDownState: 0,
	            pullDownCls: 'scrolled-up'
	          };
	          if (y >= 0) {
	            type = 1;
	            animTime = 250;
	            state.pullDownStyle = {
	              transitionDuration: animTime + 'ms',
	              marginTop: ''
	            };
	          } else if (y > -this.pullDownOffset) {
	            type = 2;

	            var pullDownEl = this.refs.pullDown;
	            pullDownEl.style.marginTop = y + 'px';
	            pullDownEl.offsetHeight;

	            animTime = 250 * (this.pullDownOffset + y) / this.pullDownOffset;
	            state.pullDownStyle = {
	              transitionDuration: animTime + 'ms',
	              marginTop: ''
	            };
	          } else {
	            type = 3;
	            animTime = 0;
	            state.pullDownStyle = {
	              transitionDuration: '',
	              marginTop: ''
	            };
	          }

	          this.setState(state, function () {
	            setTimeout(function () {
	              iScroll.refresh();
	            }, animTime + 10);

	            if (type === 2) {
	              iScroll.scrollTo(0, 0, 0);
	            } else if (type === 3) {
	              iScroll.scrollBy(0, _this4.pullDownOffset, 0);
	            }
	          });
	        }
	      }

	      if (pullUp) {
	        if (pullUpCls === 'iscroll-loading' && isScrolling === false) {
	          this.setState({
	            pullUpCls: '',
	            pullUpState: 0
	          });
	        }
	      }
	    }

	    // 重新加载数据

	  }, {
	    key: 'pullActionHandler',
	    value: function pullActionHandler(iScroll, downOrUp) {
	      var _this5 = this;

	      this.lock = true;
	      var handleRefresh = this.props.handleRefresh;


	      if (handleRefresh && typeof handleRefresh === 'function') {
	        handleRefresh(downOrUp, function () {
	          _this5.setState({
	            pullUpState: 0,
	            isScrolling: false
	          }, function () {
	            _this5.lock = false;
	            iScroll.refresh();
	          });
	        });
	      } else {
	        //这里只是模拟操作，实际中 handleRefresh 应该必须传入
	        setTimeout(function () {
	          _this5.setState({
	            pullUpState: 0,
	            isScrolling: false
	          }, function () {
	            _this5.lock = false;
	            iScroll.refresh();
	          });
	        }, 1000);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state4 = this.state;
	      var pullDownState = _state4.pullDownState;
	      var pullUpState = _state4.pullUpState;
	      var pullDownCls = _state4.pullDownCls;
	      var pullUpCls = _state4.pullUpCls;
	      var _props5 = this.props;
	      var pullDown = _props5.pullDown;
	      var pullUp = _props5.pullUp;
	      var pullDownText = _props5.pullDownText;
	      var pullUpText = _props5.pullUpText;
	      var className = _props5.className;

	      className = className ? ' ' + className : '';

	      return _react2.default.createElement(
	        'div',
	        { className: 'iscroll-wrapper' + className },
	        _react2.default.createElement(
	          'div',
	          { className: 'iscroll-body' },
	          pullDown ? _react2.default.createElement(
	            'div',
	            { ref: 'pullDown', className: (0, _classnames4.default)(_defineProperty({ 'iscroll-pull-down': true }, pullDownCls, true)) },
	            _react2.default.createElement('i', null),
	            _react2.default.createElement(
	              'span',
	              null,
	              pullDownText[pullDownState]
	            )
	          ) : null,
	          this.props.children,
	          pullUp ? _react2.default.createElement(
	            'div',
	            { className: (0, _classnames4.default)(_defineProperty({ 'iscroll-pull-up': true }, pullUpCls, true)) },
	            _react2.default.createElement('i', null),
	            _react2.default.createElement(
	              'span',
	              null,
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
	    mouseWheel: true, // 是否支持鼠标滚轮
	    scrollbars: true, // 是否显示滚动条
	    probeType: 2, // 滚动的节奏
	    //bounceTime: 250, // 滚动动画持续的时间，默认为600
	    bounceEasing: 'quadratic', // 动画算法
	    fadeScrollbars: true, // 是否使用滚动 fade 效果
	    interactiveScrollbars: true // 滚动条是否可以被拖拽
	  },
	  pullDown: true,
	  pullUp: true,
	  pullDownText: ['下拉刷新', '松开刷新', '加载中，请稍后...'],
	  pullUpText: ['上滑加载更多...', '松开加载...', '加载中，请稍后...'],
	  pullDownThreshold: 5, //向下滑动临界值
	  pullUpThreshold: 55 };

	//向上滑动临界值
	ReactIScroll.propTypes = {
	  options: _react.PropTypes.object.isRequired,
	  iScroll: _react.PropTypes.func.isRequired,
	  className: _react.PropTypes.string, // 自定义样式
	  children: _react.PropTypes.node,
	  pullDown: _react.PropTypes.bool, //是否显示向下刷新加载
	  pullUp: _react.PropTypes.bool, //是否显示向上加载更多
	  pullDownText: _react.PropTypes.array,
	  pullUpText: _react.PropTypes.array,
	  pullDownThreshold: _react.PropTypes.number,
	  pullUpThreshold: _react.PropTypes.number,
	  handleRefresh: _react.PropTypes.func //刷新后回调函数，定义要处理的逻辑，比如加载更多，刷新等
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
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./iscroll.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js?outputStyle=expanded!./iscroll.scss");
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
	exports.push([module.id, ".iscroll-wrapper {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n}\n\n.iscroll-body {\n  position: absolute;\n  z-index: 1;\n  -webkit-tap-highlight-color: transparent;\n  width: 100%;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  text-size-adjust: none;\n}\n\n.iscroll-pull-down,\n.iscroll-pull-up {\n  padding: 5px 10px;\n  color: #888;\n  text-align: center;\n}\n\n.iscroll-pull-down.scrolled-up {\n  margin-top: -51px;\n}\n\n.iscroll-pull-down > i,\n.iscroll-pull-up > i {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  background: url(" + __webpack_require__(8) + ") 0 0 no-repeat;\n  -webkit-background-size: 40px 80px;\n  background-size: 40px 80px;\n  -webkit-transition-property: -webkit-transform;\n  -webkit-transition-duration: 250ms;\n  vertical-align: middle;\n  margin: 0 5px;\n}\n\n.iscroll-pull-down > i {\n  transform: rotate(0deg) translateZ(0);\n}\n\n.iscroll-pull-up > i {\n  transform: rotate(-180deg) translateZ(0);\n}\n\n.iscroll-pull-down.iscroll-flip > i {\n  transform: rotate(-180deg) translateZ(0);\n}\n\n.iscroll-pull-up.iscroll-flip > i {\n  transform: rotate(0deg) translateZ(0);\n}\n\n.iscroll-pull-down.iscroll-loading > i,\n.iscroll-pull-up.iscroll-loading > i {\n  background-position: 0 100%;\n  transform: rotate(0deg) translateZ(0);\n  transition-duration: 0ms;\n  animation-name: iscroll-loading;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n@-webkit-keyframes iscroll-loading {\n  from {\n    -webkit-transform: rotate(0deg) translateZ(0);\n  }\n  to {\n    -webkit-transform: rotate(360deg) translateZ(0);\n  }\n}\n", ""]);

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
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg=="

/***/ },
/* 9 */
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