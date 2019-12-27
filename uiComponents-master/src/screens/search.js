// empty nav with search as the body
// auto complete available

import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import SearchBar from '../components/searchBar';

class PaymentScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
      return (
        <SearchBar />
    );
  }
}

export default PaymentScreen;
