import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
// ~~~~~~~~~~~~~
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import EditProfile from '../components/editProfile'
import Notifications from '../components/notifications'
import BankAccount from '../components/bankAccountManagement'

export default class SettingsWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
      return (
          <div className="limitBody" style={{paddingTop: '15px'}}>
            <Link to="/settings/profile">
              <Card>
                <CardText>
                  Edit Profile
                </CardText>
               </Card>
              </Link>
            <Link to="/settings/notifications">
              <Card>
                <CardText>
                  Notifications
                </CardText>
              </Card>
            </Link>
            <Link to="/settings/bank">
              <Card>
                <CardText>
                  Connected Bank Accounts
                </CardText>
              </Card>
            </Link>

            <EditProfile
              collection = {
                {username:'example2',balance:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg",private:false}
              }
            />
            <Notifications
              collection = {
                {recieved:false,sent:false,like:false}
              }
            />
            <BankAccount />
          </div>
    );
  }
}
