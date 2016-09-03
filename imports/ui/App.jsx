import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';



export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div id="page-wrapper" className="open">
        {this.props.children}
      </div>
    </div>
    )
  }
}
