import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Fingerprint2 from 'fingerprintjs2';
import Header from './Header';
import List from './List';


class App extends Component {
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
    connect: (user) => Meteor.call('user.connect', user, (err, res) => callback(err) || console.log(res)),
    user: Users.findOne()
  };
}, App);



const callback = (err, res) => Session.set('Info', { level: err ? '错误' : '信息', message: err ? err.message : '连接服务器成功', timestamp: Date() });