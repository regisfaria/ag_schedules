import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface Props extends InputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  text?: string;
}

const InputMask: React.FC<Props> = ({ name, icon: Icon, text, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setisFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      {text && <span>{text}</span>}
      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertTriangle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputMask;
