import React, {Component} from 'react';

// mui imports
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ActionHome from 'material-ui/svg-icons/toggle/star-border';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { store } from '../store/store.js';
import RaisedButton from 'material-ui/RaisedButton';
import {subscribe} from 'redux-subscriber';
import Snackbar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment'
import Slider from 'material-ui/Slider';
import StartIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import {white500} from 'material-ui/styles/colors';

import CircularProgress from 'material-ui/CircularProgress';

export default class BankManagement extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      balance: 0,
      isWeb: !props.isDesktop,
      open: false,
      color: 'green',
      message: "",
      label: 'Start',
      backgroundClass: 'placeholder',
      backgroundColor: '',
      colorSnack: '',
      startClock: {},
      endClock: {},
      enabled: false,
      labelClock: "Enable Scheduler",
      clockToggleColor: 'red',
      intensity: 100,
      minerLoading: (<CircularProgress
        color={'#fff'}
        style={{margin:'auto',display:'flex'}}
         size={80} thickness={5} />)
    };
  }
  componentDidMount(){

    let balance = store.getState().profile.balance;
    this.setState({
      balance:balance,
      intensity: store.getState().miner.intensity
    })
    if (this.props.isMining === !false) {
      this.stopDesktopMiner();
      this.setState({
        color: 'red',
        label: <StopIcon  style={{verticalAlign: 'middle'}} color="white"/>,
      })
    } else {
      this.startDesktopMiner();
      this.setState({
        color: 'green',
        label: (<span>Mine HP <StartIcon style={{verticalAlign: 'middle'}} /></span>),
        minerLoading: '',
      })
    }
    this.unsubscribe = subscribe('profile.balance', valueFromStore =>{
        this.setState({
          balance: valueFromStore.profile.balance,
        });
      })

      var scheduler = store.getState().miner.scheduler
      if (scheduler.isEnabled === false) {
        this.setState({
          clockToggleColor: "red",
          labelClock: "Enable Scheduler",
          enabled: false,
        })
      }
      if (scheduler.isEnabled === true) {
        this.setState({
          clockToggleColor: "green",
          labelClock: "Disable Scheduler",
          enabled: true,
        })
      }
      if (!(new Date(scheduler.startTime).toString() === 'Invalid Date')) {
        this.setState({
          startClock: new Date(scheduler.startTime),
        })
      }
      if (!(new Date(scheduler.endTime).toString() === 'Invalid Date')) {
        this.setState({
          endClock: new Date(scheduler.endTime),
        })
      }



    }
    
    checkScript() {
      if(this.props.scriptError) {
        alert('Could not download miner. Try turning off your ad-blocker.');
        return false;
      }
      return true;
    }
    
    startDesktopMiner() {
      if(!this.checkScript()) {
        return false;
      }
      
      if(!this.props.isDesktop && window.startMining) {
        window.startMining("hitlist.tv", store.getState().profile.username);
        
        setInterval(function () {
          while (receiveStack.length > 0) {
            if(receiveStack.pop().identifier === 'hashsolved') {
              store.dispatch({type:'UPDATEBALANCE'});
              console.log('FOUND!');
            }
          };
        }, 1000);
        
        
        
      }
    }
    
    stopDesktopMiner() {
      if(!this.checkScript()) {
        return false;
      }
      
      if(!this.props.isDesktop && window.stopMining) {
        window.stopMining();
      }
    }

    componentWillReceiveProps(next){
      if (next.messageCounter > this.props.messageCounter) {
        this.setState({
          open: true,
          message: next.message.messageBody,
        })
        if (next.message.isError) {
          this.setState({
            colorSnack: 'orange'
          })
        }
        if (!next.message.isError) {
          this.setState({
            colorSnack: 'blue'
          })
        }
      }
      if (next.isMining === true) {
        this.startDesktopMiner();
        
        this.setState({
          color: 'red',
          label: <StopIcon style={{verticalAlign: 'middle'}} color="white"/>,
          minerLoading : (<CircularProgress
            color={'#fff'}
            style={{margin:'auto',display:'flex'}}
             size={80} thickness={5} />)
        })
      } else {
        this.stopDesktopMiner();
        this.setState({
          color: 'green',
          label: (<span>Mine HP <StartIcon style={{verticalAlign: 'middle'}} /></span>),
          minerLoading: "",
        })
      }
    }
    
    handleDownload() {
      window.open("/download");
      ReactGA.event({
        category: 'Miner',
        action: 'NativeButton'
      });
    }

  componentWillUnmount(){
    this.unsubscribe()

  }

  handleClick = () =>{
    store.dispatch({type:'ISMINING'})
  }
  handleClickForSnackBar = () => {
    this.setState({
      open: true,
    });
  };
  handleRequestClose = () => {
  this.setState({
    open: false,
  });
};
  changeBackground = () => {
    this.setState({
      backgroundClass:'rest',
    })
  }

  handleClickEnabled = () =>{
    store.dispatch({ type: 'CHANGESCHEDULE', enabled:!this.state.enabled, startTime:this.state.startClock,endTime:this.state.endClock})
    this.setState({
      enabled: !this.state.enabled
    })
    if (!this.state.enabled) {
      this.setState({
        clockToggleColor: "red",
        labelClock: "Disable Scheduler"
      })
    }
    else {
      this.setState({
        clockToggleColor: "green",
        labelClock: "Enable Scheduler"
      })
    }
  }

  handleChangeStartTime = (event, date) => {
    if (
      !(this.state.endClock instanceof Date)
    ) {
      var dateS = moment(date, "hh:mm:ss A")
        .add(8, 'hours')
        .format()
        // console.log(date ,new Date(dateS));
        this.setState({endClock: new Date(dateS)});
        this.setState({startClock: date});

        store.dispatch({ type: 'CHANGESCHEDULE', enabled:this.state.enabled, startTime:date, endTime:new Date(dateS)})
    } else {
       store.dispatch({ type: 'CHANGESCHEDULE', enabled:this.state.enabled, startTime:date, endTime:this.state.endClock})
     }
   };

   handleChangeEndTime = (event, date) => {

      this.setState({endClock: date});
      if (this.state.startClock !== {}) {
        store.dispatch({ type: 'CHANGESCHEDULE', enabled:this.state.enabled, startTime:this.state.startClock, endTime:date})
      } else {
        store.dispatch({ type: 'CHANGESCHEDULE', enabled:this.state.enabled, endTime:date})
      }
    };
  intensityChange = (e, value) => {
    store.dispatch({type:'CHANGEINTENSITY',intensity:value})
    this.setState({
      intensity:value
    })
  }

  render() {
      let btnMarkup = <div>
        <h3 style={{textAlign:'center'}}>Want to mine up to 15x faster?</h3>
        <RaisedButton
          style={{margin:'5px auto 40px', maxWidth:'250px',display:'block'}}
          label="Get Native Miner"
          buttonStyle={{height:'50px'}}
          onClick={this.handleDownload}
        />
      </div>;
      let empty = <div></div>;
      let webminerButton = this.state.isWeb ? btnMarkup : empty;
      
      let scheduler = this.state.isWeb ? empty : <Card expanded={this.state.enabled} onExpandChange={this.handleExpandChange}>
        <CardText>
          <Toggle
            toggled={this.state.enabled}
            onToggle={this.handleClickEnabled}
            labelPosition="right"
            label="Enable scheduled mining"
          />
        </CardText>
        <CardMedia
          expandable={true}
        >
          <div>
          <div
            style={{width:'100%',height:'100px',paddingTop:'5px'}}
            >
              <div
                style={{width:'50%',float:'left',height:'100px'}}
                >

                  <div
                    style={{textAlign:'center',display:'table',marginRight:'auto',marginLeft:'auto'}}
                    >
                      Start Time:
                      <div>
                        <TimePicker
                          style={{display:'inline-block'}}
                          textFieldStyle={{width:'75px'}}
                          hintText="Click Me!"
                          inputStyle={{ textAlign: 'center' }}
                          value={this.state.startClock}
                          onChange={this.handleChangeStartTime}
                          disabled = {!this.state.enabled}
                          minutesStep={5}
                        />
                      </div>
                </div>
              </div>
              <div
                style={{width:'50%',float:'left',height:'100px'}}
                >
                  <div
                    style={{textAlign:'center',display:'table',marginRight:'auto',marginLeft:'auto'}}
                    >
                      End Time:
                  <div>
                    <TimePicker
                      style={{display:'inline-block'}}
                      textFieldStyle={{width:'75px'}}
                      hintText="Click Me!"
                      inputStyle={{ textAlign: 'center' }}
                      value={this.state.endClock}
                      onChange={this.handleChangeEndTime}
                      autoOk
                      disabled = {!this.state.enabled}
                      minutesStep={5}
                    />
                  </div>
                </div>
              </div>
          </div>
          <Card
            style={{paddingLeft:'5px',paddingRight:'5px'}}
            >
            <CardTitle
              title="Select the mining intensity"
              style={{textAlign:'center'}}
            />
            <Slider
              style={{paddingRight:'15px',paddingLeft:'15px',paddingBottom:'5px'}}
              min={0}
              max={100}
              step={1}
              value={this.state.intensity}
              onChange={(event,value)=> { this.intensityChange(event,value) }}
            />
          </Card>
          </div>
        </CardMedia>
      </Card>;
      
      
      
    
    return (
      <div>
        <div className="limitBody" style={{padding: '10px 0'}}>
          <div
            className={this.state.backgroundClass}
            style={{backgroundColor:this.state.backgroundColor,height:'100%',width:'100%',position:'absolute',bottom:'0px', left:'0px',zIndex:'-1'}}>
          </div>
            <h1 style={{ lineHeight: 'initial',textAlign:'center',margin:"40px 0 20px",fontSize: '1.8em',fontWeight: 'lighter'}}>
              You Have
            </h1>
           <h1
             style={{lineHeight: 'initial',textAlign:'center',margin:"20px 0px",fontSize: '3.5em'}}
             >
             {this.state.balance} HP
            </h1>

            {this.state.minerLoading}

           <RaisedButton
             style={{margin:'5px auto 40px', maxWidth:'250px',display:'block'}}
             label={this.state.label}
             buttonStyle={{height:'50px'}}
             onClick={this.handleClick}
           />
        </div>
        
        {webminerButton}
        {scheduler}
      </div>
        
    );
  }
}
