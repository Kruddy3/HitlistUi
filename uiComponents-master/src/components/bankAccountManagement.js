import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

// ~~~~~~~~~~~~~


export default class BankManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render() {
      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <Card>
            <CardText
              style={{ paddingRight:'0px'}}>
              NOT SURE HOW TO DO THIS PART
            </CardText>
          </Card>
        </div>
    );
  }
}
