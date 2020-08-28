import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RegisterSpecialist from '../pages/RegisterSpecialist';
import RegisterSupervisor from '../pages/RegisterSupervisor';
import RegisterPacient from '../pages/RegisterPacient';
import RegisterConsult from '../pages/RegisterConsult';
import Profile from '../pages/Profile';
import MyAgenda from '../pages/MyAgenda';

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
    <Route
      path="/register/supervisor"
      component={RegisterSupervisor}
      isPrivate
    />
    <Route path="/pacients/create" component={RegisterPacient} isPrivate />

    <Route path="/profile" component={Profile} isPrivate />

    <Route path="/myagenda" component={MyAgenda} isPrivate />
  </Switch>
);

export default Routes;
