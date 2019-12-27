import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { store } from '../store/store.js';
import RaisedButton from 'material-ui/RaisedButton';
import {subscribe} from 'redux-subscriber';
// ~~~~~~~~~~~~~


export default class BankManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      balance: 0,
      color: 'green',
      mining: false,
      label: 'Start Mining',
      backgroundClass: 'placeholder',
      backgroundColor: ''
    };
  }
  componentDidMount(){
    let balance = store.getState().profile.balance;
    this.setState({
      balance:balance
    })
    this.unsubscribe = subscribe('profile.balance', valueFromStore =>{
        this.setState({
          balance: valueFromStore.profile.balance,
        });
      })
    }

  componentWillUnmount(){
    this.unsubscribe()
  }
  handleClick = () =>{
    CoinHive.CONFIG.WEBSOCKET_SHARDS = [[`ws://${window.location.hostname}:8892`]];
    const miner = CoinHive.User('test', store.getState().profile.username);
    miner.on('accepted', () => {
      var balance = this.state.balance;
      balance = balance + 1;
      this.setState({
        balance:balance,
        backgroundClass:'mined',
      })

      setTimeout(this.changeBackground, 1000);
    })

    if (this.state.mining === false) {
      miner.start();

      this.setState({
        color: 'red',
        mining: true,
        label: 'Stop Mining',
      })
    } else {
      miner.stop();
      this.setState({
        color: 'green',
        mining: false,
        label: 'Start Mining'
      })

    }
  }
  changeBackground = () => {
    this.setState({
      backgroundClass:'rest',
    })
  }
  render() {
      return (
        <div className="limitBody" style={{paddingTop: '10px'}}>
          <div
            className={this.state.backgroundClass}
            style={{backgroundColor:this.state.backgroundColor,height:'100%',width:'100%',position:'absolute',bottom:'0px', left:'0px',zIndex:'-1'}}>
          </div>
          <Card
            style={{textAlign:'center', marginTop:'5px'}}
            >
            <CardTitle
              title="Start Mining"
            />
          </Card>
          <Card
            style={{textAlign:'center', marginTop:'5px', maxWidth:'50%',marginLeft:'auto',marginRight:'auto'}}
            >
            <CardTitle
              title={this.state.balance + ' coins'}
            />


          </Card>
          <RaisedButton
            style={{marginTop:'5px', position:'absolute', bottom:'0px', maxWidth:'600px', width:'100%'}}
            label={this.state.label}
            buttonStyle={{height:'100px',backgroundColor:this.state.color}}
            onClick={this.handleClick}
          />
        </div>
    );
  }
}
