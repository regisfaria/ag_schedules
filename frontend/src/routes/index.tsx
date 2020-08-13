import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RegisterSpecialist from '../pages/RegisterSpecialist';
import RegisterAgent from '../pages/RegisterAgent';
import RegisterPacient from '../pages/RegisterPacient';
import RegisterConsult from '../pages/RegisterConsult';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/consults/create" component={RegisterConsult} isPrivate />
    <Route
      path="/register/specialist"
      component={RegisterSpecialist}
      isPrivate
    />
    <Route path="/register/agent" component={RegisterAgent} isPrivate />
    <Route path="/register/pacient" component={RegisterPacient} isPrivate />

    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
