// empty nav with search as the body
// auto complete available

import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import TwitchLogin from '../components/twitchLogin';

class PaymentScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
      return (
        <TwitchLogin history={this.props.history} />
    );
  }
}

export default PaymentScreen;
