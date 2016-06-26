import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from '../src/scripts/index';
import './sass/example.scss';

class Simple extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pullUp: true,
      pullDown: true
    };
    this.simpleList = [{
      id: 1,
      name: '苹果'
    }, {
      id: 2,
      name: '苹果'
    }, {
      id: 3,
      name: '苹果'
    }, {
      id: 4,
      name: '苹果'
    }, {
      id: 5,
      name: '苹果'
    }, {
      id: 6,
      name: '苹果'
    }, {
      id: 7,
      name: '苹果'
    }, {
      id: 8,
      name: '苹果'
    }, {
      id: 9,
      name: '苹果'
    }, {
      id: 10,
      name: '苹果'
    }, {
      id: 11,
      name: '苹果'
    }, {
      id: 12,
      name: '苹果'
    }, {
      id: 13,
      name: '苹果'
    }, {
      id: 14,
      name: '苹果'
    }];
  }

  handleChange(name, event) {
    let newState = {};
    newState[name] = !event.target.checked;
    this.setState(newState);
  }

  render() {
    const {pullUp, pullDown} = this.state;
    return (
      <div>
        <header>
          <label>
            <input type="checkbox" checked={!pullDown} onChange={this.handleChange.bind(this, 'pullDown')}/>
            禁止向下滑动
          </label>
          <label>
            <input type="checkbox" checked={!pullUp} onChange={this.handleChange.bind(this, 'pullUp')}/>
            禁止向上滑动
          </label>
        </header>
        <ReactIScroll iScroll={iScroll} pullDown={pullDown} pullUp={pullUp} className="example"
                      style={{marginTop: '40px'}}>
          <ul>
            {this.simpleList.map((item) =>
              <li key={item.id}>{item.name}</li>
            )}
          </ul>
        </ReactIScroll>
      </div>
    );
  }
}

render(<Simple/>, document.getElementById('layout'));
