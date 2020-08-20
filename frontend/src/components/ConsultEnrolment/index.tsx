/* eslint-disable import/no-duplicates */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { getDay, format } from 'date-fns';
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

  const [inputDate, setInputDate] = useState(defaultValue || null);
  const [pacients, setPacients] = useState<PacientResponse[]>([]);
  const [specialists, setSpecialists] = useState<SpecialistResponse[]>([]);
  const [specialistAvailableDays, setSpecialistAvailableDays] = useState<
    number[]
  >([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState('');
  const [hours, setHours] = useState('');

  const availableDays = useCallback(
    (date: Date) => {
      if (selectedSpecialistId === '') {
        return true;
      }
      const day = getDay(date);
      const isAvailable = specialistAvailableDays.includes(day);

      return isAvailable;
    },
    [selectedSpecialistId, specialistAvailableDays],
  );

  const handleSelectedSpecialist = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectSpecialistId = event.target.value;
      setSelectedSpecialistId(selectSpecialistId);
    },
    [],
  );

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
    });
  }, []);

  useEffect(() => {
    api.get('/pacients').then(response => {
      setPacients(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedSpecialistId === '') {
      return;
    }
    api
      .get(`/schedules/availableDays/${selectedSpecialistId}`)
      .then(response => {
        setSpecialistAvailableDays(response.data);
        console.log(response.data);
      });
  }, [selectedSpecialistId]);

  useEffect(() => {
    if (!inputDate) {
      return;
    }
    const day = getDay(inputDate);
    const parsedDate = format(inputDate, 'dd-MM-yyyy');

    api
      .get(
        `/schedules/availableHours/${selectedSpecialistId}&${day}&${parsedDate}`,
      )
      .then(response => {
        setHours(response.data);
        console.log(response.data);
      });
  }, [inputDate, selectedSpecialistId]);

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

        {specialistAvailableDays.length ? (
          <ReactDatePicker
            name="consultDate"
            ref={datepickerRef}
            selected={inputDate}
            locale="pt"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Data e Hora da consulta"
            useWeekdaysShort
            excludeDates={[new Date('2020-08-25')]}
            onChange={setInputDate}
            autoComplete="off"
            filterDate={availableDays}
          />
        ) : (
          <ReactDatePicker
            name="consultDate"
            ref={datepickerRef}
            placeholderText="Agenda indisponível"
            onChange={setInputDate}
            readOnly
          />
        )}

        {error && (
          <Error title={error}>
            <FiAlertTriangle color="#c53030" size={20} />
          </Error>
        )}
      </DateContainer>

      {/* <Select
        name="consultHour"
        onChange={handleSelectedSpecialist}
        icon={FaUserMd}
      >
        <option value="" selected hidden>
          Hora da consulta
        </option>
        {hours.map(hour => (
          <option key={hour} value={specialist.id}>
            {specialist.name}
          </option>
        ))}
      </Select> */}
    </>
  );
};

export default ConsultEnrolment;
