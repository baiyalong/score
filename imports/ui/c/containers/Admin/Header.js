import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Header from '../../components/Admin/Header';
import { Session } from 'meteor/session';


export default createContainer(({ params }) => {
    return {
        username: Meteor.user() && Meteor.user().username,
        logout: function () {
            
        }
    };
}, Header);



