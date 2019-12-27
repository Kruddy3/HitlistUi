import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import SettingsComponent from '../components/settingsWrapper.js';


class MyProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
      return (
        <SettingsComponent
          collection = {
            {username:'example2',balance:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg", privacy:true}
          }
        />
    );
  }
}

export default MyProfile;
