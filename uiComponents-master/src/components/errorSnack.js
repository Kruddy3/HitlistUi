import Snackbar from 'material-ui/Snackbar';
import React, {Component} from 'react';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';
export default class ErrorSnack extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openSnack: false,
      colorSnack: 'red',
      message: '',
    };
  }

  componentDidMount(){
    this.unsubscribe2 = subscribe('miner.message.messageBody', valueFromStore2 =>{
      if (valueFromStore2.miner.message.messageBody !== "") {

        if (valueFromStore2.miner.message.isError) {
          this.setState({
            message: valueFromStore2.miner.message.messageBody,
            openSnack: true,
            colorSnack: 'red'
          });
        } else {
          this.setState({
            message: valueFromStore2.miner.message.messageBody,
            openSnack: true,
            colorSnack: 'green'
          });
        }
        setTimeout(function () {
          store.dispatch({ type: 'FILLINMESSAGE', errorStatus:true,messageBody:""})
        }, 100);
      }

    })
  }
  componentWillUnmount(){
    this.unsubscribe2()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState === this.state) {
      return false;
    }
    return true
  }

  render(){
    return (
      <Snackbar
        bodyStyle={{width:'100%',backgroundColor:this.state.colorSnack,marginLeft:'auto',marginRight:'auto'}}
        style={{width:'100%',backgroundColor:this.state.colorSnack,textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
        open={this.state.openSnack}
        message={this.state.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    )
  }

}
