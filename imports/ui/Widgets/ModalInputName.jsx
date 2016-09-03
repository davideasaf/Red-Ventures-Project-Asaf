import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


export default class ModalInputName extends Component {
  constructor(props) {
    super(props);
    this.state = {name: this.props.name};
    this.handleNameChange = this.handleNameChange.bind(this);
  };
  handleNameChange(e) {
    this.setState({name: e.target.value});
  };
  // componentWillReceiveProps(){
  //   this.setState({name: this.props.name});
  // }
  componentDidMount(){
    if (!this.state.name){
      this.setState({name: this.props.name});
    }
  }

  render() {
    // console.log('ModalInputName state.name:', this.state.name);
    return (
    // {/*<!-- Name-->*/}
    <div className="controls">
      Name:
      <input id="widget-name" name="widget-name" type="text" value={this.state.name} onChange={this.handleNameChange} className="input-medium"/>
    </div>
    )
  };
}

ModalInputName.propTypes = {
  // name: PropTypes.string.isRequired,
};