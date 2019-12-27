import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
// ~~~~~~~~~~~~~
import { store } from '../store/store.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class BigProfileBlock extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      counter: 0,
      image: "",
      imageLoading: false,
      accountExists: true

    };
  }
    componentDidMount(){
      this.setState({
        counter:  this.props.counter
      })
      this.updateImageBlock(this.props.collection.username)

    }
    componentWillReceiveProps(next){
      this.setState({
        counter:  next.counter
      })
    }

    updateImageBlock = (username) => {
      if (username === "") {
        return false
      }
      var url = '/api/users/'+username
      this.setState({
        image:"",
        accountExists: true,
      })
        fetch(url, {
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors', // no-cors, cors, *same-origin
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
          })
          .then(function(response) {

                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(response => {

              this.setState({
                image:response.image
              })
            }).catch (error => {
              this.state.accountExists
              this.setState({
                accountExists:false
              })
            })
    }

    componentWillReceiveProps(next){
      if (next.collection.username !== this.props.collection.username) {
        this.updateImageBlock(next.collection.username)
      }
    }

  render() {

    var Balance = ''
    var userLink = ''
    var transfer = ''
    if (this.props.collection.username == store.getState().profile.username) {
      Balance = (<CardTitle
        style={{textAlign: 'center'}}
        subtitle={store.getState().profile.balance +' HitPoints'}
      />)
    } else {
        var userLink = this.props.collection.username
      }
      if (this.props.transfer !== false) {
        transfer = (<CardActions style={{}}>
          <div style={{marginBottom:0,marginLeft:'auto',marginRight:'auto'}}>
            {/* Link here */}
            <Link to={'/transactions/'+userLink}>
              <RaisedButton style={{width:'100%'}} secondary={true} labelStyle={{padding:'0'}} label="Send HitPoints" onClick={this.handleReduce} />
            </Link>
          </div>
        </CardActions>)
      }
      return (
        <div className="limitBody">
        {this.state.accountExists ?
          <div style={{paddingTop: '15px'}}>
            <Card>
              <CardText>
                <CardTitle style={{textAlign: 'center'}}
                  title={this.props.collection.username}
                  subtitle={this.state.counter}
                />
                    <img
                      style={{borderRadius: '50%',height:'100px',width:'100px',marginLeft: 'auto',marginRight: 'auto',	display: 'block'}}
                      src={this.state.image || "http://www.hitlist.tv/hl.png"}
                      alt=""
                    />
                  {Balance}
              </CardText>
              {transfer}
            </Card>
          </div>
          :
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > This user doesnt exist!
           </h1>
        }
      </div>
    );
  }
}
