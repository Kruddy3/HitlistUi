import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import WithdrawalComingSoon from '../components/withdrawalComingSoon.js';


class Withdrawal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
      return (
        <WithdrawalComingSoon />
    );
  }
}

export default Withdrawal;
