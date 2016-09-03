import React, { Component, PropTypes } from 'react';


export default class Headerbar extends Component {
  render() {
    return (
      <div className="row header col-xs-12">
        <div className="user pull-right">
          <div className="item dropdown">
            <a href="#" className="dropdown-toggle"><img src="/img/avatar.jpg" alt=""/></a>
          </div>
        </div>
        <div className="meta">
          <div className="page">{this.props.page}</div>
          <div className="breadcrumb-links">Home / {this.props.page}</div>
        </div>
      </div>
    );
  }
}

Headerbar.propTypes = {
  page: PropTypes.string.isRequired,
};