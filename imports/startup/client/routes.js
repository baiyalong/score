
import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

// route components
import RootContainer from '../../ui/layouts/Root.js';

import AppContainer from '../../ui/layouts/App.js';
import AppPage from '../../ui/containers/App.js';

import AdminContainer from '../../ui/layouts/Admin.js';
import LoginPage from '../../ui/containers/Login.js';
import UserPage from '../../ui/containers/User.js';
import WorkPage from '../../ui/containers/Work.js';

import NotFoundPage from '../../ui/containers/NotFound.js';


export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={RootContainer}>
            <IndexRedirect to="/app" />
            <Route path="/" component={AppContainer}>
                <Route path="/app" component={AppPage} />
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/admin" component={AdminContainer}>
                <IndexRedirect to="/login" />
                <Route path="/user" component={UserPage} />
                <Route path="/work" component={WorkPage} />
            </Route>
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
);