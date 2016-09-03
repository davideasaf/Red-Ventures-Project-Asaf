import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export default class WidgetRow extends Component {
  render() {
    return (
      <tr onClick={this.props.onRowClick.bind(this, this.props.widgetData)}>
        <td className="text-center">{this.props.widgetData.id}</td>
        <td>{this.props.widgetData.name}</td>
        <td>{this.props.widgetData.color}</td>
        <td>{this.props.widgetData.price}</td>
        <td>{this.props.widgetData.melts ? 'yes' : 'no'}</td>
        <td>{this.props.widgetData.inventory}</td>
      </tr>
    )
  };
}

WidgetRow.propTypes = {
  widgetData: PropTypes.object.isRequired,
  onRowClick : PropTypes.func.isRequired
};