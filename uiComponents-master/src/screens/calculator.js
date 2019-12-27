import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Calculator from '../components/calculator';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';


import ReactGA from 'react-ga';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userViewing: '',
      viewierCount: 0,

  }
}

componentWillMount() {
  
    ReactGA.set({ userId: this.props.match.params.userViewing });
  
    ReactGA.event({
      category: 'Calculator',
      action: 'Viewing'
    });
    
    this.setState({
      userViewing: this.props.match.params.userViewing,
      viewierCount: this.props.match.params.viewierCount,
    })
}



  render() {
    return (
      <div>
        <Calculator
          userViewing = {this.state.userViewing}
          viewierCount = {this.state.viewierCount}
        />

      </div>
    );
  }
}

export default Home;
