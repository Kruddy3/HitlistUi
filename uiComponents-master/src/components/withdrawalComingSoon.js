import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { store } from '../store/store.js';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import {red500} from 'material-ui/styles/colors';

// ~~~~~~~~~~~~~

export default class AccountCreation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
  }
  handleNext = () => {
    let {stepIndex} = this.state;
    if (stepIndex === 2) {
      stepIndex = -1;
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

handlePrev = () => {
  const {stepIndex} = this.state;
  if (stepIndex > 0) {
    this.setState({stepIndex: stepIndex - 1});
  }
};

renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Restart' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }


  render() {
    const {finished, stepIndex} = this.state;

      return (
        <div className="limitBody" style={{paddingTop: '15px'}}>
          <h1
            style={{ lineHeight: 'initial',textAlign:'center',margin:"50px 0px",fontSize: '2.8em',fontWeight: 'lighter'}}
            > Withdrawal coming soon
           </h1>
          <Card>
              <CardText >
                The withdrawal feature has yet to be implemented however your progress will be remembered when it is implemented. Feel free to send coins to friends and mine for yourself!

              </CardText>
              <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
               <Stepper activeStep={stepIndex} orientation="vertical">
                 <Step>
                   <StepLabel>Add your bitcoin wallet</StepLabel>
                   <StepContent>
                     {this.renderStepActions(0)}
                   </StepContent>
                 </Step>
                 <Step>
                   <StepLabel>Reach 1000 coins</StepLabel>
                   <StepContent >
                     <p>
                       The minimum requirement to withdrawal is going to be set at 1000 coins. To
                       reach this faster get your friends to send you the last bit you need,
                        leave the miner running overnight, or try our desktop miner.
                   </p>
                     {this.renderStepActions(1)}
                   </StepContent>
                 </Step>
                 <Step disabled>
                   <StepLabel
                     icon={<WarningIcon color={red500} />}>Get paid!</StepLabel>
                   <StepContent>
                     <p>
                       Soon to be implemented!
                     </p>
                     {this.renderStepActions(2)}
                   </StepContent>
                 </Step>
               </Stepper>
             </div>
             <CardMedia
               overlay={<CardTitle subtitle="Art by Selecto" />}
             >
               <img src='https://cdn.dribbble.com/users/1161834/screenshots/3817212/dashboard.gif'
                />
             </CardMedia>
          </Card>
        </div>
    );
  }
}
