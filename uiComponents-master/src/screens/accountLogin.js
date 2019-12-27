// username password login forgotPassword
import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import AccountLogin from '../components/accountLogin.js';

class MyProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {

      return (
      <AccountLogin
        isDesktop={window.desktopApp}
      />
    );
  }
}

export default MyProfile;
