import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import WidgetRow from './WidgetRow';
import EditWidgetModal from './EditWidgetModal.jsx';

export default class WidgetsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {updateValues: {}};
  }
  clearForm(){
    ReactDOM.findDOMNode(this.refs.widgetName).value = '';
    ReactDOM.findDOMNode(this.refs.widgetPrice).value = 0;
    ReactDOM.findDOMNode(this.refs.widgetColor).value = 'red';
    ReactDOM.findDOMNode(this.refs.widgetMelts).checked = false;
    ReactDOM.findDOMNode(this.refs.widgetInventory).value = 0;

  }
  handleRowClick(widgetData){
    console.log('handling row click...');
    console.log('widgetData:', widgetData);
    $('#myModal').modal('show');

    this.setState({updateValues: widgetData});

    // function test() {
    //   console.log('what is this?', this);
    // }
    // test().bind(this);

    // updateValues = this;
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('this.refs:', this.refs);
    const doc = {
      name: this.refs.widgetName.value.trim(),
      price: this.refs.widgetPrice.value.trim(),
      color: this.refs.widgetColor.value.trim(),
      melts: this.refs.widgetMelts.checked,
      inventory: this.refs.widgetInventory.value.trim()
    };

    console.log('doc:', doc);
    console.log('event:', event);
    console.log('this:', this);

    //POST doc
    //CORS not enabled for API, Meteor method created for server call.
    Meteor.call('postWidget', doc, function(err){
      if (err){
        console.error(err);
      } else{
        //call parent's data request function to render all widgets including the new one created
        this.props.onCreateWidgetSubmit();
      }
    }.bind(this));

    //Clear form
    this.clearForm()
  }

  render() {

    return (
    <div className="row">
      {/*<!-- Create/Edit -->*/}
      <div className="row">

        {/*<!-- Widget listing -->*/}
        <div className="col-lg-12 col-xs-12">
          <div className="widget">
            <div className="widget-header">Create/Edit Template
              <div className="pull-right">
                <button className="btn btn-sm btn-info" type="submit" form="createWidgetForm" value="Submit">+ Create</button>
              </div>
            </div>
            <div className="widget-body">
              <form id="createWidgetForm" className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

                <legend>Create Widget</legend>

                {/*<!-- Name-->*/}
                <div className="controls">
                  Name
                  <input
                    id="widget-name"
                    name="widget-name"
                    type="text"
                    placeholder="foo-bar"
                    className="input-medium"
                    ref="widgetName"
                  />
                </div>

                {/*<!-- Price -->*/}
                <div className="controls">
                  <div className="input-prepend">
                    Price
                    <span className="add-on">$</span>
                    <input
                      id="widget-price"
                      name="widget-price"
                      className="input-medium"
                      placeholder="0.00"
                      type="text"
                      ref="widgetPrice"
                    />
                  </div>
                </div>

                {/*<!-- Color -->*/}
                <div className="controls">
                  Color
                  <select
                    id="widget-color"
                    name="widget-color"
                    className="input-large"
                    ref="widgetColor"
                    >
                    <option>red</option>
                    <option>purple</option>
                    <option>black</option>
                    <option>green</option>
                    <option>magenta</option>
                    <option>white</option>
                    <option>depends on the viewing angle</option>
                  </select>
                </div>

                {/*<!-- Melts -->*/}
                <div className="controls">
                  Melts
                  <input
                    type="checkbox"
                    name="widget-properties"
                    id="widget-properties-0"
                    ref="widgetMelts"
                  />
                </div>

                {/*<!-- Inventory -->*/}
                <div className="controls">
                  Inventory
                  <input
                    id="widget-count"
                    name="widget-count"
                    type="text"
                    placeholder="#?"
                    className="input-small"
                    ref="widgetInventory"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {(() => {
        console.log('what is the state during render?:', this.state.updateValues);
      })()}

      {/*<!-- Widget listing -->*/}
      <div className="col-lg-12">
        <div className="widget">
          <div className="widget-header">Widgets
            {/*<div className="pull-right">*/}
              {/*<button className="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal">+ Create</button>*/}
            {/*</div>*/}
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Name</th>
                <th>Color</th>
                <th>Price</th>
                <th>Melts?</th>
                <th>Inventory</th>
              </tr>
              </thead>
              <tbody>
              {this.props.widgetsData.map((widgetNode) => {
                return <WidgetRow
                  key={widgetNode.id}
                  widgetData={widgetNode}
                  onRowClick={this.handleRowClick.bind(this)}/>;
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    )
  };
}

WidgetsTable.propTypes = {
  widgetsData: PropTypes.array.isRequired,
  onCreateWidgetSubmit : PropTypes.func.isRequired
};


