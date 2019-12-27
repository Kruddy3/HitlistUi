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
      username:"",
      email:"",
      password:"",
    };
  }
  handleChangeU = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleChangeE = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleChangeP = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleReduce = (event) => {
    store.dispatch({ type: 'CREATENEWUSER', username:this.state.username,password:this.state.password,email:this.state.email,redirect: this.props.isDesktop})
  }
  handleKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.handleReduce()
    }
  }
  render() {
      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > Create Account
           </h1>
          <Card
            style={{paddingBottom:'25px',
          width:'300px',margin:'auto'}}>
            <TextField
                hintText="ExampleUsername"
                floatingLabelText="HITLIST Username"
                style={{marginLeft:'auto',marginRight:'auto', display:'block'}}
                value= {this.state.username}
                onChange={this.handleChangeU}
                onKeyPress={this.handleKeyPress}
              />
              <br />
              <TextField
                hintText="example@example.com"
                floatingLabelText="Email:"
                style={{marginLeft:'auto',marginRight:'auto', display:'block'}}
                value= {this.state.email}
                onChange={this.handleChangeE}
                onKeyPress={this.handleKeyPress}

              />
              <br />
              <TextField
                hintText="Super$ecretPassw0rd"
                floatingLabelText="Password"
                type='password'
                style={{marginLeft:'auto',marginRight:'auto', display:'block'}}
                value= {this.state.password}
                onChange={this.handleChangeP}
                onKeyPress={this.handleKeyPress}

              />
          </Card>

          <Card style={{marginTop:'20px',marginBottom:'20px',height:'60px'}}>
              <FlatButton style={{height:'60px'}}  onClick={this.handleReduce}  fullWidth label="Create Account" />
          </Card>

          <Card style={{marginTop:'20px',marginBottom:'20px',height:'60px'}}>
            <Link to='/login'>
              <FlatButton style={{height:'60px'}} secondary fullWidth label="To Login" />
            </Link>
          </Card>
        </div>
    );
  }
}
