# reactjs-iscroll

基于 IScroll 实现的 react 组件，

IScroll 官网 http://iscrolljs.com/

reactjs-iscroll 官网 https://github.com/reactjs-ui/reactjs-iscroll/

## 引入

```
npm install reactjs-iscroll --save
```

## 使用

```javascript
import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

class Simple extends Component {
  render() {
    return (
      <div>
        <ReactIScroll iScroll={iScroll} className="example">
          <div>数据</div>
        </ReactIScroll>
      </div>
    );
  }
}

render(<Simple/>, document.getElementById('layout'));

```

## 参数说明，利用 react props 传入

* options: PropTypes.object.isRequired,
  实例化 iScroll 选项
* iScroll: PropTypes.func.isRequired,
  iScroll 组件类
* className: PropTypes.string, 
  自定义 class 样式，可传入自定义 class 样式
* style: PropTypes.string, 
    自定义 style 样式，可传入自定义 style 样式
* children: PropTypes.node,
  iScroll 组件中展示的内容
* pullDown: PropTypes.bool, 
  是否显示向下拉动加载 banner
* pullUp: PropTypes.bool, 
  是否显示向上加载更多 footer
* pullDownText: PropTypes.array,
  向下加载对应的文本，数组中有三个值，分别对应初始化值，向下拉动显示文本，加载中显示文本
* pullUpText: PropTypes.array,
  向上加载对应的文本，数组中有三个值，分别对应初始化值，向上拉动显示文本，加载中显示文本
* pullDownThreshold: PropTypes.number,
  向下拉动加载数据临界值，也就是向下滑动多长时，松开时加载数据
* pullUpThreshold: PropTypes.number,
  向上拉动加载数据临界值，也就是向上滑动多长时，松开时加载数据
* handleRefresh: PropTypes.func 
    * 刷新后回调函数，定义要处理的逻辑，比如加载更多和刷新。
    * 该函数有两个参数 handleRefresh(downOrUp, callback)
    * 参数 downOrUp 等于 'up' 表示向上滑动；等于 'down' 表示向下滑动，我们根据这个参数值来处理向上拉动还是向下拉动的逻辑，
      一般向上是加载更多，向下是刷新页面。
    * 参数 callback 是组件中提供的回调函数，我们调用 fetch 或 ajax 加载完数据时调用该回调函数，让滑动状态恢复到最初状态
    该参数的使用可以参考例子 http://localhost:9090/paging.html

## 查看例子

从 github 上 clone 代码后

```
npm install
gulp example
```

在浏览器中打开 http://localhost:9090

## 自定义开发

```
gulp build
```

## 问题与建议

https://github.com/reactjs-ui/reactjs-iscroll/issues

## 更新日志

版本迭代看[这里](./VERSION.md)
