import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import Sidebar from '../Sidebar.jsx';
import Headerbar from '../Headerbar.jsx';
import DisplayTable from '../DisplayTable.jsx';


export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {usersData: [], currentUserView: {}};
  }
  loadUsersFromApi() {
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

  handleUserClickTable(userData){
    // console.log('userData:', userData);
    let userId = userData.id;
    //userData has all data to display but I will display hitting the API endpoint:
    //If this were specifically set to hit the API, I would only pass the ID up from the table child component
    let getUserUrl = 'http://spa.tglrw.com:4000/users/' + userId;
    let queryOptions = {
      timeout: 10000
    };
    HTTP.get(getUserUrl, queryOptions, function(err, res){
      if (err){
        console.error(getUserUrl, ": Returned statusCode:", err.statusCode, err.toString());
      } else{
        this.setState({currentUserView: userData});
        $('#myModal').modal('show');

      }
    }.bind(this));

    //Set Current User State
    // this.setState({currentUserView: userData});
    //Open Modal
    // $('#myModal').modal('show');
  }

  componentDidMount() {
    this.loadUsersFromApi();
    // setInterval(this.loadCommentsFromServer, 2000);
  };


  render() {
    //possible to set headers dynamically by getting data object's keys
    let tableHeaders = ['ID', 'Name', 'Avatar'];
    return (
      <div className="users">
        <UserModal displayData={this.state.currentUserView}/>
        <Headerbar page="Users"/>
        <Sidebar page="Users"/>
        <DisplayTable
          title='Users'
          tableHeaders={tableHeaders}
          displayData={this.state.usersData}
          avatar="true"
          onRowDataClick={this.handleUserClickTable.bind(this)}/>
      </div>
    )
  }
}

class UserModal extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {usersData: []};
  // }

  render() {
    // console.log('userData in state:', this.state.usersData);
    return (
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{this.props.displayData.name}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <h1 className="text-center"><img className="gravatar-large" src={this.props.displayData.gravatar}/></h1>
                <h3>Name: {this.props.displayData.name}</h3>
                <h3>Id: {this.props.displayData.id}</h3>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

UserModal.propTypes = {
  // title : React.PropTypes.string.isRequired,
  displayData: React.PropTypes.object.isRequired
};