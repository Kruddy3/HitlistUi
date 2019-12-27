import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Redirect } from 'react-router'

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';
import AutoComplete from 'material-ui/AutoComplete';
import Snackbar from 'material-ui/Snackbar';
import ErrorSnack from '../components/errorSnack'; // Our custom react component

import Drawer from './drawerContainer';

export default class TopNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: 0,
      open: false,
      openSnack: false,
      recipient: '',
      colors : [],
      colorSnack: 'red',
      message: '',
      title: (<Link to="/">HITLIST</Link>),
      rightNavEle: (<span></span>),
      rightNavNoSeach: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location
  }

  select = (index) => this.setState({selectedIndex: index});

  toggleDrawer() {
    store.dispatch({type:'UPDATEBALANCE'})
    this.setState({
      open: !this.state.open
    })
    this.subNavBarItems = this.subNavBarItems.bind(this)
  }

subNavBarItems (collection){
  var styledArray = collection.map((user, index) => {
    var x = (
      <FontIcon className="material-icons">
        <img src={user.userPic} style={{'max-width':"100%", height:'25px'}}/>
      </FontIcon>)
      return (
        <Tab key={index}
          label={user.username}
        />
      );
  })
  return styledArray;
}

  handleChangeRecipient = (event) => {
    this.setState({
      recipient: event,
    });
    if (event === '') {
      this.setState({
        colors: [],
      })
    }else {

    fetch('/api/auth/usersearch', {
      contentType: "application/json",
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        "authorization": store.getState().profile.token,
      },
      body: JSON.stringify({
          "username":event,
        }),
      method: 'POST', // *GET, POST, PUT, DELETE, etc
    })
    .then(function(response) {
          if (!response.ok) {
              throw response.json();
          }
          return response.json();
      })
      .then(response => {
        if (response === []) {
          this.setState({
            colors: [],
          })
        }
        else {
            this.setState({
              colors: response,
            })
          }
      }).catch (e => {
          e.then((err) => console.log(err))
      })
    }


  };


  componentDidMount(){
    this.setState({
      title: (<Link to="/">HITLIST</Link>),
      rightNavNoSeach: store.getState().deviceViewing === 1 ? true : false
    })


    this.unsubscribe2 = subscribe('deviceViewing', valueFromStore2 =>{
      this.setState({
        title: (<Link to="/">HITLIST</Link>),
        rightNavNoSeach: store.getState().deviceViewing === 1 ? true : false
      })
    })
  }


  render() {
    var subNavBarIfGiven = ""
    if (this.props.collection) {
      subNavBarIfGiven = (
        <Tabs>
          {this.subNavBarItems(this.props.collection)}
        </Tabs>
      )
    }

    return (
      <div className='NAVBAR' style={{paddingBottom: '55px'}}>
        <AppBar
          className="nav_color"
          zDepth= {0}
          titleStyle={{whiteSpace: 'nowrap',overflow: 'hidden'}}
          style={{ position: "fixed"}}
          title={this.state.title}
          iconElementRight={
            this.state.rightNavNoSeach ?           <div  style={{whiteSpace: 'nowrap'}}>
                                  <Link to="/transactions">
                                  <FlatButton style={{marginLeft:'5px', display: 'inline-block',marginTop:'5px'}} label="Send HP" />
                                </Link>
                                </div>
                                : (<div  style={{whiteSpace: 'nowrap'}}>
              <div style={{display: 'inline-block', width:'150px'}}>
                  <AutoComplete
                    searchText={this.state.recipient}
                    dataSource={this.state.colors}
                    openOnFocus={true}
                    onUpdateInput={this.handleChangeRecipient}
                    hintText='Search'
                    fullWidth
                    maxSearchResults={8}
                    onNewRequest={() => {
                      window.location.replace("/"+this.state.recipient);

                      // history.push(newLocation)
                    }}
                    filter={(searchText, key) => searchText !== ''}
                  />
                </div>

                        <Link to="/transactions">
                        <FlatButton style={{marginLeft:'10px', display: 'inline-block',marginTop:'5px'}} label="Send HP" />
                      </Link>
                      </div>)
                    }
          onLeftIconButtonClick={this.toggleDrawer.bind(this)}
        />
        <Drawer
          renderThis={this.state.open}
        />
        <Paper zDepth={1} style={{position:'fixed' , top: '64px', zIndex: 50, width: '100%'}}>
            {subNavBarIfGiven}
        </Paper>

      </div>
    );
  }
}
