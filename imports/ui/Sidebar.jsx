import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import { Tasks } from '../api/tasks.js';


export default class Sidebar extends Component {
  getCurrentPageIcon(){
    let pageIcon;
    if (this.props.page === 'Dashboard'){
      pageIcon = 'fa fa-tachometer'
    } else if (this.props.page === 'Users'){
      pageIcon = 'fa fa-users'
    } else if (this.props.page === 'Widgets'){
      pageIcon = 'fa fa-cubes'
    }
    return pageIcon;
  }

  render() {
    let pageIcon = this.getCurrentPageIcon();
    return (
      <div className="sideBar">
        <div id="sidebar-wrapper">
          <ul className="sidebar">
            {/*SIDEBAR HEADER*/}
            <li className="sidebar-main"><Link to="/dashboard">{this.props.page} <span className={`menu-icon ${pageIcon}`}></span></Link></li>
            <li className="sidebar-title"><span>NAVIGATION</span></li>
            <li className="sidebar-list"><Link to="/dashboard">Dashboard <span className="menu-icon fa fa-tachometer"></span></Link></li>
            <li className="sidebar-list"><Link to="/users">Users <span className="menu-icon fa fa-users"></span></Link></li>
            <li className="sidebar-list"><Link to="/widgets">Widgets <span className="menu-icon fa fa-cubes"></span></Link></li>
            <div className="sidebar-footer col-xs-12"><Link to="#" target="_blank">&copy; 2015 Red Ventures</Link></div>
          </ul>
        </div>
      </div>
    );
  }

}

Sidebar.propTypes = {
  page: PropTypes.string.isRequired,
};