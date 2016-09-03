import React, { Component, PropTypes } from 'react';


export default class DashboardBox extends Component {
  render() {
    console.log('data going to display:',this.props.dataLength);
    return (
        <div className="col-lg-3 col-md-6 col-xs-12">
          <div className="widget">
            <div className="widget-header">
              <div className="widget-icon green pull-left">
                <i className={this.props.icon}></i>
              </div>
              <div className="title">{this.props.dataLength}</div>
              <div className="comment">{this.props.title}</div>
            </div>
          </div>
        </div>
    );
  }
}

DashboardBox.propTypes = {
  title : React.PropTypes.string.isRequired,
  dataLength: React.PropTypes.number.isRequired
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  // task: PropTypes.object.isRequired,
  // showPrivateButton: React.PropTypes.bool.isRequired,
};