import React from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { Step, Stepper, StepButton} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';

import { store } from '../store/store.js';

import ActivityStream from  './activityStream'

const styles = {
};


export default class PaymentCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: '',
      autoHideDuration: 4000,
      message: 'Transaction has been sent',
      dialogMsg: '',
      open: false,
      openDialog: false,
      stepIndex: 0,
      transactionMessage: '',
      transactionAmount: '',
      transactionAmount2: '',
      privacy: false,
      nextMsg: "Next",
      colors : [
      ],
    };
    }
    handleOpenDialog = () => {
    this.setState({openDialog: true});
    };

    handleCloseDialog = () => {
      this.setState({openDialog: false});
    };


    componentWillMount(){


        if (this.props.preLoadUser) {
          this.setState({
            recipient: this.props.preLoadUser,
            nextMsg: "Next"
          })
        }
        if (this.props.preLoadAmount) {
          this.setState({
            transactionAmount: this.props.preLoadAmount,
          })
        }



    }


    handleToggle = () => {
      this.setState({
        privacy: !this.state.privacy
      })
    }
    handleClick = () => {
      this.setState({
        open: true,
        recipient: '',
        stepIndex: 0,
        transactionMessage: '',
        transactionAmount: 0.00,
        dialogMsg: ''
      });
    };

    handleActionClick = () => {
      this.setState({
        open: false,
      });
    };

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
    handleChangeMessage = (event) => {
      var value = event.target.value
      this.setState({
        transactionMessage: value,
      });
    };
    validate = (s) => {
        var rgx = new RegExp(/^[0-9]*$/);
        return rgx.test(s)
    }

    handleChangeTransaction = (event) => {
      var value = (event.target.value)
      if (this.validate(value)) {
        this.setState({
          transactionAmount: (value),
        });
      }
      if (value.toString() == 'NaN') {
        this.setState({
          transactionAmount: 0,
        });
      }
    };

    handleRequestClose = () => {
      this.setState({
        open: false,
      });
      };
      state = {
        stepIndex: 0,
    };

  handleNext = () => {

    const {stepIndex} = this.state;
    if (stepIndex < 1) {
      this.setState({
        stepIndex: stepIndex + 1,
        nextMsg: "Send"
      });
    }
    if (stepIndex === 1) {
      this.submitTransaction()
    }

  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        nextMsg: "Next"
      });
    }
  };

  submitTransaction = () => {
    fetch('/api/auth/transactions', {
      contentType: "application/json",
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        "authorization": store.getState().profile.token,
      },
      body: JSON.stringify({
          "username":store.getState().profile.username,
          "recipientUsername":this.state.recipient,
          "message": this.state.transactionMessage,
          "private": this.state.privacy,
          "AmountGiven": this.state.transactionAmount
        }),
      method: 'POST', // *GET, POST, PUT, DELETE, etc
    })
    .then(function(response) {
          if (!response.ok) {
              throw response.json();
          }
          return response
      })
      .then(response => {
        if (this.props.preLoadLink) {
          window.location.replace("http://" + this.props.preLoadLink);

        } else {
          window.location.replace("/");

        }
      }).catch (e => {
          e.then((err) =>
            this.setState({
              openDialog:true,
              dialogMsg: err,
          })
      )
      })
  }

  getStepContent(stepIndex) {
    if (!this.props.preLoadAmount) {
      var amountInput = (          <TextField
                  floatingLabelText="Input Amount"
                  value={this.state.transactionAmount}
                  onChange={this.handleChangeTransaction}
                />)
    }
    switch (stepIndex) {
      case 0:
        return (<div>


          <CardText>

          <TextField
            floatingLabelText="Message"
            value={this.state.transactionMessage}
            onChange={this.handleChangeMessage}
            fullWidth
            multiLine={true}
            rows={5}
            rowsMax={20}
            hintText='Write the message here'
          />

          {amountInput}

          <Toggle
              label="Private"
              labelPosition="right"
              style={styles.toggle}
              onToggle={this.handleToggle}
            />
        </CardText>
      </div>)
      case 1:
        return (<CardText>
          <Card style={{"marginTop":"5px"}}>
              <CardHeader
                title={store.getState().profile.username}
                subtitle={'sends HP to ' + this.state.recipient}
                avatar={store.getState().profile.profileImage || "http://www.hitlist.tv/hl.png"}
              />
            <CardTitle title={ this.state.transactionAmount} titleColor="red"/>
            <CardText style={{overflowWrap: 'break-word'}}>
                Message: {this.state.transactionMessage}
            </CardText>
          </Card>


        </CardText>)
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    if (stepIndex !== 0) {
      var backButtonShow = (<RaisedButton
        label="Back"
        disabled={ stepIndex === 0}
        primary={false}
        fullWidth
        style={{marginBottom:5}}
        onClick={this.handlePrev}
      />)
    } else {
      var backButtonShow = ""
    }

    return (
      <div className="limitBody">
        <h1
          style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
          > {'Send ' +this.state.transactionAmount+ ' HitPoints to '+ this.state.recipient}
         </h1>
      <Card key={1} style={{"marginTop":"15px"}}>

      <Snackbar
          style={{backgroundColor:'red'}}
          open={this.state.openDialog}
          message={this.state.dialogMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleCloseDialog}
          contentStyle={{width:'100%',backgroundColor:'red',marginLeft:'auto',marginRight:'auto'}}
          bodyStyle={{width:'100%',backgroundColor:'red',marginLeft:'auto',marginRight:'auto'}}
          style={{width:'100%',backgroundColor:'red',textAlign:'center',marginLeft:'auto',marginRight:'auto'}}
        />

        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper linear={false} activeStep={stepIndex}>
            <Step>
              <StepButton >
              </StepButton>
            </Step>
            <Step>
              <StepButton >
              </StepButton>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {this.getStepContent(stepIndex)}
            <div style={{marginTop: 12,}}>

              <RaisedButton
                label={
                  // this.state.nextMsg
                  this.state.stepIndex === 1 ? "Send" : "Next"
                }
                primary={true}
                fullWidth
                style={{marginBottom:5}}
                onClick={this.handleNext}
              />
              {backButtonShow}

              <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={this.state.autoHideDuration}
                onActionClick={this.handleActionClick}
                onRequestClose={this.handleRequestClose}
              />
          </div>
        </div>
      </div>
    </Card>
  </div>
    );
  }
}
