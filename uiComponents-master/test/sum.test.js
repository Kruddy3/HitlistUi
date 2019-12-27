import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Main from '../src/app/Main.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// COMPONENTS
import drawerContainer from '../src/components/topNav.js';
import SiteLinks from '../src/components/siteLinks.js';
import ActivityStream from '../src/components/activityStream.js';
import Nav from '../src/components/topNav.js';

import BodyProfile from '../src/components/profileBlock.js';
import NavProfile from '../src/components/mainBodyViewer.js';
import PaymentProcess from '../src/components/paymentCards.js';

// react router
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  debugger;

  const exampleMain = shallow(<Main />);

});
it('Appropriate amount of cards are formed', function(){
  expect(render(<MuiThemeProvider ><Router><SiteLinks collection = {[
      {settingName:'Transactions', linkLoc:'/' , userPic: 'https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no'},
      {settingName:'Search People', linkLoc:'/search' ,userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"},
      {settingName:'Settings', linkLoc:'/settings' ,userPic: 'https://pbs.twimg.com/profile_images/941388691095900160/l6r706S-_400x400.jpg'},
  ]}/></Router></MuiThemeProvider>).find('.siteLinks').length).toBe(3)
})

it('Transaction card is made when no input', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <ActivityStream />
  </Router>
</MuiThemeProvider>).text()).toEqual('No Transaction(s) foundPlease Try Again')
})

it('Transaction card with input', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <ActivityStream collection = {
      [
        {username:'exampleuser1',recipient:'FAKE RECIPIENT',amount:1,message:'Fake message 1', likeCount:1, userPic: 'https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no'},
        {username:'exampleuser2',recipient:'FAKE RECIPIENT',amount:2,message:'Fake message 2', likeCount:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"},
    ]}/>
  </Router>
</MuiThemeProvider>).text()).toEqual('exampleuser1recieves Funds from USER UNDEFINEDMessage: Fake message 1exampleuser2recieves Funds from USER UNDEFINEDMessage: Fake message 2')
})

it('Top Nav loading with no input', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <Nav/>
  </Router>
</MuiThemeProvider>).text()).toEqual('PixmoLogoutbalance: $TransactionsSearch PeopleSettingsSend Money')
})

it('Top Nav loading with input', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <Nav
      collection = {
        [
          {username:'example1', userPic: 'https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no'},
          {username:'example2', userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"},
      ]}
  />
  </Router>
</MuiThemeProvider>).text()).toEqual('PixmoLogoutbalance: $TransactionsSearch PeopleSettingsSend Moneyexample1example2')
})



// PaymentProcess
it('Payment Process renders without crashing', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <PaymentProcess />
  </Router>
</MuiThemeProvider>).text())
})

// BodyProfile
it('User data is loaded for who you\'re viewing ', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <BodyProfile
      collection = {
        {username:'example1',balance:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"}
      }
    />
  </Router>
</MuiThemeProvider>).text()).toEqual('example1balance: $2')
})

// NavProfile
it('User data is loaded for who you\'re viewing (on the nav bar)', function(){
  expect(render(<MuiThemeProvider >
    <Router>
    <NavProfile
      collection = {
        {username:'example1',balance:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"}
      }
    />
  </Router>
</MuiThemeProvider>).text()).toEqual('USERNAME\'s transaction history')
})
