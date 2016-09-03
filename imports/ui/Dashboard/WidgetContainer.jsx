import React, { Component, PropTypes } from 'react';
import Headerbar from '../Headerbar.jsx';
import DashboardBox from './DashboardBox.jsx';
import DisplayTable from '../DisplayTable.jsx';

import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../api/tasks.js';


export default class WidgetContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {usersData: [], widgetsData: []};

  };
  getUsersFromApi() {
    let getUsersUrl = 'http://spa.tglrw.com:4000/users';
    let queryOptions = {
      timeout: 10000
    };
    HTTP.get(getUsersUrl, queryOptions, function(err, res){
      if (err){
        console.error(getUsersUrl, ": Returned statusCode:", err.statusCode, err.toString());
      } else{
        this.setState({usersData: res.data});
      }
    }.bind(this));
  };

  getWidgetsFromApi() {
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


  componentDidMount() {
    this.getUsersFromApi();
    this.getWidgetsFromApi();
  };

  render() {
    let tableHeaders = ['ID', 'Name'];
    return (
      <div className="dashboard">
        <div className="page-content">
          <div className="row">
            <DashboardBox title="Users" dataLength={this.state.usersData.length} icon="fa fa-users"/>
            <DashboardBox title="Widgets" dataLength={this.state.widgetsData.length} icon="fa fa-cubes"/>
          </div>
          <div className="row">
            <DisplayTable title="Users" displayData={this.state.usersData} tableHeaders={tableHeaders}/>
            <DisplayTable title="Widgets" displayData={this.state.widgetsData} tableHeaders={tableHeaders}/>
          </div>
        </div>
      </div>
    );
  }
}

WidgetContainer.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  // task: PropTypes.object.isRequired,
  // showPrivateButton: React.PropTypes.bool.isRequired,
};





