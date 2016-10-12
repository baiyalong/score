
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

// route components
import Root from '../../ui/Root.js';

import App from '../../ui/App/App.js';

import Admin from '../../ui/Admin/Admin.js';
import Login from '../../ui/Admin/Login.js';
import User from '../../ui/Admin/User.js';
import Work from '../../ui/Admin/Work.js';


const onLogin = (nextState, replace) => Meteor.userId() ? replace({ pathname: '/admin' }) : null

const onAdmin = (nextState, replace) => !Meteor.userId() ? replace({ pathname: '/login' }) : null

const notFound = (nextState, replace) => {
    var paths = ['/', '/app', '/admin', '/login', '/user', '/work']
    if (!paths.includes(nextState.location.pathname))
        replace({ pathname: '/app' })
}


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={Root}>
            <IndexRedirect to="/app" />
            <Route path="/app" component={App} />
            <Route path="/login" component={Login} onEnter={onLogin}/>
            <Route path="/admin" component={Admin} onEnter={onAdmin}>
                <IndexRedirect to="/user" />
                <Route path="/user" component={User} />
                <Route path="/work" component={Work} />
            </Route>
            <Route path="*" onEnter={notFound} />
        </Route>
    </Router>
);