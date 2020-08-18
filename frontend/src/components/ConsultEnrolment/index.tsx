import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { FiCalendar, FiAlertTriangle } from 'react-icons/fi';
import { FaUser, FaUserMd } from 'react-icons/fa';

import { useField } from '@unform/core';

import Select from '../Select';

import 'react-datepicker/dist/react-datepicker.css';
import { DateContainer, Error } from './styles';
import api from '../../services/api';

registerLocale('pt', pt);

interface PacientResponse {
  id: string;
  name: string;
  cpf: string;
}

interface SpecialistResponse {
  id: string;
  name: string;
}

const ConsultEnrolment: React.FC = () => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(
    'consultDate',
  );

  const [date, setDate] = useState(defaultValue || null);
  const [pacients, setPacients] = useState<PacientResponse[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistResponse[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState('');

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

  useEffect(() => {
    api.get('/users/specialists').then(response => {
      setSpecialists(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/pacients').then(response => {
      setPacients(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSelectedSpecialist = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectSpecialistId = event.target.value;
      console.log(selectSpecialistId);
      setSelectedSpecialistId(selectSpecialistId);
    },
    [],
  );

  return (
    <>
      <Select name="pacient" icon={FaUser}>
        <option value="" selected hidden>
          Paciente
        </option>
        {pacients.map(pacient => (
          <option key={pacient.id} value={pacient.id}>
            {pacient.name} - {pacient.cpf}
          </option>
        ))}
      </Select>
      <Select
        name="specialist"
        onChange={handleSelectedSpecialist}
        icon={FaUserMd}
      >
        <option value="" selected hidden>
          Especialista
        </option>
        {specialists.map(specialist => (
          <option key={specialist.id} value={specialist.id}>
            {specialist.name}
          </option>
        ))}
      </Select>
      <DateContainer isErrored={!!error}>
        <FiCalendar size={20} />
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
          autoComplete="off"
        />

        {error && (
          <Error title={error}>
            <FiAlertTriangle color="#c53030" size={20} />
          </Error>
        )}
      </DateContainer>
    </>
  );
};

export default ConsultEnrolment;
