import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<SelectProps> = ({ name, icon: Icon, ...props }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // This is for when I want to left the icon with color if any value was written in it
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setisFilled(!!selectRef.current?.value);
  }, []);

  // Below is to use unform on our forms. We register it so it can get values
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <select
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={selectRef}
        {...props}
      />
      {error && (
        <Error title={error}>
          <FiAlertTriangle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
