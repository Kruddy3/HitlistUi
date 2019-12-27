import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
// ~~~~~~~~~~~~~
import initSubscriber from 'redux-subscriber';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



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
    var i = -1;
    var styledArray = collection.map((user) => {
        var color = 'green'
        if (!user.user1.username) {
          user.user1.username = 'USERNAME UNDEFINED'
        }
        if (!user.user2.username) {
          user.user2.username = 'USER UNDEFINED'
        }
        if (!user.user2.image) {
          user.user2.image = 'http://www.hitlist.tv/hl.png'
        }
        if (!user.message) {
          user.message = 'NO MESSAGE FOUND'
        }
        if (!user.likeCount) {
          user.likeCount = 0
        }
        if (user.AmountGiven < 0) {
          // user.AmountGiven = user.AmountGiven * -1
          color = 'red'
          return (
            <Card key={++i} style={{"marginTop":"5px"}}>
              <Link to={user.user2.username}>
                <CardHeader
                  title={user.user1.username}
                  subtitle={'sends HP to @' + user.user2.username+ " " + moment(user.createdAt).fromNow()}
                  avatar={user.user2.image}
                />
            </Link>
              <CardTitle title={ user.AmountGiven} titleColor={color}/>
              <CardTitle
                title={user.message}
                style={{overflowWrap:'break-word'}}
              />
            </Card>
          );
        } else {
          return (
            <Card key={++i} style={{"marginTop":"5px"}}>
              <Link to={user.user2.username}>
                <CardHeader
                  title={user.user1.username}
                  subtitle={'recieves HP from ' + user.user2.username+ " " + moment(user.createdAt).fromNow()}
                  avatar={user.user2.image}
                />
              </Link>
              <CardTitle title={ user.AmountGiven} titleColor={color}/>
              <CardTitle
                title={user.message}
                style={{overflowWrap:'break-word'}}
              />
            </Card>
          );
        }



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
      <div className="limitBody">
        {this.props.collection ?
          <div style={{overflowX:'hidden'}}>
              {this.collectionToList(this.props.collection)}
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}
