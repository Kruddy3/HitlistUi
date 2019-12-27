import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';

import { store } from '../store/store.js';

// ~~~~~~~~~~~~~

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      usernameNeeded: false,
      username:"",
      password:"",
      apitoken: "",
      isLoading: true,
      deniedLogin: false,
    };
    this.handleReduce = this.handleReduce.bind(this)
  }
  handleChangeU = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleChangeP = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleReduce = (event) => {

    fetch('/api/login/twitch/validate/'+this.state.apitoken, {
        contentType: "application/json",
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            "username":this.state.username,
            "password":this.state.password,
          }),
        method: 'POST', // *GET, POST, PUT, DELETE, etc
      })
      .then( (response) => {
          return response.json();

        }).catch( (error) => {

          return [];
        })
        .then((response) => {
          if (response.error) {
             store.dispatch({ type: 'FILLINMESSAGE', errorStatus:true,messageBody:response.error})
          }
          if (response.token) {
            // create account using
            store.dispatch({ type: 'TOKENLOGIN', token:response.token, history:this.props.history})

          }

        })


    // store.dispatch(
    //   {
    //     type: 'LOGIN',
    //     username: this.state.username,
    //     password: this.state.password,
    //     redirect: this.props.isDesktop
    //   })

  }
  handleKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.handleReduce()
    }
  }
  componentDidMount(){
    if (window.location.search === "?error=access_denied&error_description=The+user+denied+you+access") {
      this.setState({
        deniedLogin:true
      })
    } else {
      fetch('/api/login/twitch/validate' + window.location.search, {
          contentType: "application/json",
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc
        })
        .then( (response) => {
            if(response.status === 500) {
              //throw error;
              this.props.history.push('/')
              return false;
            }

            return response.json();

          }).catch( (error) => {

            return [];
          })
          .then((response) => {

            if (response.twitchToken) {
              this.setState({
                apitoken: response.twitchToken
              })
            }
            if (response.token) {
              store.dispatch({ type: 'TOKENLOGIN', token:response.token, history:this.props.history, redirect:window.isDesktop})

            } else {
              this.setState({
                isLoading:false
              })
            }
            if (response.usernameRequired) {
              this.setState({
                usernameNeeded:true
              })
            }
          })
    }

  }
  render() {
      if (this.state.deniedLogin) {
        return (
          <div className="limitBody" >
            <h1
              style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
              > Twitch Login Required!
             </h1>
          </div>
        )
      } else {

      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > Almost Done!
           </h1>
           {this.state.isLoading ?
             <CircularProgress
               color='white'
               style={{margin:'auto',marginTop:'50px',display:'flex',color:'white'}}
                size={80} thickness={5} />
             :
           <span>
             <Card
               style={{paddingBottom:'25px',
             width:'300px',margin:'auto'}}>


             {this.state.usernameNeeded ? <div><TextField
               hintText="ExampleUsername"
               style={{marginLeft:'auto',marginRight:'auto', display:'block'}}
               floatingLabelText="Enter Username here:"
               value= {this.state.username}
               onChange={this.handleChangeU}
               onKeyPress={this.handleKeyPress}
             /><br /></div> : <span></span>}


                 <TextField
                   hintText="Super$ecretPassw0rd"
                   floatingLabelText="Enter Password here:"
                   onKeyPress={this.handleKeyPress}

                   style={{marginLeft:'auto',marginRight:'auto', display:'block'}}
                   type='password'
                   value= {this.state.password}
                   onChange={this.handleChangeP}
                 />
             </Card>

             <Card style={{marginTop:'20px',marginBottom:'20px',height:'60px'}}>
                 <FlatButton style={{height:'60px'}}  onClick={this.handleReduce}  fullWidth label="Finalize Account" />
             </Card>
             </span>
           }

        </div>
      );
    }

  }
}
