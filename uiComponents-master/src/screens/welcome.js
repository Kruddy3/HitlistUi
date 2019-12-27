import React, {Component} from 'react';

import MinimalActivityStream from '../components/minimalActivityStream';
import HorizontalActivityStream from '../components/horizontalActivityStream';
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
    };
  }

  twitchLogin = () => {
    window.location.replace("/api/login/twitch");
  }
  

  downloadPage = () => {
    ReactGA.event({
      category: 'User',
      action: 'DownloadButton',
      value: 1
    });
    
    window.location.replace("/download");
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


          <div style={{paddingTop:'40px'}}>
              <h1 style={{fontSize:'3em',fontWeight:'100',textAlign:'center'}}>
                Mine and tip instantly
              </h1>
              <p style={{ padding:"20px 0px",lineHeight: '35px',margin:'auto',color:'white',fontSize:'1.5em',fontWeight:'100',textAlign:'center',maxWidth:'350px'}}>
                  Support your favorite streamers with Hitlist Turbo Miner
              </p>

              <FlatButton style={{margin:'20px auto 0', display:'block', width:'300px'}} onClick={this.downloadPage}  label="Download Miner Now" />

              <div style={{
                marginTop:'30px',
                left: '0px',
                right: '0px',
                justifyContent: 'center',
                display:'flex',flexWrap:'wrap'}} >

                  <div style={{width:'525px',padding:'50px 0'}}   >
                      <img
                        style={{display:'inline-box',margin:'auto',maxWidth:'350px', float:'right',
                      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
                        src="/screenshot.png" />
                  </div>


                  <div className="findUs" style={{width:'525px',paddingTop:'30px',paddingBottom:'0px',paddingLeft:'25px',paddingRight:'25px'}} >
                    <h3 style={{marginBottom:'5px', paddingLeft:'20px', fontSize:'2.5em', fontWeight:'100'}}>
                      Latest Activity
                    </h3>
                    <div style={{paddingTop:'20px'}}>
                      
                    
                    <MinimalActivityStream
                        style={{margin:'auto'}}
                        collection = {
                          this.state.transactions
                        } />
                    </div>

                  </div> 
                  
              </div>
              
          </div>
      </div>
    );
  }
}

export default WelcomeScreen;
