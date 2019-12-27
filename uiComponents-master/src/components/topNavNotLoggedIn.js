import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {subscribe} from 'redux-subscriber';
import { store } from '../store/store.js';


import Drawer from './drawerContainer';

export default class TopNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: 0,
      open: false,
      errorMsg: 'holding',
      openMsg: false,
      title:(<Link to="/">HITLIST</Link>)
    };
  }
  componentDidMount = () => {
    // if (store.getState().deviceViewing === "smoll") {
    //   this.setState({
    //     title: ""
    //   })
    // }
    this.unsubscribe = subscribe('errors', valueFromStore =>{
      if (valueFromStore.errors[0] !== undefined) {
        this.setState({
          errorMsg: valueFromStore.errors[0],
          openMsg:true,
        });
        store.dispatch({ type: 'CLEARSTOREERRORS'})
      }
    })


    // this.unsubscribe2 = subscribe('deviceViewing', valueFromStore2 =>{
    //   if (valueFromStore2.deviceViewing === "smoll") {
    //     this.setState({
    //       title: ""
    //     })
    //   } else {
    //     this.setState({
    //       title: (<Link to="/">HitList</Link>),
    //     })
    //   }
    // })
  }

  componentWillUnmount(){
    this.un=subscribe()
  }

  select = (index) => this.setState({selectedIndex: index});

  toggleDrawer() {
    this.setState({
        open: !this.state.open
    })
    this.subNavBarItems = this.subNavBarItems.bind(this)
}
subNavBarItems (collection){
  var styledArray = collection.map((user, index) => {
    var x = (<FontIcon className="material-icons"><img src={user.userPic} style={{'max-width':"100%", height:'25px'}}/></FontIcon>)
      return (
        <Tab key={index}
          label={user.username}
        />
      );
  })
  return styledArray;
}
handleRequestClose = () => {
 this.setState({
   openMsg: false,
 });
};

twitchLogin = () => {
  window.location.replace("/api/login/twitch");
}

  render() {
    var rightAppBar = (
    <div>

      {/* <Link to="/login" > */}
        <FlatButton onClick={this.twitchLogin} style={{display: 'inline-block',marginTop:'5px'}} label="Login with Twitch" />
      {/* </Link> */}
      {/* <Link to="/createaccount" >
        <FlatButton style={{marginLeft:'5px',display: 'inline-block',marginTop:'5px'}} label="Sign up" />
      </Link> */}
    </div>)
    return (
      <div>
        {this.props.location.pathname === '/' || this.props.location.pathname === '/download' || this.props.location.pathname === '/search' || this.props.location.pathname === '/withdrawal' || this.props.location.pathname === '/setting' || this.props.location.pathname === '/mine' ||this.props.location.pathname === '/miner' ?
        <div></div>
        :
        <div className='NAVBAR' style={{paddingBottom: '55px'}}>
          <Snackbar
              open={this.state.openMsg}
              message={this.state.errorMsg}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
              contentStyle={{width:'100%',backgroundColor:'red',marginLeft:'auto',marginRight:'auto'}}
              bodyStyle={{width:'100%',backgroundColor:'red',marginLeft:'auto',marginRight:'auto'}}
              style={{width:'100%',backgroundColor:'red',textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
            />

        <AppBar
          className="nav_color"
          zDepth= {0}
          style={{ position: "fixed" }}
          title={this.state.title}
          iconElementLeft={<div></div>}
          iconElementRight={rightAppBar}
        />
        </div>


        }
      </div>

    );
  }
}
