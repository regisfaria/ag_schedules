import React from 'react';
// import Calendar from 'react-calendar';

import Menu from '../../components/Menu';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Menu />
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </>
  );
};

export default Dashboard;
