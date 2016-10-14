import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Fingerprint2 from 'fingerprintjs2';
import async from 'async';
import ifvisible from 'ifvisible';
import Header from './Header';
import List from './List';


class App extends Component {
  constructor() {
    super()
    
  }
  componentDidMount() {
    new Fingerprint2().get(fp => this.props.connect({ fp }))
  }
  render() {
    return (
      <div style={{ height: '100%' }} >
        <Header user={this.props.user} />
        <List user={this.props.user} />
      </div>
    )
  }
}


import Users from '../../api/users/users';


export default createContainer(({ params }) => {
  Meteor.subscribe('users');
  return {
    connect: (user) => async.series([
      callback => Meteor.call('user.connect', user, callback),
      callback => status(user) || callback()
    ], callback),
    user: Users.findOne()
  };
}, App);



const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '连接服务器成功', timestamp: Date() });


function status(user) {
  ifvisible.setIdleDuration(30);
  ifvisible.focus(() => Meteor.call('user.focus', user));
  ifvisible.blur(() => Meteor.call('user.blur', user));
  ifvisible.wakeup(() => Meteor.call('user.wakeup', user));
  ifvisible.idle(() => Meteor.call('user.idle', user));
}