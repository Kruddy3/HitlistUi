import React, {Component} from 'react';

import ActivityStream from '../components/activityStream';
import Nav from '../components/topNav';
import Viewing from '../components/bigProfileBlock.js';
import Drawer from '../components/drawerContainer';

class MyProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
      return (
      <div>
        <Viewing
          collection = {
            {username:'example2',balance:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"}
          }
        />

        <ActivityStream
          collection = {
            [
              {username:'exampleuser1',recipient:'FAKE RECIPIENT',amount:1,message:'Fake message 1', likeCount:1, userPic: 'https://yt3.ggpht.com/a-/AJLlDp0oE1v5gLNPmxlZfgDKJfdZXc58GgyJN60Iqg=s900-mo-c-c0xffffffff-rj-k-no'},
              {username:'exampleuser2',recipient:'FAKE RECIPIENT',amount:2,message:'Fake message 2', likeCount:2, userPic: "https://pbs.twimg.com/profile_images/880710279243464704/L3nrOxZ3_400x400.jpg"},
              {username:'exampleuser3',recipient:'FAKE RECIPIENT',amount:3,message:'Fake message 3', likeCount:3, userPic: 'https://pbs.twimg.com/profile_images/941388691095900160/l6r706S-_400x400.jpg'},
              {username:'exampleuser4',recipient:'FAKE RECIPIENT',amount:4,message:'Fake message 4', likeCount:4, userPic: 'https://pbs.twimg.com/profile_images/956759075168993287/d6LPkZKZ.jpg'},
              {username:'exampleuser5',recipient:'FAKE RECIPIENT',amount:5,message:'Fake message 5', likeCount:5, userPic: 'https://www.billboard.com/files/media/Kevin-Gates-Main-press-Credit-Jimmy-Fontaine_2016_billboard_1548.jpg'},
          ]}
        />
      </div>
    );
  }
}

export default MyProfile;
