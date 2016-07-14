import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import '../sass/iscroll.scss';

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
const iScrollEvents = [
  'beforeScrollStart', 'scrollCancel', 'scrollStart',
  'scroll', 'scrollEnd', 'flick', 'zoomStart', 'zoomEnd'
];

class ReactIScroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isScrolling: false, //是否正在滚动
      pullDownState: 0, //下拉状态，0 表示下拉，1表示松开，2表示加载数据中
      pullUpState: 0, //上拉状态，0 表示上拉，1表示松开，2表示加载数据中
      pullDownCls: 'scrolled-up',
      pullUpCls: '',
      pullDownStyle: null,
      pullUpStyle: null
    };

    // 中间辅助值
    this.scrollStartPos = 0; // 开始位置
    this.pullDownOffset = 0; // 向下刷新框偏移量
    this.lock = false; // 当加载数据时，锁住
  }

  componentDidMount() {
    const {pullDown} = this.props;
    if (pullDown) {
      const pullDownEl = this.refs.pullDown;
      this.pullDownOffset = pullDownEl.offsetHeight;
    }
    this.initIscroll();
    this.bindIScrollEvents();
  }

  componentWillUnmount() {
    this.destoryIScroll()
  }

  initIscroll() {
    // Create new iscroll instance here
    const {iScroll, options} = this.props;
    const iScrollInstance = new iScroll(ReactDOM.findDOMNode(this), options);
    this.iScrollInstance = iScrollInstance;
  }

  destoryIScroll() {
    if (this.iScrollInstance) {
      this.iScrollInstance.destroy();
      this.iScrollInstance = null;
    }
  }

  getIScroll() {
    return this.iScrollInstance;
  }

  bindIScrollEvents() {
    const iScrollInstance = this.getIScroll();
    const len = iScrollEvents.length;

    for (let i = 0; i < len; i++) {
      const item = iScrollEvents[i];
      let event = this.props[item] ? this.props[item] : this[item];
      if (event) {
        event = event.bind(this);
        iScrollInstance.on(item, (...args) => {
          event(iScrollInstance, ...args);
        });
      }
    }

    // 执行，恢复到默认状态
    this.refresh(iScrollInstance);

    //注册刷新事件
    const origRefresh = iScrollInstance.refresh;
    iScrollInstance.refresh = () => {
      origRefresh.apply(iScrollInstance);
      this.refresh(iScrollInstance);
    }
  }

  forbidScroll(distY) {
    const {pullUp, pullDown} = this.props;
    if (!pullUp && !pullDown) {
      return true;
    }
    //判断是上滑还是下滑
    if (distY > 0 && !pullDown) { //向下
      return true;
    }
    if (distY < 0 && !pullUp) { //向上
      return true;
    }
    return false;
  }

  // IScroll events start
  /**
   * 开始滚动时事件
   * @param iScroll
   */
  scrollStart(iScroll) {
    if (this.forbidScroll(iScroll.distY)) {
      return;
    }

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
  scroll(iScroll) {
    if (this.forbidScroll(iScroll.distY)) {
      return;
    }
    if (this.lock) {
      return;
    }
    const y = iScroll.y;
    const {pullDown, pullUp, pullDownThreshold, pullUpThreshold} = this.props;
    //如果没设置下拉刷新或向上加载更多时，则直接返回
    if (!pullDown && !pullUp) {
      return;
    }

    const {pullDownCls, pullUpCls} = this.state;

    if (this.scrollStartPos === 0 && y === 0) {
      // 解决当内容太少时，drag 或 scroll 不起作用，我们通过重新设置 hasVerticalScroll 为 true 来激活拖拽或滚动
      iScroll.hasVerticalScroll = true;
      // 设置为 -1000 稍后重新检测
      this.scrollStartPos = -1000;
    } else if ((this.scrollStartPos === -1000) &&
      (((!pullUp) && (!pullDownCls.match('iscroll-flip')) && (y < 0)) ||
      ((!pullDown) && (!pullUpCls.match('iscroll-flip')) && (y > 0)))) {
      // Scroller was not moving at first (and the trick above was applied), but now it's moving in the wrong direction.
      // I.e. the user is either scrolling up while having no "pull-up-bar",
      // or scrolling down while having no "pull-down-bar" => Disable the trick again and reset values...
      iScroll.hasVerticalScroll = false;
      this.scrollStartPos = 0;
      iScroll.scrollBy(0, -y, 0);	// Adjust scrolling position to undo this "invalid" movement
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
        }, () => {
          // Adjust scrolling position to match the change in pullDownEl's margin-top
          iScroll.scrollBy(0, -this.pullDownOffset, 0);
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
        }, () => {
          // Adjust scrolling position to match the change in pullDownEl's margin-top
          iScroll.scrollBy(0, this.pullDownOffset, 0);
        });
      }
    }

    // 向上滑
    if (pullUp) {
      if (y < (iScroll.maxScrollY - pullUpThreshold) && pullUpCls !== 'iscroll-flip') {
        this.setState({
          pullUpCls: 'iscroll-flip',
          pullUpState: 1
        }, () => {
          iScroll.hasVerticalScroll = true;
          iScroll.scrollBy(0, 0, 0);
        });
      } else if (y > (iScroll.maxScrollY - pullUpThreshold) && pullUpCls === 'iscroll-flip') {
        this.setState({
          pullUpCls: '',
          pullUpState: 0
        }, () => {
          iScroll.hasVerticalScroll = true;
        });
      }
    }
  }

  /**
   * 滑动结束
   * @param iScroll
   */
  scrollEnd(iScroll) {
    if (this.forbidScroll(iScroll.distY)) {
      return;
    }
    if (this.lock) {
      return;
    }
    const {pullDown, pullUp} = this.props;
    const {pullDownCls, pullUpCls} = this.state;
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
  refresh(iScroll) {
    if (this.forbidScroll(iScroll.distY)) {
      return;
    }
    if (this.lock) {
      return;
    }
    const y = iScroll.y;
    let animTime;
    let type;
    const {pullDown, pullUp} = this.props;
    const {pullDownCls, pullUpCls, isScrolling} = this.state;

    if (pullDown) {
      if (pullDownCls === 'iscroll-loading' && isScrolling === false) {
        let state = {
          pullDownState: 0,
          pullDownCls: 'scrolled-up'
        };
        if (y >= 0) {
          type = 1;
          animTime = 250;
          state.pullDownStyle = {
            transitionDuration: `${animTime}ms`,
            marginTop: ''
          };
        } else if (y > -this.pullDownOffset) {
          type = 2;

          let pullDownEl = this.refs.pullDown;
          pullDownEl.style.marginTop = `${y}px`;
          pullDownEl.offsetHeight;

          animTime = 250 * (this.pullDownOffset + y) / this.pullDownOffset;
          state.pullDownStyle = {
            transitionDuration: `${animTime}ms`,
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

        this.setState(state, () => {
          setTimeout(() => {
            iScroll.refresh();
          }, animTime + 10);

          if (type === 2) {
            iScroll.scrollTo(0, 0, 0);
          } else if (type === 3) {
            iScroll.scrollBy(0, this.pullDownOffset, 0);
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
  pullActionHandler(iScroll, downOrUp) {
    this.lock = true;
    const {handleRefresh} = this.props;

    if (handleRefresh && typeof handleRefresh === 'function') {
      handleRefresh(downOrUp, () => {
        this.setState({
          pullUpState: 0,
          isScrolling: false
        }, () => {
          this.lock = false;
          iScroll.refresh();
        });
      });
    } else {
      //这里只是模拟操作，实际中 handleRefresh 应该必须传入
      setTimeout(() => {
        this.setState({
          pullUpState: 0,
          isScrolling: false
        }, () => {
          this.lock = false;
          iScroll.refresh();
        });
      }, 1000);
    }
  }

  render() {
    const {pullDownState, pullUpState, pullDownCls, pullUpCls} = this.state;
    let {pullDown, pullUp, pullDownText, pullUpText, className, style} = this.props;
    className = className ? ` ${className}` : '';

    return (
      <div className={`iscroll-wrapper${className}`} style={style || {}}>
        <div className="iscroll-body">
          {pullDown ? (
            <div ref="pullDown" className={classnames({'iscroll-pull-down': true, [pullDownCls]: true})}>
              <i></i>
              <span>{pullDownText[pullDownState]}</span>
            </div>
          ) : null}

          {this.props.children}

          {pullUp ? (
            <div className={classnames({'iscroll-pull-up': true, [pullUpCls]: true})}>
              <i></i>
              <span>{pullUpText[pullUpState]}</span>
            </div>
          ) : null}

        </div>
      </div>
    );
  }
}

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
  pullUpThreshold: 55, //向上滑动临界值
};

ReactIScroll.propTypes = {
  options: PropTypes.object.isRequired,
  iScroll: PropTypes.func.isRequired,
  className: PropTypes.string, // 自定义class样式
  style: PropTypes.object, // 自定义style样式
  children: PropTypes.node,
  pullDown: PropTypes.bool, //是否显示向下刷新加载
  pullUp: PropTypes.bool, //是否显示向上加载更多
  pullDownText: PropTypes.array,
  pullUpText: PropTypes.array,
  pullDownThreshold: PropTypes.number,
  pullUpThreshold: PropTypes.number,
  handleRefresh: PropTypes.func //刷新后回调函数，定义要处理的逻辑，比如加载更多，刷新等
};

export default ReactIScroll;
