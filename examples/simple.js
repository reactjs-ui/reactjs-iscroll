import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from '../src/scripts/index';
import './sass/example.scss';

class Simple extends Component {

  constructor(props) {
    super(props);

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

  render() {

    return (
      <div>
        <ReactIScroll iScroll={iScroll} className="example">
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
