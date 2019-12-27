import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Viewing from '../components/bigProfileBlock';
import Drawer from '../components/drawerContainer';
import { store } from '../store/store.js';
import {subscribe} from 'redux-subscriber';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      transactions: [],
      userViewing: '',
      loading: false,
      counter : 0,
    };
  }

  componentDidMount(){
    this.setState({
      counter:  this.props.counter
    })
    var loadingTransactions = store.getState().transactions
    if (this.props.match.params.viewingUsername != undefined) {
      this.setState({
        transactions: loadingTransactions,
        userViewing: this.props.match.params.viewingUsername
      });
      store.dispatch({type:'GETUSERSTRANSACTIONS', username:this.props.match.params.viewingUsername})
      this.unsubscribe = subscribe('transactions', valueFromStore =>{
        this.updateState(valueFromStore)
      })
    } else {
      this.setState({
        transactions: loadingTransactions,
        userViewing: store.getState().profile.username,
      });
      store.dispatch({type:'GETUSERSTRANSACTIONS', username:store.getState().profile.username})
      this.unsubscribe = subscribe('transactions', valueFromStore =>{
        this.updateState(valueFromStore)
      })
    }
    this.unsubscribe2 = subscribe('isLoading', valueFromStore2 =>{
        valueFromStore2.isLoading
        this.setState({
          loading: valueFromStore2.isLoading,
        })
    })


  }
  componentWillUnmount(){
    this.unsubscribe()
    this.unsubscribe2()
  }
  //listen for user prop change
    //dispatch redux event for loading tx's

  componentWillReceiveProps(nextProps){
    if (this.state.counter !== nextProps.counter) {
      this.setState({
        counter:  nextProps.counter
      })
    }

    if(nextProps.viewing) {
      nextProps.match.params.viewingUsername = nextProps.viewing;
    }

    if (nextProps.match.params.viewingUsername) {
      this.setState({
        userViewing: nextProps.match.params.viewingUsername,
      });
      store.dispatch({type:'GETUSERSTRANSACTIONS', username:nextProps.match.params.viewingUsername})
    } else {
      this.setState({
        userViewing: store.getState().profile.username,
      });
      store.dispatch({type:'GETUSERSTRANSACTIONS', username:store.getState().profile.username})
    }
  }

  updateState(valueFromStore) {
    this.setState({
      transactions: valueFromStore.transactions,
    });
  }

  render() {
    return (
      <div>
        <Viewing
          collection = {
            {username: this.state.userViewing}
          }
        />
        {
          this.state.loading ?
          (
            <CircularProgress
              color='white'
              style={{margin:'auto',marginTop:'50px',display:'flex',color:'white'}}
               size={80} thickness={5} />
          )

          :
          <ActivityStream
              collection = {
                this.state.transactions
              }
            />
        }

      </div>
    );
  }
}

export default Home;
