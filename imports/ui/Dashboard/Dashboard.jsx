import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../api/tasks.js';

import Sidebar from '../Sidebar.jsx';
import WidgetContainer from './WidgetContainer.jsx';
import Headerbar from '../Headerbar.jsx';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Headerbar page="Dashboard"/>
        <Sidebar page="Dashboard"/>
        <WidgetContainer/>
      </div>
    )
  }
}
