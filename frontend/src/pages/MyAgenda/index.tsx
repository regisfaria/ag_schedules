import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { setDay } from 'date-fns/esm';
import Radio from '../../components/RadioButton';
import {
  Container,
  DaysWeek,
  WookSchedule,
  InicializePage,
  AfterChooseOneDay,
  NewButton,
} from './styles';

import PageHeader from '../../components/PageHeader';
import Menu from '../../components/Menu';
import Main from '../../components/Main';
import Select from '../../components/Select';
import Button from '../../components/Button';

import api from '../../services/api';

import SelectHour from '../../components/SelectHours';
import { useAuth } from '../../hooks/auth';

interface FormData {
  consultState: string;
  openTimeHour: string;
  openTImeMinute: string;
  closeTimeHour: string;
  closeTImeMinute: string;
}

interface Days {
  id: string;
  day: number;
  openTime: number;
  closeTime: number;
}

export default function App() {
  const formRef = useRef<FormHandles>(null);

  const [workDays, setWorkDays] = useState<Days[]>([]);
  const [choosenDay, setChoosenDay] = useState<Days>();
  const [workToday, setWorkToday] = useState('');

  function handleSubmit(data: FormData) {
    console.log(data);
  }

  useEffect(() => {
    api
      .get<Days[]>('/schedules/9d2eb621-53f8-42cb-9177-5aabac578c6d')
      .then(response => {
        setWorkDays(response.data);
      });
  }, []);

  // verify if the day is a work day or not
  useEffect(() => {
    if (!choosenDay) {
      return;
    }
    choosenDay.openTime !== -1 ? setWorkToday('Sim') : setWorkToday('Não');
  }, [choosenDay]);

  //

  const handleSelectedCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setWorkToday(event.target.value);
    },
    [],
  );

  useEffect(() => {
    formRef.current?.setFieldValue('gender', workToday);
  }, [workToday, choosenDay]);

  console.log(choosenDay);

  return (
    <>
      <Menu />

      <Container>
        <DaysWeek>
          {workDays.map(dia => {
            return (
              <NewButton
                key={dia.id}
                onClick={() => {
                  setChoosenDay(dia);
                }}
                workDay={dia.openTime === -1}
                selectdAY={dia.id === choosenDay?.id}
              >
                {dia.day}
              </NewButton>
            );
          })}
        </DaysWeek>

        <InicializePage inicialize={workToday === ''}>
          <div>
            <p>Clique em um dia da semana para começar a editar</p>
          </div>
        </InicializePage>

        <AfterChooseOneDay inicialize={workToday === ''}>
          <div>
            <strong>Realizar Consultas Nesse Dia?</strong>
            <p>{workToday}</p>
          </div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            {/* <Radio
              name="consultState"
              options={[
                { id: 'Sim', label: 'Sim' },
                { id: 'Não', label: 'Não' },
              ]}
            /> */}

            <Select name="gender" onChange={handleSelectedCity}>
              <option value={workToday} selected hidden>
                {workToday}
              </option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Select>

            <WookSchedule work={workToday === 'Sim'}>
              <PageHeader
                title="Horários de Trabalho"
                subTitle="Marque abaixo os dias que você gostaria de trabalhar"
              />
              <SelectHour />
            </WookSchedule>

            <Button type="submit">Salvar</Button>
          </Form>
        </AfterChooseOneDay>
      </Container>
    </>
  );
}
