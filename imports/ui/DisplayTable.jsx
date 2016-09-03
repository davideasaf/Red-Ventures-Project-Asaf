import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export default class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
  };

  handleUserInput (filterText) {
    //LowerCase filterText for case insensitive match.
    this.setState({filterText: filterText.toLowerCase()});
  }
  handleRowClickItem(rowData, test){
    this.props.onRowDataClick(rowData);
  }

  render() {
    let rowsToShow;
    if (this.props.title.toLowerCase() === 'widgets'){
      rowsToShow = this.props.displayData.map((rowNode) => {
        //Apply filter
        if (rowNode.name.toLowerCase().indexOf(this.state.filterText) > -1)
          return <WidgetRow
            key={rowNode.id}
            rowData={rowNode}
            avatar={this.props.avatar}
            onRowClickItem={this.handleRowClickItem.bind(this)}
          />;
      })
    } else{
      rowsToShow = this.props.displayData.map((rowNode) => {
        //Apply filter
        if (rowNode.name.toLowerCase().indexOf(this.state.filterText) > -1)
          return <RegularRow
            key={rowNode.id}
            rowData={rowNode}
            avatar={this.props.avatar}
            onRowClickItem={this.handleRowClickItem.bind(this)}
          />;
      })
    }
    return (
        <div className="col-lg-6 col-xs-12">
          <div className="widget">
            <div className="widget-header">{this.props.title}
              <SearchBar onUserInput={this.handleUserInput.bind(this)} filterText={this.state.filterText}/>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-center">ID</th>
                  {this.props.tableHeaders.map((header) => {
                    if (header.toLowerCase() !== 'id')
                    return <th key={header}>{header}</th>
                  })}
                  </tr>
                </thead>
                <tbody>
                {rowsToShow}
                {/*{this.props.displayData.map((rowNode) => {*/}
                  {/*//Apply filter*/}
                  {/*if (rowNode.name.toLowerCase().indexOf(this.state.filterText) > -1)*/}
                  {/*return <RegularRow*/}
                    {/*key={rowNode.id}*/}
                    {/*rowData={rowNode}*/}
                    {/*avatar={this.props.avatar}*/}
                    {/*onRowClickItem={this.handleRowClickItem.bind(this)}*/}
                  {/*/>;*/}
                {/*})}*/}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

DisplayTable.propTypes = {
  title : React.PropTypes.string.isRequired,
  displayData: React.PropTypes.array.isRequired,
  tableHeaders: PropTypes.array.isRequired
};

class SearchBar extends Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div className="pull-right">
        <form>
          <input
            type="text"
            className="form-control input-sm"
            placeholder="Search..."
            value={this.props.filterText}
            ref="filterTextInput"
            onChange={this.handleChange.bind(this)}
          />
        </form>
      </div>
    )
  };
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText : PropTypes.string.isRequired
};

class RegularRow extends Component {
  render() {
    return (
      <tr onClick={this.props.onRowClickItem.bind(this, this.props.rowData)}>
        <td className="text-center">{this.props.rowData.id}</td>
        <td>{this.props.rowData.name}</td>
        {(() => {
          if (this.props.avatar === 'true') {
            return <td><img src={this.props.rowData.gravatar}/></td>
          }
        })()}
      </tr>
    )
  };
}

RegularRow.propTypes = {
  rowData: PropTypes.object.isRequired,
};

class WidgetRow extends Component {
  render() {
    return (
      <tr onClick={this.props.onRowClickItem.bind(this, this.props.rowData)}>
        <td className="text-center">{this.props.rowData.id}</td>
        <td>{this.props.rowData.name}</td>
        <td>{this.props.rowData.color}</td>
        <td>{this.props.rowData.price}</td>
        <td>{this.props.rowData.melts ? 'yes' : 'no'}</td>
        <td>{this.props.rowData.inventory}</td>
      </tr>
    )
  };
}

WidgetRow.propTypes = {
  rowData: PropTypes.object.isRequired,
};