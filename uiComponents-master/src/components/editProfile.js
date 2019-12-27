import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// ~~~~~~~~~~~~~


export default class EditProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
      toggle:false,
    };
  }
  componentWillMount(){
    this.setState({
      value: this.props.collection.username,
      toggle: this.props.collection.privacy,
    });
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleToggle = () => {
    this.setState({
      private: !this.state.private
    })
  }
  render() {
      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <Card>
            <CardText
              style={{ paddingRight:'0px'}}
            >
              <TextField
                floatingLabelText='Username'
                id="text-field-controlled"
                value={this.state.value}
                onChange={this.handleChange}
              /><br />
                  <img
                    style={{borderRadius: '50%',height:'100px',width:'100px'}}
                    src={this.props.collection.userPic}
                    alt=""
                  />
                    <Toggle
                      labelPosition='right'
                      label='Privacy'
                      defaultToggled={this.state.toggle}
                      onToggle={this.handleToggle}
                    />
            </CardText>
            <CardActions>
              <FlatButton labelStyle={{color:'green', padding:'0'}} label="Upload new Image" onClick={this.handleReduce} />
              <FlatButton labelStyle={{padding:'0'}} label="Update Profile" onClick={this.handleExpand} />
            </CardActions>
          </Card>
        </div>
    );
  }
}
