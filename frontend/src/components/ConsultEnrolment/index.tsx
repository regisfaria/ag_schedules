/* eslint-disable import/no-duplicates */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { getDay, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { useField } from '@unform/core';

import { FiCalendar, FiAlertTriangle, FiClock } from 'react-icons/fi';
import { FaUserMd } from 'react-icons/fa';

import { useReset } from '../../hooks/reset';

import Select from '../Select';
import Input from '../Input';

import 'react-datepicker/dist/react-datepicker.css';
import { SpecialistInfo, DateContainer, Error } from './styles';

import api from '../../services/api';

registerLocale('pt', pt);

interface SpecialistResponse {
  id: string;
  name: string;
}

interface SpecialistProfileResponse {
  imageUrl: string;
  phoneNumber: string;
  city: string;
  state: string;
}

const ConsultEnrolment: React.FC = () => {
  const datepickerRef = useRef(null);

  const { resetCreateConsult } = useReset();

  const { fieldName, registerField, defaultValue, error } = useField(
    'consultDate',
  );

  const [inputDate, setInputDate] = useState(defaultValue || null);
  const [specialists, setSpecialists] = useState<SpecialistResponse[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState('');
  const [selectedSpecialistName, setSelectedSpecialistName] = useState('');
  const [
    specialistProfile,
    setSpecialistProfile,
  ] = useState<SpecialistProfileResponse | null>(null);
  const [specialistHolidays, setSpecialistHolidays] = useState<string[]>([]);
  const [validHoliday, setValidHolidays] = useState<Date[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  const [specialistAvailableDays, setSpecialistAvailableDays] = useState<
    number[]
  >([]);

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
      const selectedSpecialist = specialists.find(
        specialist => event.target.value === specialist.id,
      );
      if (selectedSpecialist) {
        setSelectedSpecialistName(selectedSpecialist.name);
      }
      setSelectedSpecialistId(selectSpecialistId);
    },
    [specialists],
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
    if (selectedSpecialistId === '') {
      return;
    }
    api
      .get(`/schedules/availableDays/${selectedSpecialistId}`)
      .then(response => {
        setSpecialistAvailableDays(response.data);
      });
  }, [selectedSpecialistId]);

  useEffect(() => {
    if (selectedSpecialistId === '') {
      return;
    }
    api.get(`/schedules/holiday/${selectedSpecialistId}`).then(response => {
      setSpecialistHolidays(response.data);
    });
  }, [selectedSpecialistId]);

  useEffect(() => {
    if (selectedSpecialistId === '') {
      return;
    }
    api.get(`/profiles/specialist/${selectedSpecialistId}`).then(response => {
      setSpecialistProfile(response.data);
    });
  }, [selectedSpecialistId]);

  useEffect(() => {
    if (!specialistHolidays.length) {
      return;
    }
    const holidayDates: Date[] = specialistHolidays.map(holiday => {
      return parseISO(holiday);
    });

    setValidHolidays(holidayDates);
  }, [specialistHolidays]);

  useEffect(() => {
    if (!inputDate) {
      return;
    }
    const day = getDay(inputDate);
    const parsedDate = format(inputDate, 'yyyy-MM-dd');

    api
      .get(
        `/schedules/availableHours/${selectedSpecialistId}/${day}/${parsedDate}`,
      )
      .then(response => {
        setHours(response.data);
      });
  }, [inputDate, selectedSpecialistId]);

  useEffect(() => {
    if (resetCreateConsult === false) {
      return;
    }
    setSelectedSpecialistId('');
    setSelectedSpecialistName('');
    setSpecialistProfile(null);
    setSpecialistHolidays([]);
    setValidHolidays([]);
    setHours([]);
    setSpecialistAvailableDays([]);
  }, [resetCreateConsult]);

  return (
    <>
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

      {/* {specialistProfile && (
        <SpecialistInfo>
          <div>
            <strong>{selectedSpecialistName}</strong>
            <p>
              Endereço:{' '}
              {specialistProfile.city
                ? `${specialistProfile.state}, ${specialistProfile.city}`
                : 'Nenhum endereço no perfil'}
            </p>
            <span>
              Telefone:{' '}
              {specialistProfile.phoneNumber
                ? specialistProfile.phoneNumber
                : 'Nenhum telefone no perfil'}
            </span>
          </div>
          <img src={specialistProfile.imageUrl} alt="profilePicture" />
        </SpecialistInfo>
      )} */}

      <SpecialistInfo profileExists={!!specialistProfile}>
        <div>
          <strong>{selectedSpecialistName}</strong>
          <p>
            Endereço:{' '}
            {specialistProfile?.city
              ? `${specialistProfile.state}, ${specialistProfile.city}`
              : 'Nenhum endereço no perfil'}
          </p>
          <span>
            Telefone:{' '}
            {specialistProfile?.phoneNumber
              ? specialistProfile.phoneNumber
              : 'Nenhum telefone no perfil'}
          </span>
        </div>
        <img src={specialistProfile?.imageUrl} alt="profilePicture" />
      </SpecialistInfo>

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
            placeholderText="Data da consulta"
            useWeekdaysShort
            excludeDates={validHoliday}
            onChange={setInputDate}
            autoComplete="off"
            filterDate={availableDays}
          />
        ) : (
          <ReactDatePicker
            name="consultDate"
            ref={datepickerRef}
            disabled
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

      {specialistAvailableDays.length ? (
        <Select name="consultHour" icon={FiClock}>
          <option value="" selected hidden>
            Hora da consulta
          </option>
          {hours.map(hour => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          name="consultHour"
          placeholder="Agenda indisponível"
          disabled
          icon={FiClock}
        />
      )}
    </>
  );
};

export default ConsultEnrolment;
