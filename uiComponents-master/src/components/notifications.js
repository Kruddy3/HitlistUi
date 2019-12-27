import React, {Component} from 'react';
// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// ~~~~~~~~~~~~~




export default class Notifications extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recieved:false,
      sent:false,
      like:false,
    };
  }
  componentWillMount(){
    this.setState({
      recieved: this.props.collection.recieved,
      sent: this.props.collection.sent,
      like: this.props.collection.like,
    });
  }
  handleToggleR = () => {
    this.setState({
      recieved: !this.state.recieved
    })
  }
  handleToggleS = () => {
    this.setState({
      sent: !this.state.sent
    })
  }
  handleToggleL = () => {
    this.setState({
      like: !this.state.like
    })
  }

  render() {
      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <Card>
            <CardText>
              Notifications From:
              <Toggle
                labelPosition='right'
                label='Money Recieved'
                defaultToggled={this.state.recieved}
                onToggle={this.handleToggle}
              />
              <Toggle
                labelPosition='right'
                label='Money Sent'
                defaultToggled={this.state.sent}
                onToggle={this.handleToggle}
              />
              <Toggle
                labelPosition='right'
                label='Payment Like'
                defaultToggled={this.state.like}
                onToggle={this.handleToggle}
              />
            </CardText>
            <CardActions style={{}}>
              <Link to='/'>
                <FlatButton labelStyle={{color:'red', padding:'0'}} label="Back" onClick={this.handleReduce} />
              </Link>
                <FlatButton label="Update Settings" labelStyle={{padding:'0'}} onClick={this.handleExpand} />
            </CardActions>
          </Card>
        </div>
    );
  }
}
