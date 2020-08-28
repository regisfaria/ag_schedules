import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

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
import Select from '../../components/Select';
import Button from '../../components/Button';

import api from '../../services/api';

import SelectHour from '../../components/SelectHours';
import RestTime from '../../components/RestTime';

interface FormData {
  consultState: string;
  openTimeHour: number;
  timeMinute: number;
  closeTimeHour: number;
}

interface Days {
  id: string;
  day: number;
  workDay: boolean;
  formatedOpenHour: number;
  formatedOpenMinute: number;
  formatedCloseHour: number;
  formatedCloseMinute: number;
  formatedDay: string;
}

export default function App() {
  const formRef = useRef<FormHandles>(null);

  // Recebe os dados da api
  const [workDays, setWorkDays] = useState<Days[]>([]);

  // Recebe os dados, quando, um botão é selecionado
  const [choosenDay, setChoosenDay] = useState<Days>();

  // Verifica se aquele dia o cara trabalho ou não
  const [workToday, setWorkToday] = useState(false);

  // Get information by API
  useEffect(() => {
    api
      .get<Days[]>('/schedules/9d2eb621-53f8-42cb-9177-5aabac578c6d')
      .then(response => {
        setWorkDays(
          response.data.sort(function (a, b) {
            return a.day - b.day;
          }),
        );
      });
  }, []);

  // verify if the day is a work day or not
  useEffect(() => {
    if (!choosenDay) {
      return;
    }

    if (choosenDay.workDay === true) {
      setWorkToday(true);

      return;
    }

    setWorkToday(false);
  }, [workDays, choosenDay]);

  // Function On Change. It set the value at Work Today, when the select is changed
  const handleSelectOptions = useCallback(() => {
    setWorkToday(!workToday);
  }, [workToday]);

  // Update the workToday, when we change the day
  useEffect(() => {
    formRef.current?.setFieldValue('consultState', workToday);
  }, [workToday, choosenDay]);

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
                workDay={!dia.workDay}
                selectdAY={dia.id === choosenDay?.id}
              >
                {dia.formatedDay}
              </NewButton>
            );
          })}
        </DaysWeek>

        {/*  <InicializePage >
          <div>
            <p>Clique em um dia da semana para começar a editar</p>
          </div>
        </InicializePage> */}

        <AfterChooseOneDay>
          <div>
            <strong>Realizar Consultas Nesse Dia?</strong>
          </div>

          <select name="consultState" onChange={handleSelectOptions}>
            <option value="true" selected={workToday}>
              Sim
            </option>
            <option value="false" selected={workToday === false}>
              Não
            </option>
          </select>

          <Button>Horario de trabalho</Button>

          <Button>Horario de Intervalo</Button>

          <WookSchedule work={workToday}>
            {/* {choosenDay && (
              <SelectHour
                id={choosenDay.id}
                formatedOpenHour={choosenDay.formatedOpenHour}
                formatedOpenMinute={choosenDay.formatedOpenMinute}
                formatedCloseHour={choosenDay.formatedCloseHour}
                formatedCloseMinute={choosenDay.formatedCloseMinute}
              />
            )} */}

            {choosenDay && (
              <RestTime
                id={choosenDay.id}
                formatedOpenHour={choosenDay.formatedOpenHour}
                formatedOpenMinute={choosenDay.formatedOpenMinute}
                formatedCloseHour={choosenDay.formatedCloseHour}
                formatedCloseMinute={choosenDay.formatedCloseMinute}
              />
            )}
          </WookSchedule>
        </AfterChooseOneDay>
      </Container>
    </>
  );
}
