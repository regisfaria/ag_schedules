import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, color, ...props }) => (
  <Container type="button" btnColor={color} {...props}>
    {children}
  </Container>
);

export default Button;
