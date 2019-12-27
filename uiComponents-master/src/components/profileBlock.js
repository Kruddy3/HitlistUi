import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';



export default class SmallDrawerProfileBlock extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  render() {
      return (
        <div className="limitBody">
          <Card>
            <CardHeader
              style={{wordBreak: 'break-word'}}
              className="drawer_profile_card"
              width='200px'
              title={this.props.collection.username}
              avatar={this.props.collection.userPic}
              subtitle={('HitPoints: ' + this.props.collection.balance)}
            />
          </Card>
        </div>
    );
  }
}
