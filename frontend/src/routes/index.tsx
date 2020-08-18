import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RegisterSpecialist from '../pages/RegisterSpecialist';
import RegisterSupervisor from '../pages/RegisterSupervisor';
import RegisterPacient from '../pages/RegisterPacient';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route
      path="/register/specialist"
      component={RegisterSpecialist}
      isPrivate
    />
    <Route
      path="/register/supervisor"
      component={RegisterSupervisor}
      isPrivate
    />
    <Route path="/register/pacient" component={RegisterPacient} isPrivate />

    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
