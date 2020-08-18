import React from 'react';
import { Container } from './styles';

interface SectionProps {
  title?: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <Container>
      {title && <strong>{title}</strong>}

      {children}
    </Container>
  );
};

export default Section;
