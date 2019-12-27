import { createStore } from 'redux' 
import Immutable from 'immutable';
import { loadState, saveState } from '../store/loadState'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-117391383-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactGA.ga('require', 'GTM-537XDQH'); //used for optimizely
ReactGA.ga('config', 'AW-978499232'); //conversion tracking



(function(history){
    var pushState = history.pushState;
    history.pushState = function(state) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
        }
        ReactGA.pageview(window.location.pathname + window.location.search);
        return pushState.apply(history, arguments);
    }
})(window.history);


function counter(state = {
  profile:{
    token: '',
    username: '',
    id: '',
    balance: '',
    privacy: '',
    profileImage: '',

  },
  transactions: [ ],
  isLoading: false,
  errors: [ ],
  miner: {
    intensity: 100,
    mining: false,
    message: {
      isError: false,
      messageBody: "",
    },
    scheduler: {
      isEnabled: false,
      startTime: "",
      endTime: "",
    }
  },
  deviceViewing: "desktop"
}
, action) {

  let immutableStore = Immutable.fromJS(state);

  switch (action.type) {

    case 'LOGIN':
    var username = action.username
    var redirect = action.redirect
    fetch('/api/login', {
      crossDomain: true,
      contentType: "application/json",
      processData: false,
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
          "username":action.username,
          "password":action.password,
        }),
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
    .then(function(response) {
          if (!response.ok) {
              throw response.json();
          } else {
            return response.json()
          }
      })
      .then(response => {
        var tokenFromLogin = response.token;
        var idFromLogin = response.id;
        var balanceFromLogin = response.balance;
        var usernameFromLogin = response.username;
        var privateFromLogin = response.private;
        var transactionsFromLogin = response.Transactions;
        
        ReactGA.set({ userId: idFromLogin });
        ReactGA.event({
          category: 'User',
          action: 'Login'
        });
          
        return store.dispatch({ type: 'LOADEDUSERACCOUNT', tokenFromLogin, usernameFromLogin, idFromLogin, balanceFromLogin, privateFromLogin,transactionsFromLogin, redirect})
      }).catch (error => {
         error.then(e => store.dispatch({ type: 'ERRORHANDLING', error:e}))
      })
      return immutableStore
        .setIn(['isLoading'], true)
        .toJS();

    case 'LOGOUT':
      ReactGA.event({
        category: 'User',
        action: 'Logout'
      });
      
      window.location.replace("/");
      return immutableStore
        .setIn(['profile','token'], '')
        .setIn(['profile','username'], '')
        .setIn(['profile','id'], '')
        .setIn(['profile','balance'], '')
        .setIn(['profile','privacy'], '')
        .setIn(['transactions'], [])
        .setIn(['isLoading'], false)
        .setIn(['profile','profileImage'], '' )
        .setIn(['errors'], [])
        .setIn(['miner','mining'], false)
        .setIn(['miner','intensity'], 100)
        .setIn(['miner','message','isError'], false)
        .setIn(['miner','message','message'], "")
        .setIn(['miner','scheduler','isEnabled'], false)
        .setIn(['miner','scheduler','startTime'], "")
        .setIn(['miner','scheduler','endTime'], "")
        .toJS();

    case 'CHANGESCHEDULE':
      ReactGA.event({
        category: 'Mining',
        action: 'Schedule'
      });
      
      return immutableStore
        .setIn(['miner','scheduler'],   {
            isEnabled: action.enabled,
            startTime: action.startTime,
            endTime: action.endTime,
          })
          .toJS();

    case 'CHANGEINTENSITY':
      ReactGA.event({
        category: 'Mining',
        action: 'Intensity'
      });
      
      return immutableStore
        .setIn(['miner',"intensity"],
            action.intensity,
          )
          .toJS();


    case 'SETVIEWINGMODE':
      return immutableStore
        .setIn(['deviceViewing'],
            action.device,
          )
          .toJS();

    case 'ISMINING':
      ReactGA.event({
        category: 'Mining',
        action: !store.getState().miner.mining ? 'Started' : 'Stopped'
      });
      
      if (action.setMining !== undefined) {
        return immutableStore
          .setIn(['miner','mining'], action.setMining)
          .toJS();
      } else {
        return immutableStore
          .setIn(['miner','mining'], !store.getState().miner.mining)
          .toJS();
      }


    case 'CREATENEWUSER':
      var redirect = action.redirect
      fetch('/api/users', {
          contentType: "application/json",
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
              "username":action.username,
              "password":action.password,
              'email':action.email,
              'private':false
            }),
          method: 'POST', // *GET, POST, PUT, DELETE, etc
        })
        .then(function(response) {
              if (!response.ok) {
                  throw response.json();
              }
              return response.json()
          })
          .then(response => {
            var tokenFromLogin = response.token;
            var idFromLogin = response.id;
            var balanceFromLogin = response.balance;
            var usernameFromLogin = response.username;
            var privateFromLogin = response.private;
            var transactionsFromLogin = response.Transactions;
            
            ReactGA.set({ userId: idFromLogin });
            ReactGA.event({
              category: 'User',
              action: 'Created'
            });
            ReactGA.event({
              category: 'User',
              action: 'Login'
            });
            
            store.dispatch({ type: 'LOADEDUSERACCOUNT', tokenFromLogin, usernameFromLogin, idFromLogin, balanceFromLogin, privateFromLogin,transactionsFromLogin,redirect})
          }).catch (error => {
             error.then(e => store.dispatch({ type: 'ERRORHANDLING', error:e}))
          })
    return state

    case 'FILLINTRANSACTIONS':
      return immutableStore
        .setIn(['transactions'], action.response)
        .toJS();

    case 'FILLINMESSAGE':
      return immutableStore
      .setIn(['miner','message','isError'], action.errorStatus)
      .setIn(['miner','message','messageBody'], action.messageBody)
      .toJS();


    case 'USERDATALOADING':
      return immutableStore
        .setIn(['isLoading'], false)
        .toJS();


    case 'LOADEDUSERACCOUNT':
    if (action.history) {
      action.history.push('/')
    }
    if (action.redirect === true) {
      action.history.push('/mine')
    }
    if (action.redirect === true) {
      return immutableStore
        .setIn(['transactions'], action.transactionsFromLogin)
        .setIn(['isLoading'], false)
        .setIn(['profile','token'], action.tokenFromLogin)
        .setIn(['profile','username'], action.usernameFromLogin)
        .setIn(['profile','id'], action.idFromLogin)
        .setIn(['profile','balance'], action.balanceFromLogin)
        .setIn(['profile','privacy'], action.privateFromLogin)
        .setIn(['profile','profileImage'], action.image )
        .toJS();
    }
    else {
      // window.history.pushState({}, 'Hitlist', action.usernameFromLogin);
      return immutableStore
        .setIn(['transactions'], action.transactionsFromLogin)
        .setIn(['isLoading'], false)
        .setIn(['profile','token'], action.tokenFromLogin)
        .setIn(['profile','username'], action.usernameFromLogin)
        .setIn(['profile','id'], action.idFromLogin)
        .setIn(['profile','balance'], action.balanceFromLogin)
        .setIn(['profile','privacy'], action.privateFromLogin)
        .setIn(['profile','profileImage'], action.image )
        .toJS();
    }


    case 'UPDATEBALANCE':
      var url = '/api/auth/updatebalance'
        fetch(url, {
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              "authorization": store.getState().profile.token,
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
              store.dispatch({ type: 'UPDATINGBALANCE', balance:response})

            }).catch (error => {
            })
    return immutableStore.toJS()

    case 'ERRORHANDLING':
    
      ReactGA.event({
        category: 'Error',
        action: 'Handled user error'
      });
      return immutableStore
        .setIn(['errors'], action.error)
        .toJS();

    case 'UPDATINGBALANCE':
        return immutableStore
          .setIn(['profile','balance'], action.balance[0])
          .toJS();

    case 'CLEARSTOREERRORS':
      return immutableStore
        .setIn(['errors'], [])
        .toJS();



    case 'GETUSERSTRANSACTIONS':
      var url = '/api/users/'+action.username+'/transactions'
      fetch(url, {
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            "authorization": store.getState().profile.token,
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
              store.dispatch({ type: 'USERDATALOADING'})
              return store.dispatch({ type: 'FILLINTRANSACTIONS', response})
          }).catch (error => {
            store.dispatch({ type: 'USERDATALOADING'})
            var x = []
            return store.dispatch({ type: 'FILLINTRANSACTIONS', x})

          })
      return immutableStore
        .setIn(['isLoading'], true)
        .toJS();

    case 'TOKENLOGIN':
        var redirect = action.redirect
        var tokenEntry = action.token
        var history = action.history
        fetch('/api/login/token', {
          crossDomain: true,
          contentType: "application/json",
          processData: false,
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
              "token":tokenEntry,
            }),
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
        })
        .then(function(response) {
              if (!response.ok) {
                  throw response.json();
              } else {
                return response.json()
              }
          })
          .then(response => {

            var tokenFromLogin = response.token;
            var idFromLogin = response.id;
            var balanceFromLogin = response.balance;
            var usernameFromLogin = response.username;
            var privateFromLogin = response.private;
            var transactionsFromLogin = response.Transactions;
            var image = response.image
            
            ReactGA.set({ userId: idFromLogin });
            ReactGA.event({
              category: 'User',
              action: 'TokenLogin'
            });
            
            return store.dispatch({ type: 'LOADEDUSERACCOUNT', tokenFromLogin, usernameFromLogin, idFromLogin, balanceFromLogin, privateFromLogin,transactionsFromLogin, redirect, image ,history})
          }).catch (error => {
             error.then(e => store.dispatch({ type: 'FILLINMESSAGE', errorStatus:true,messageBody:e}))
          })
          return immutableStore
            .setIn(['isLoading'], true)
            .toJS();

    default:
      return state
  }
}




const persistedState = loadState();
let store = createStore(counter, loadState());
store.subscribe(() => {
  saveState(store.getState())
})

import initSubscriber from 'redux-subscriber';
const subscribe = initSubscriber(store);


var windowWidth = window.innerWidth
function resizingFunc () {
   windowWidth = window.innerWidth;
   let tiny = 440;
   let small = 480;

   if (windowWidth < tiny) {
     visualType = 1
   }

   if (windowWidth > tiny && windowWidth < small) {
     visualType = 2
   }

   if (windowWidth > small && windowWidth < 800) {
     visualType = 3
   }

   if (windowWidth > 800) {
     visualType = 4;
   }

   store.dispatch({type:'SETVIEWINGMODE',device: visualType})

}

var resizeTimer;

window.onresize = function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

    resizingFunc()

  }, 25);
}

var visualType = "desktop"
if (windowWidth < 440) {
  visualType = 1
} else if (windowWidth < 480) {
  visualType = 2
} else if (windowWidth < 800) {
  visualType = 3
}
else {
  visualType = 4
}
store.dispatch({type:'SETVIEWINGMODE',device: visualType})

window.store = store

export { store };
