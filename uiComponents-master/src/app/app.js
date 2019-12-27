import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {render} from 'react-dom';
import Home from '../screens/home';
import Payment from '../screens/payment';
import Payment2 from '../screens/paymentInfoGiven';
import Search from '../screens/search';
import MyProfile from '../screens/myProfile';
import Settings from '../screens/settings';
import AccountCreation from '../screens/accountCreation';
import Login from '../screens/accountLogin'
import Nav from '../components/topNav';
import NavNL from '../components/topNavNotLoggedIn';
import Welcome from '../screens/welcome';
import TwitchLogin from '../screens/twitchLogin';
import Withdrawal from '../screens/withdrawal';
import ErrorSnack from '../components/errorSnack'; // Our custom react component
import Download from '../screens/download';
import { withRouter } from 'react-router'
const NavNlRoutered = withRouter(NavNL)

// import Mine from '../screens/mine';
import Miner from '../screens/miner';
import Item from '../screens/item';
import Calculator from '../screens/calculator';

import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';


import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';



const styles = {
  container: {
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: pinkA200,
    primary2Color: '#ffe214',
    primary3Color: '#ffe214',
    accent1Color: '#ffe214',
    accent2Color: '#ffe214',
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: grey300,
    canvasColor: '#fff',
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  drawer: {
    color: '#eee'
  },
  svgIcon: {
    color: pinkA200
  },
  refreshIndicator: {
    strokeColor: '#fff',
    loadingStrokeColor: '#fff'
  },

  ripple: {
    color: fade(pinkA200, 0.87),
  },

  timePicker: {
    headerColor: pinkA200,
  },

  raisedButton: {
    color: '#ffe214',
    secondaryTextColor: '#000',
    textColor: pinkA200,
    primaryTextColor: pinkA200,
    secondaryTextColor: pinkA200,
  },

  flatButton: {
    color: '#ffe214',
    buttonFilterColor: '#000',
    textColor: pinkA200,
    primaryTextColor: pinkA200,
    secondaryTextColor: pinkA200,
  },
  floatingActionButton: {
      color: pinkA200,
      iconColor: pinkA200,
      secondaryColor: pinkA200,
      secondaryIconColor: pinkA200,
      disabledTextColor: pinkA200,
      disabledColor: pinkA200,
    },
  textField: {
    hintColor: '#fff'
  },
  appBar: {
    height: 60,
    color:pinkA200
  },
});


class BasicExample extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      viewing : null,
    };
  }


  render (){
    if (store.getState().profile.token == '') {
      return  (
        <MuiThemeProvider muiTheme={muiTheme} className='home' key='muiMainThem'>
          <ErrorSnack  />
          <div >
              <Router>
                <div>
                  <NavNlRoutered key='mainNav'/>
                  <div className='bodyView' >
                  <Switch key ='routes'>
                    <Route path="/twitch" component={TwitchLogin} />
                    <Route path="/createaccount" component={AccountCreation} />
                    <Route path="/login" component={Login} />
                    <Route path="/calculator/:userViewing/:viewierCount" component={Calculator} />
                    <Route path="/calculator/:userViewing" component={Calculator} />
                    <Route path="/calculator" component={Calculator} />
                    <Route path="/mine" component={Welcome} />
                    <Route path="/miner" component={Welcome} />
                    <Route path="/download" component={Download} />
                    <Route path="/settings" component={Welcome} />
                    <Route path="/transactions" component={TwitchLogin} />
                    <Route path="/withdrawal" component={Welcome} />
                    <Route path="/search" component={Welcome} />
                    <Route exact path="/" component={Welcome} />
                    <Route path="/:viewingUsername" component={Home} />
                  </Switch>
                </div>
              </div>
            </Router>
          </div>
          
          <div style={{color:"#fff", textAlign:'center', padding:'20px 0 0'}}>
            Made with &lt;3 in ATL
          </div>
          
          <div style={{color:"#fff", textAlign:'center', padding:'20px 0 50px 0'}}>
            <a href="legal.html" target="blank">Terms of Service</a>
          </div>
          
        </MuiThemeProvider>)
    } else {
      return (
      <MuiThemeProvider muiTheme={muiTheme} className='home' key='muiMainThem'>
        <ErrorSnack />
        <div>
            <Router>
              <div>
                <Nav key={'mainNav'}/>
                <div className='bodyView'>
                <Switch key ='routes'>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Home} />
                  <Route exact path="/createaccount" component={Home} />
                  <Route path="/item" component={Item} />
                  {/* <Route path="/mine" component={Mine} /> */}
                  <Route path="/calculator/:userViewing/:viewierCount" component={Calculator} />
                  <Route path="/calculator/:userViewing" component={Calculator} />
                  <Route path="/calculator" component={Calculator} />
                  
                  <Route path="/mine" component={Miner} />
                  <Route path="/search" component={Search} />
                  <Route path="/withdrawal" component={Withdrawal} />
                  <Route path="/download" component={Download} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/transactions/:id/:amount/:returnLink" component={Payment2} />
                  <Route path="/transactions/:id/:amount" component={Payment2} />
                  <Route path="/transactions/:id" component={Payment2} />
                  <Route path="/transactions" component={Payment} />
                  <Route path="/:viewingUsername" render={(props)=><Home {...props} viewing={this.state.viewing} ></Home>}/>
                </Switch>
              </div>
              </div>
            </Router>
        </div>
      </MuiThemeProvider>
      )
    }
  }
}

subscribe('profile.token', valueFromStore =>{
    render([ <BasicExample />], document.getElementById('app'));
})
render([ <BasicExample />], document.getElementById('app'));
