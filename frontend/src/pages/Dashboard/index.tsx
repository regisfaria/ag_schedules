import React from 'react';

import Menu from '../../components/Menu';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
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
