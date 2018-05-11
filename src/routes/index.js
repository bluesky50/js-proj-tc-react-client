import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../hoc/privateRoute.js';

import Home from './home.js';
import Dashboard from './dash.js';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/home" render={props => <Home {...props}/>}/>
            </Switch>
        </BrowserRouter>
    )
};