import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Info from '../components/Info';
import { Session } from 'meteor/session';


export default createContainer(({ params }) => {
    return {
        error: Session.get('error')
    };
}, Info);



