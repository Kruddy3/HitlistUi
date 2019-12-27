import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import AccountCreation from '../components/accountCreation.js';


class MyProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
      return (
        <AccountCreation
          isDesktop={window.desktopApp}
        />
    );
  }
}

export default MyProfile;
