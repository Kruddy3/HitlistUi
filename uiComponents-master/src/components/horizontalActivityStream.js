import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};





export default class HorizontalActivityStream extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      collection: ""
    };
  }

  collectionToList (collection){
    var i = -1;
    var styledArray = collection.map((user) => {
        i = i++;
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
            
              <GridTile
                key={i++}
                title={<Link to={"/"+user.user1.username} >{user.user1.username}</Link>}
                subtitle={<Link to={"/"+user.user1.username} >{`+${user.AmountGiven}HP`}</Link>}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                
                  <img src={user.user1.image} />
                
              </GridTile>
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
    return this.props.collection ?
      <GridList cellHeight={120} padding={30} style={styles.gridList}>
        {this.collectionToList(this.props.collection)}
      </GridList> : <div></div>
  }
}
