import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  isSelected,
  ...props
}) => (
  <Container
    type="button"
    btnColor={color}
    selectedColor={isSelected}
    {...props}
  >
    {children}
  </Container>
);

export default Button;
