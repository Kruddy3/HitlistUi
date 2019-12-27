import React, {Component} from 'react';

import MinimalActivityStream from '../components/minimalActivityStream';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import Welcome from '../components/welcome.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import {pinkA200, white, fullWhite} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import HorizontalActivityStream from '../components/horizontalActivityStream';


import ReactGA from 'react-ga';

import FontIcon from 'material-ui/FontIcon';
import ActionAndroid from 'material-ui/svg-icons/action/android';

const style = {
  margin: 12,
};

class WelcomeScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        transactions: [],
        loading: true,
        expandedWindow: false,
        expandedMac: false,
        expandedLinux: false,
    };
  }

  twitchLogin = () => {
    window.location.replace("/api/login/twitch");
  }

  componentDidMount(){
      var url = '/api/transactions'
      fetch(url, {
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors', // no-cors, cors, *same-origin
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
        })
        .then(function(response) {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              return response.json();
          })
          .then(response => {
            this.setState({
              transactions: response,
            });

          }).catch (error => {
          })



    }

    handleExpandW = () => {
    this.setState({expandedWindow: !this.state.expandedWindow});
  };
  handleExpandM = () => {
    this.setState({expandedMac: !this.state.expandedMac});
  };
  handleClick = () => {
    ReactGA.event({
      category: 'User',
      label: 'User hit the download button from the download page.',
      action: 'DownloadFinal',
      value: 10
    });
    alert('Coming soon! Sorry for the wait.')
  };
  render() {
      return (
        <div>
          <AppBar
            zDepth={0}
            showMenuIconButton={false}
            titleStyle={{color:'#fff'}}
            style={{backgroundColor:'none', color:'#fff', border:'none'}}
            title={<Link to={"/"} style={{color:'#fff', fontWeight:'bold'}}>HITLIST</Link>}
            iconElementRight={<FlatButton style={{color:pinkA200}} onClick={this.twitchLogin} label="Sign On With Twitch" />}
          />

        <div style={{paddingTop:'40px', maxWidth:'1200px', margin:'0 auto'}}>
              <div
                style={{
                  marginTop:'30px',
                  justifyContent: 'center',
                  display:'flex',flexWrap:'wrap'}} >

                  <div style={{width:'525px',padding:'50px 0'}}   >
                      <img
                        style={{display:'inline-block',float:'right',margin:'auto',maxWidth:'380px', width:'100%'}}
                        src="/desktop.png" />
                  </div>


                  <div className="findUs" style={{width:'525px',paddingTop:'30px',paddingBottom:'0px',paddingLeft:'25px',paddingRight:'25px'}} >
                    <h1 style={{marginBottom:'5px', fontSize:'3em', fontWeight:'100'}}>
                      Get Hitlist Miner
                    </h1>
                    <p style={{color:'white', padding:'10px 0', fontSize:'1.5em', fontWeight:'100'}}>
                      Mine up to <span style={{color:'yellow'}}>15x</span> faster than browser mining.               
                    </p>
                    <ul style={{color:'#fff', fontSize:'1.2em'}}>
                      <li>Instantly spendable</li>
                      <li>No transaction fee to send</li>
                      <li>Withdraw threshold only $5</li>
                    </ul>
                
                    <FlatButton fullWidth={true} onClick={this.handleClick} style={{margin:'15px 0'}} label="Windows (CUDA)" />
                    <FlatButton fullWidth={true} onClick={this.handleClick} style={{marginBottom:'15px'}} label="OSX (CPU)" />
                    <FlatButton fullWidth={true} onClick={this.handleClick} label="Linux (CUDA)" />
                    
              </div>

              <h1 style={{fontSize:'2.5em',fontWeight:'100',textAlign:'center'}}>Latest Activity</h1>

              
              <HorizontalActivityStream
                style={{margin:'auto'}}
                collection = {
                  this.state.transactions
                } />
              </div>


              
              <FlatButton style={{color:pinkA200, width:'300px', display:'block', margin:'50px auto'}} onClick={this.twitchLogin} label="Sign On With Twitch" />
              

              <div>
                
                <h1 id="faq" style={{fontSize:'2.5em',fontWeight:'100',textAlign:'center'}}>Frequently Asked Question</h1>
                <Card style={{maxWidth:'800px',margin:'auto',marginTop:'50px'}}>
                  <List>
                    <ListItem
                      primaryText="What Am I Mining?"
                      secondaryText="We're operating a Monero pool. HitPoints are issued for solved jobs - or HP for short."
                    />
                    <ListItem
                      primaryText="What Are The System Requirements?"
                      secondaryText="For Windows mining you need up-to-date CUDA drivers. OSX mining is strictly CPU at this point."
                    />
                    <ListItem
                      primaryText="What Is A HitPoint?"
                      secondaryText="These are tradable tokens on the Hitlist platform. They're earned by mining in the pool."
                    />
                    <ListItem
                      primaryText="How Much Is A HP Worth?"
                      secondaryText="We're currently pegging the value against the mining pool supportxmr.com PPS."
                    />
                    <ListItem
                      primaryText="How Do I Cash Out My HP?"
                      secondaryText="We're allowing cashing out to your Coinbase wallet, or your wallet on 1up Coin."
                    />
                    <ListItem
                      primaryText="Is There A Fee?"
                      secondaryText="It's free to mine and tip on the platform. Cashing out will cost 10% at a $5 minimum."
                    />
                  </List>
                </Card>
              </div>
          </div>
      </div>

    );
  }
}

export default WelcomeScreen;
