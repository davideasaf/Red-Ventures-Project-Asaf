import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Sidebar from '../Sidebar.jsx';
import Headerbar from '../Headerbar.jsx';
import WidgetsTable from './WidgetsTable.jsx'
import EditWidgetModal from './EditWidgetModal.jsx';
import DisplayTable from '../DisplayTable.jsx'


export default class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {widgetsData: [], currentWidgetData: {}};
  };

  handleWidgetClickTable(widgetData){
  console.log('widgetData:', widgetData);
  let widgetId = widgetData.id;

  let getWidgeturl = 'http://spa.tglrw.com:4000/widgets/' + widgetId;
  let queryOptions = {
    timeout: 10000
  };
  HTTP.get(getWidgeturl, queryOptions, function(err, res){
    if (err){
      console.error(getWidgeturl, ": Returned statusCode:", err.statusCode, err.toString());
    } else{
      this.setState({currentWidgetData: widgetData});
      $('#myModal').modal('show');

    }
  }.bind(this));

  //Set Current User State
  // this.setState({currentUserView: userData});
  //Open Modal
  // $('#myModal').modal('show');
  };

  loadWidgetsFromApi() {
    let getWidgetsUrl = 'http://spa.tglrw.com:4000/widgets';
    let queryOptions = {
      timeout: 10000
    };
    HTTP.get(getWidgetsUrl, queryOptions, function(err, res){
      if (err){
        console.error(getWidgetsUrl, ": Returned statusCode:", err.statusCode, err.toString());
      } else{
        this.setState({widgetsData: res.data});
      }
    }.bind(this));
  };

  handleModalChange(inputChange) {
    console.log('inputChange:', inputChange);
    this.setState({currentWidgetData: inputChange})
  }

  componentDidMount() {
    this.loadWidgetsFromApi();
  };

  render() {
    let tableHeaders = ['Name', 'Color', 'Price', 'Melts?', 'Inventory'];

    return (
      <div className="widgets">
        <EditWidgetModal
          displayData={this.state.currentWidgetData}
          onWidgetInput={this.handleModalChange.bind(this)}
          onWidgetEdited={this.loadWidgetsFromApi.bind(this)}
        />
        <Headerbar page="Widgets"/>
        <Sidebar page="Widgets"/>
        <DisplayTable
          title='Widgets'
          tableHeaders={tableHeaders}
          displayData={this.state.widgetsData}
          onRowDataClick={this.handleWidgetClickTable.bind(this)}
        />
        {/*<CreateWidgetInput/>*/}
      </div>
    )
  }
}

