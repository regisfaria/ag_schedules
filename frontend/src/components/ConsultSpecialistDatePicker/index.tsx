import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { useField } from '@unform/core';

import 'react-datepicker/dist/react-datepicker.css';
import { DateContainer } from './styles';

registerLocale('pt', pt);

const ConsultSpecialistDatePicker: React.FC = () => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(
    'consultDate',
  );

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
    <>
      <DateContainer>
        <ReactDatePicker
          name="consultDate"
          ref={datepickerRef}
          selected={date}
          locale="pt"
          showTimeSelect
          timeCaption="Hora"
          timeFormat="p"
          isClearable
          minDate={new Date()}
          timeIntervals={30}
          placeholderText="Data e Hora da consulta"
          dateFormat="Pp"
          useWeekdaysShort
          onChange={setDate}
        />
      </DateContainer>
    </>
  );
};

export default ConsultSpecialistDatePicker;
