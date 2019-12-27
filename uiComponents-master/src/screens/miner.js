import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Miner from '../components/miner';
import Nav from '../components/topNav';
import Drawer from '../components/drawerContainer';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';


import Script from 'react-load-script';


class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      userViewing: '',
      mining: null,
      counter: 0,
      message: {
        isError:false,
        message: ""
      },
    }
  }

  componentWillMount(){


      this.setState({
        mining: store.getState().miner.mining,
      });

      this.unsubscribe = subscribe('miner.mining', valueFromStore =>{
          this.setState({
            mining: valueFromStore.miner.mining,
          });
        })




    }
    componentWillUnmount(){
      this.unsubscribe()

    }
    
    handleScriptCreate() {
      this.setState({ scriptLoaded: false })
    }

    handleScriptError() {
      this.setState({ scriptError: true })
    }

    handleScriptLoad() {
      this.setState({ scriptLoaded: true })
    }


  render() {
    const isDesktop = window.desktopApp;
    window.server = "ws://hitlist.tv:8181"; //required for miner
    const webMiner = isDesktop ? null : <Script
      url="/brocoin.js"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}
    />
    
    return (
      <div>
        {webMiner}
        <Miner
          isDesktop={false ? true : false}
          isMining = {this.state.mining}
          scriptError = {this.state.scriptError}
        />

      </div>
    );
  }
}

export default Home;
