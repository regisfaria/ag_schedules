import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { FiCalendar, FiAlertTriangle } from 'react-icons/fi';

import { useField } from '@unform/core';

import 'react-datepicker/dist/react-datepicker.css';
import { Container, Error } from './styles';

registerLocale('pt', pt);

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
}

const Datepicker: React.FC<Props> = ({ name, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error}>
      <FiCalendar size={20} />
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        locale="pt"
        isClearable
        dateFormat="Pp"
        useWeekdaysShort
        onChange={setDate}
        autoComplete="off"
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

export default Datepicker;
