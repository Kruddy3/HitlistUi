import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Payment from '../components/paymentCardsInputGiven';

class PaymentScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
      return (
        <Payment
          preLoadUser={this.props.match.params.id}
          preLoadAmount={this.props.match.params.amount}
          preLoadLink={this.props.match.params.returnLink}


        />
    );
  }
}

export default PaymentScreen;
