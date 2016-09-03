import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ModalInputName from './ModalInputName.jsx';


export default class EditWidgetModal extends Component {
  constructor(props) {
    super(props);
    //Bind event handlers in the constructor so they are only bound once for every instance
    // this.handleNameChange = this.handleNameChange.bind(this);
  };

  handleChange(source) {
    if (source === 'widgetName'){
      let widgetDataToSend = this.props.displayData;
      widgetDataToSend.name = this.refs.widgetName.value;
      this.props.onWidgetInput(widgetDataToSend)
    }  else if (source === 'widgetPrice'){
      let widgetDataToSend = this.props.displayData;
      widgetDataToSend.price = this.refs.widgetPrice.value;
      this.props.onWidgetInput(widgetDataToSend)
    } else if (source === 'widgetColor'){
      let widgetDataToSend = this.props.displayData;
      widgetDataToSend.color = this.refs.widgetColor.value;
      this.props.onWidgetInput(widgetDataToSend)
    } else if (source === 'widgetMelts'){
      let widgetDataToSend = this.props.displayData;
      widgetDataToSend.melts = this.refs.widgetMelts.value;
      this.props.onWidgetInput(widgetDataToSend)
    } else if (source === 'widgetInventory'){
      let widgetDataToSend = this.props.displayData;
      widgetDataToSend.inventory = this.refs.widgetInventory.value;
      this.props.onWidgetInput(widgetDataToSend)
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let widgetToSubmit = this.props.displayData;
    console.log('widgetToSubmit:', widgetToSubmit);

    if (widgetToSubmit && widgetToSubmit.id){
      console.log('PUTTING...');
      //PUT to update
      Meteor.call('putWidget', widgetToSubmit, (err) => {
        if (err){
          console.error(err);
        } else{
          //call parent's data request function to render all widgets including the new one created
          // this.props.onWidgetEdited();
        }
      });
    }
    else if (widgetToSubmit){
      console.log('POSTING...');
      //POST to update
      Meteor.call('postWidget', widgetToSubmit, (err) => {
        if (err){
          console.error(err);
        } else{
          //call parent's data request function to render all widgets including the new one created
          this.props.onWidgetEdited();
        }
      });
    }

  };

  // Using property 'data-dismiss' on button destroys onSubmit callback.
  // Using jquery to close modal
  dismissModal(){
    $('#myModal').modal('hide');
  }


  render() {
    return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog">

        {/*<!-- Modal content-->*/}
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Edit Widget</h4>
          </div>
          <div className="modal-body">
            <form id="widgetEditForm" className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>

              {/*/!*<!-- Name-->*!/*/}
              <div className="controls">
                Name:
                <input
                  id="widget-name"
                  name="widget-name"
                  type="text"
                  value={this.props.displayData.name}
                  onChange={this.handleChange.bind(this, 'widgetName')}
                  ref="widgetName"
                  className="input-medium"/>
              </div>

              {/*<!-- Price -->*/}
              <div className="controls">
                <div className="input-prepend">
                  Price:
                  <span className="add-on">$</span>
                  <input
                    id="widget-price"
                    name="widget-price"
                    className="input-medium"
                    value={this.props.displayData.price}
                    type="text"
                    onChange={this.handleChange.bind(this, 'widgetPrice')}
                    ref="widgetPrice"
                  />
                </div>
              </div>

              {/*<!-- Color -->*/}
              <div className="controls">
                Color:
                <select
                  id="widget-color"
                  name="widget-color"
                  className="input-large"
                  value={this.props.displayData.color}
                  ref="widgetColor"
                  onChange={this.handleChange.bind(this, 'widgetColor')}
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
                Melts:
                <input
                  type="checkbox"
                  name="widget-properties"
                  id="widget-properties-0"
                  ref="widgetMelts"
                  value={this.props.displayData.melts}
                  onChange={this.handleChange.bind(this, 'widgetMelts')}
                />
              </div>

              {/*<!-- Inventory -->*/}
              <div className="controls">
                Inventory:
                <input
                  id="widget-count"
                  name="widget-count"
                  type="text"
                  className="input-small"
                  value={this.props.displayData.inventory}
                  ref="widgetInventory"
                  onChange={this.handleChange.bind(this, 'widgetInventory')}
                />
              </div>
              {/*<button type="submit" className="btn btn-default" onClick={this.dismissModal.bind(this)}>Submit Edit</button>*/}
            </form>
          </div>
          <div className="modal-footer">
            <button
              form="widgetEditForm"
              type="submit"
              className="btn btn-default"
              onClick={this.dismissModal.bind(this)}>Submit Edit</button>
          </div>
        </div>

      </div>
    </div>
    )
  };
}

EditWidgetModal.propTypes = {
  displayData: PropTypes.object.isRequired,
  onWidgetInput : PropTypes.func.isRequired
};



