import React from 'react';
import { Container } from './styles';

interface MainProps {
  title?: string;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;
