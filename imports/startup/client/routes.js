
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import RootContainer from '../../ui/containers/Root.js';

import AppContainer from '../../ui/containers/App.js';
import AppPage from '../../ui/pages/App.js';

import AdminContainer from '../../ui/containers/Admin.js';
import LoginPage from '../../ui/pages/Login.js';
import UserPage from '../../ui/pages/User.js';
import WorkPage from '../../ui/pages/Work.js';

import NotFoundPage from '../../ui/pages/NotFound.js';


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={RootContainer}>
            <Route path="/" component={AppContainer}>
                <Route path="/" component={AppPage}/>
            </Route>
            <Route path="/admin" component={AdminContainer}>
                <Route path="/login" component={LoginPage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/work" component={WorkPage}/>
            </Route>
            <Route path="*" component={NotFoundPage}/>
        </Route>
    </Router>
);