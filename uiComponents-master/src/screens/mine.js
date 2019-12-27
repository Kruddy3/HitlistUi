import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Mine from '../components/mine';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      userViewing: '',
    };
  }

  componentDidMount(){
      this.setState({
        userViewing: store.getState().profile.username,
      });
    }


  render() {
    return (
      <div>
        <Mine />

      </div>
    );
  }
}

export default Home;
