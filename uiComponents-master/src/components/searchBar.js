import React, {Component} from 'react';
// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import { store } from '../store/store.js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class SearchBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      recipient: '',
      colors : [],
    };
  }

  handleClick = (e) => {
    if (this.state.colors.indexOf(this.state.recipient) < 0) {
      // console.log('DOEST EXIST');
    } else {
      // console.log(this.state.recipient);
      window.location.replace(this.state.recipient);
    }
  }

handleChangeRecipient = (event) => {
  if (event === '') {
    this.setState({
      colors: [],
    })
  }else {

  fetch('/api/auth/usersearch', {
    contentType: "application/json",
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      "authorization": store.getState().profile.token,
    },
    body: JSON.stringify({
        "username":event,
      }),
    method: 'POST', // *GET, POST, PUT, DELETE, etc
  })
  .then(function(response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(response => {
      if (response === []) {
        this.setState({
          colors: [],
        })
      }
      else {
          this.setState({
            colors: response,
          })
        }
    }).catch (e => {
        e.then((err) => console.log(err))
    })
  }
  this.setState({
    recipient: event,
  });
};
  render() {
      return (
        <div className="limitBody" style={{'marginTop':'15px'}}>
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > Search user by Username
           </h1>
          <Card>
            <CardText>
              <AutoComplete
                floatingLabelText="Recipient username"
                searchText={this.state.recipient}
                dataSource={this.state.colors}
                openOnFocus={true}
                onUpdateInput={this.handleChangeRecipient}
                fullWidth
                maxSearchResults={8}
                filter={(searchText, key) => searchText !== ''}
              />
            </CardText>
            <CardActions >
              <RaisedButton
                label="Go To Profile"
                primary={true}
                disabled= {this.state.colors.indexOf(this.state.recipient) < 0}
                style={{marginRight: 12}}
                onClick={this.handleClick}
              />
            </CardActions>
          </Card>
        </div>
    );
  }
}
