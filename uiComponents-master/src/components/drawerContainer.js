import React, {Component} from 'react';

import Drawer from 'material-ui/Drawer';
import ProfileBlock from '../components/profileBlock'; // Our custom react component
import SiteLinks from '../components/siteLinks'; // Our custom react component
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


export default class DrawerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.renderThis,
      balance: 0,
      profile: ""
    };
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})

  }

  handleClose = () => {
    this.setState({open: false})
  }
  componentDidMount(){

    this.setState({
      balance: store.getState().profile.balance,
      profile:store.getState().profile
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





// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  componentWillReceiveProps(nextProps) {
    if (nextProps.renderThis != this.props.renderThis) {
      this.setState({open: true})
    }
  }


  render() {

      return (
        <Drawer
          onClick={this.handleClose}
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => {
            this.setState({open})

          }}
          >
          <Link to='/' onClick={this.handleClose}>
          <ProfileBlock
            key="userProfile"
            collection = {
              {username:this.state.profile.username,balance:this.state.balance, userPic: this.state.profile.profileImage || "http://www.hitlist.tv/hl.png"}
            }
          />
          </Link>
                <SiteLinks
                  whenClicked={this.handleClose}
                  collection = {
                    [
                      {settingName:'Mine', linkLoc:'/mine' ,userPic: 3},
                      {settingName:'Send HP', linkLoc:'/transactions' ,userPic: 2},
                      {settingName:'Find User', linkLoc:'/search' ,userPic: 1},
                      {settingName:'Cash Out', linkLoc:'/withdrawal' ,userPic: 4},
                      {settingName:'Logout', linkLoc:'/' ,userPic: 5, logoutFunction: 'logout'}
                  ]}
                />
        </Drawer>
    );
  }
}
