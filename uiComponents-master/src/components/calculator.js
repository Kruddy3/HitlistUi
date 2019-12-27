import React, {Component} from 'react';

// mui imports
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { store } from '../store/store.js';
import RaisedButton from 'material-ui/RaisedButton';
import {subscribe} from 'redux-subscriber';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ReactGA from 'react-ga';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// ~~~~~~~~~~~~~

const styles = {
  customWidth: {
    width: 200,
  },
};
export default class BankManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 2, //value 1 is 1060, 2 = 1070 640h/s, 3 =1080 850h/s
      hashingProfitPerHour : [130,200,470,460,640,850],
      currentUSDPayoutPerHash: 0.00004520833,
      miningTime: 6,
      viewerCount: "100",
      selected: [0],
      userViewing: ''
    }
  }
  handleChange = (event, index, value) => this.setState({value});


  componentWillMount() {
    if (this.props.viewierCount) {
      this.setState({
        viewerCount: this.props.viewierCount
      })
    }
    if (this.props.userViewing) {
      this.setState({
        userViewing: this.props.userViewing
      })
    } else {
      this.setState({
        userViewing: "to HITLIST"
      })
    }

  }
  validate = (s) => {
      var rgx = new RegExp(/^[0-9]*$/);
      return rgx.test(s)
  }
  handleChangeTransaction = (event) => {
    var value = (event.target.value)
    if (this.validate(value)) {
      this.setState({
        miningTime: (value),
      });
    }
    if (value.toString() == 'NaN') {
      this.setState({
        miningTime: 0,
      });
    }
  };
  twitchLogin = () => {
    ReactGA.event({
      category: 'Calculator',
      action: 'StreamerRegistered'
    });
    
    window.location.replace("/api/login/twitch");
  }
  handleChangeViewer = (event) => {
    var value = (event.target.value)
    if (this.validate(value)) {
      ReactGA.event({
        category: 'Calculator',
        action: 'SetState',
        value: value
      });
      
      this.setState({
        viewerCount: (value),
      });
    }
    if (value.toString() == 'NaN') {
      this.setState({
        viewerCount: 0,
      });
    }
  };
  render() {
      return (
        <div className="limitBody" style={{paddingTop: '10px'}}>
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > How much can I earn? 
           </h1>
           
           <p style={{padding:'0 0 30px',color:'#fff', textAlign:'center', fontSize:'1.3em', fontWeight:'100'}}>
             Each Twitch viewer can mine and donate small amounts to you. <br />
             Use this tool to calculate how much you can earn. 
           </p>
           
           <Card
             style={{marginTop:'5px'}}>
             <Table selectable={false} >
               <TableHeader
                 displaySelectAll={false}
                 adjustForCheckbox={false}>
                 <TableRow>
                   <TableHeaderColumn>WEEKLY MINED</TableHeaderColumn>
                   <TableHeaderColumn>MONTHLY MINED</TableHeaderColumn>
                   <TableHeaderColumn>YEARLY MINED</TableHeaderColumn>
                 </TableRow>
               </TableHeader>
               <TableBody
                 displayRowCheckbox={false}
                 >

                 <TableRow >
                   <TableRowColumn><h1 style={{color:'green'}}>{"$"+(Math.round(this.state.viewerCount) * this.state.hashingProfitPerHour[this.state.value]* this.state.currentUSDPayoutPerHash * this.state.miningTime * 7).toFixed(0)}</h1></TableRowColumn>
                   <TableRowColumn><h1 style={{color:'green'}}>{"$"+(Math.round(this.state.viewerCount) * this.state.hashingProfitPerHour[this.state.value]* this.state.currentUSDPayoutPerHash * this.state.miningTime * 7 * 4).toFixed(0)}</h1></TableRowColumn>
                   <TableRowColumn><h1 style={{color:'green'}}>{"$"+(Math.round(this.state.viewerCount) * this.state.hashingProfitPerHour[this.state.value]* this.state.currentUSDPayoutPerHash * this.state.miningTime * 365).toFixed(0)}</h1></TableRowColumn>
                 </TableRow>

               </TableBody>
             </Table>
             <CardTitle
               subtitle={"*Assumes the selected graphics card mines  $"+ (this.state.hashingProfitPerHour[this.state.value]* this.state.currentUSDPayoutPerHash * 24).toFixed(2)+  " a day"}
             />
           </Card>

          <Card
            style={{ marginTop:'5px'}}
            >
            <CardTitle
              style={{marginLeft:'9px'}}
              subtitle="Expected viewers mining"
            />
            <TextField
              hintText="0"
              style={{display:'block',paddingLeft:'25px'}}
              value= {this.state.viewerCount}
              onChange={this.handleChangeViewer}
            />
          
            <CardTitle
              style={{marginLeft:'9px'}}
              subtitle="Average user's graphics card"
            />
            <DropDownMenu  value={this.state.value} onChange={this.handleChange}>
              <MenuItem value={0} primaryText="940 MX" />
              <MenuItem value={1} primaryText="GTX 960" />
              <MenuItem value={2} primaryText="GTX 970" />
              <MenuItem value={3} primaryText="GTX 1060" />
              <MenuItem value={4} primaryText="GTX 1070" />
              <MenuItem value={5} primaryText="GTX 1080" />
            </DropDownMenu>

            <CardTitle
              style={{marginLeft:'9px'}}
              subtitle="Average hours per day spent mining"
            />
            <TextField
              hintText="0"
              style={{display:'block',paddingLeft:'25px'}}
              value= {this.state.miningTime}
              onChange={this.handleChangeTransaction}
              // onKeyPress={this.handleKeyPress}
            />

            

          </Card>


          <Card style={{marginTop:'20px',height:'60px'}}>
            <FlatButton onClick={this.twitchLogin} style={{height:'60px'}} labelStyle={{color:'red', padding:'0'}} fullWidth label="Create Account" />
          </Card>
        </div>
    );
  }
}
