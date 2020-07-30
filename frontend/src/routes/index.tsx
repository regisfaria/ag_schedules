import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/register" component={Register} isPrivate />
  </Switch>
);

export default Routes;
