import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
// ~~~~~~~~~~~~~
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionLogout from 'material-ui/svg-icons/action/exit-to-app';
import ActionSend from 'material-ui/svg-icons/content/send';
import ActionTerrain from 'material-ui/svg-icons/maps/terrain';
import ActionMoney from 'material-ui/svg-icons/maps/local-atm';
import { store } from '../store/store.js';



export default class SiteLinks extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
    this.collectionToList = this.collectionToList.bind(this)
  }
  collectionToList (collection){
    var styledArray = collection.map((user) => {
      var tempImg = <ActionSearch />
      if (user.userPic === 2) {
        tempImg = <ActionSend />
      }
      if (user.userPic === 3) {
        tempImg = <ActionTerrain />
      }
      if (user.userPic === 4) {
        tempImg = <ActionMoney />
      }
      if (user.userPic === 5) {
        tempImg = <ActionLogout />
      }
      if (user.logoutFunction) {
        return (
          <Link to={user.linkLoc} className='siteLinks' key={user.settingName}>
            <Card key={user.settingName}
              onClick={() => store.dispatch({type:'LOGOUT'})}>
              <CardHeader
                title={user.settingName}
                avatar={tempImg}
              />
            </Card>
          </Link>
        );
      } else {
        return (
          <Link to={user.linkLoc} className='siteLinks' key={user.settingName}>
            <Card key={user.settingName}
              onClick={this.props.whenClicked}>
              <CardHeader
                title={user.settingName}
                avatar={tempImg}
              />
            </Card>
          </Link>
        );
      }

    })
    return styledArray;
  }

  render() {
      return (
        <div className="limitBody">


            {this.collectionToList(this.props.collection)}
        </div>
    );
  }
}
