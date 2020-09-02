import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import Menu from '../../components/Menu';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user.type === 'admin' && <Redirect to={{ pathname: '/history' }} />}

      <Menu />
      <Container>
        <div>
          <h1>Dashboard</h1>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
