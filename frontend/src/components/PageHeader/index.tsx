import React from 'react';
import { Container } from './styles';

interface MainProps {
  title?: string;
  subTitle?: string;
}

const Main: React.FC<MainProps> = ({ title, subTitle, children }) => {
  return (
    <Container>
      {title && (
        <>
          <strong>{title}</strong>
          <span>{subTitle}</span>
        </>
      )}

      {children}
    </Container>
  );
};

export default Main;
