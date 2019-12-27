import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { store } from '../store/store.js';

// ~~~~~~~~~~~~~

export default class AccountCreation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render() {
      return (
        <div style={{paddingTop: '15px'}}>
          {/* <Card
            style={{float:'left',paddingTop:'30%',paddingBottom:'20%', height:'100%', textAlign:'left', width:'49%', margin:'auto', textAlign:'center',display:'block'}}>
            >
            <CardTitle
              title="The fastest way to mine and spend" />
          </Card>
          <Card style={{marginTop:'5px', textAlign:'center', minWidth:'100%', float:'left'}}>
            <Link to='/createaccount'>
              <CardTitle title= 'How Does it work?'
                subtitle=' Instead of waiting for a minimum payout, we let you spend your shares on an internal ledger.'
            />
          </Link>
          </Card>
          <Card style={{marginTop:'5px', textAlign:'center', maxWidth:'49%', float:'left'}}>
              <CardTitle title= 'What can I spend on?'
                subtitle='You can tip your friends or spend it in our internal marketplace!'
            />

          </Card>
          <Card style={{marginTop:'5px', textAlign:'center', maxWidth:'49%', float:'right'}}>
              <CardTitle title= 'How do I start?'
                subtitle="It\'s simple, all you need is a web browser. Sign up below and start mining now!"
            />
          </Card> */}
          <Card>
            <CardTitle
              title='The fastest way to mine and spend'
            />
            <CardText>
              <p>
              <strong>How Does it work?</strong>
               Instead of waiting for a minimum payout, we let you spend your shares on an internal ledger.
              </p>

              <p>
               <strong>What can I spend on?</strong>
               Honestly not much right now. You can send shares to other users, but we're working on an API and a marketplace.
              </p>

              <p>
               <strong>How do I start?</strong>
               It's simple, all you need is a web browser. Sign up below and start mining now!
              </p>

              <p>
               <strong>Will you run away with my funds?</strong>
               Quite possibly. This is just a side project right now. Shares are valued relative to supportxmr.com.
              </p>


              <Link to='/login'>
                <button>Start Mining!</button>
              </Link>
            </CardText>
          </Card>
        </div>

    );
  }
}
