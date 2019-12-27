import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
// ~~~~~~~~~~~~~
import initSubscriber from 'redux-subscriber';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import {pinkA200, white} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';





export default class ActivityStream extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      collection: ""
    };
    // this.collectionToList = this.collectionToList.bind(this)
  }

  collectionToList (collection){
    var i = 1;
    var styledArray = collection.slice(0, 6).map((user) => {
        i = i + 1;
        var color = 'green'
        if (!user.user1.username) {
          user.user1.username = 'USERNAME UNDEFINED'
        }
        if (!user.user2.username) {
          user.user2.username = 'USER UNDEFINED'
        }
        if (!user.user1.image) {
          user.user1.image = 'http://www.hitlist.tv/hl.png'
        }
        if (!user.message) {
          user.message = 'NO MESSAGE FOUND'
        }
        if (!user.likeCount) {
          user.likeCount = 0
        }
          return (
            <Link key={++i} to={"/"+user.user1.username} style={{width:"100%"}} >
            <ListItem
              key={++i}
              style={{color:'#fff',width:"100%"}}
              leftAvatar={<Avatar style={{width:'40px', border:'1px solid white',}} src={user.user1.image} />}
              primaryText={'@'+user.user1.username}
              secondaryText={
                  <p
                    style={{color:'#fff'}} >
                    {"Recieved "+user.AmountGiven+" HP "+ moment(user.createdAt).fromNow()}
                  </p>
              }
              secondaryTextLines={2}
            />
          </Link>

          );
      })
    return styledArray;
  }


  shouldComponentUpdate(nextProps, nextState){
    if (nextProps.collection === this.props.collection) {
      return false
    }

      return true
  }

  render() {
    return (
      <div>
        {this.props.collection ?
          <List>
            {this.collectionToList(this.props.collection)}
          </List>
          :
          <div></div>
        }
      </div>
    )
  }
}
