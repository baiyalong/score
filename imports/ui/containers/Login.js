import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import async from 'async';
import Login from '../components/Admin/Login';
import { Session } from 'meteor/session';




export default createContainer(({ params }) => {
    return {
        login: function (username, password) {
            async.waterfall([
                callback => {
                    var error = null;
                    if (password == '') error = '密码不能为空！'
                    if (username == '') error = '用户名不能为空！'
                    callback(error ? new Error(error) : null)
                },
                callback => Meteor.loginWithPassword(username, password, err => callback(err)),
                callback => Meteor.logoutOtherClients(callback)
            ], err => err ? Session.set('error', { message: err.message, timestamp: Date() }) : browserHistory.push('user'))
        }
    };
}, Login);



