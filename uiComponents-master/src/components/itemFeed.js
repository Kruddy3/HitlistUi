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
    };
  }

  render() {
      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <Card>
            <CardTitle
              title='Top Items'
              style={{textAlign:'center'}}
            />
            <div
              style={{marginLeft:'auto',marginRight:'auto',display:'flex',flexWrap: 'wrap',paddingBottom:'5px'}}
            >
              <Card
                  style={{minWidth:'290px',marginLeft:'auto',marginRight:'auto',display:'inline-block'}}
                >
                <CardText>
                  Example Item
                </CardText>
              </Card>
                <Card
                  style={{minWidth:'290px',marginLeft:'auto',marginRight:'auto',display:'inline-block'}}
                >
                  <CardText>
                    Example Item
                  </CardText>
                </Card>
            </div>
          </Card>
        </div>
    );
  }
}
