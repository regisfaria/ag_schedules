import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiArrowLeft } from 'react-icons/fi';

import {
  Container,
  DaysWeek,
  WookSchedule,
  InicializePage,
  AfterChooseOneDay,
  NewButton,
  SelectWorkToday,
  Back,
} from './styles';

import PageHeader from '../../components/PageHeader';
import Menu from '../../components/Menu';
import Select from '../../components/Select';
import Button from '../../components/Button';
import SectionRow from '../../components/SectionRow';

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

  const [buttonHoursWork, setButtonHoursWork] = useState(true);

  const [buttonRestTime, setButtonRestTime] = useState(false);

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
      setButtonHoursWork(true);
      setButtonRestTime(false);

      return;
    }

    setWorkToday(false);
  }, [workDays, choosenDay]);

  const handleButtonHoursWork = useCallback(() => {
    setButtonHoursWork(true);
    setButtonRestTime(false);
  }, []);

  const handleButtonRestTime = useCallback(() => {
    setButtonHoursWork(false);
    setButtonRestTime(true);
  }, []);

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

      <Back>
        <button
          type="button"
          onClick={() => {
            setChoosenDay(undefined);
          }}
        >
          <FiArrowLeft size={35} />
        </button>
      </Back>

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
        {choosenDay ? (
          <AfterChooseOneDay>
            <strong>Realizar Consultas Nesse Dia?</strong>

            <SelectWorkToday>
              <select name="consultState" onChange={handleSelectOptions}>
                <option value="true" selected={workToday}>
                  Sim
                </option>
                <option value="false" selected={workToday === false}>
                  Não
                </option>
              </select>
            </SelectWorkToday>

            {workToday ? (
              <SectionRow>
                <Button
                  color="yellow"
                  isSelected={buttonHoursWork}
                  onClick={handleButtonHoursWork}
                >
                  Horario de trabalho
                </Button>

                <Button
                  color={choosenDay.formatedOpenHour === -1 ? 'gray' : 'yellow'}
                  isSelected={buttonRestTime}
                  onClick={handleButtonRestTime}
                  disabled={choosenDay.formatedOpenHour === -1}
                >
                  Horario de Intervalo
                </Button>
              </SectionRow>
            ) : (
              <Button>Salvar</Button>
            )}

            <WookSchedule work={workToday}>
              {buttonHoursWork && (
                <SelectHour
                  id={choosenDay.id}
                  formatedOpenHour={choosenDay.formatedOpenHour}
                  formatedOpenMinute={choosenDay.formatedOpenMinute}
                  formatedCloseHour={choosenDay.formatedCloseHour}
                  formatedCloseMinute={choosenDay.formatedCloseMinute}
                />
              )}

              {buttonRestTime && (
                <RestTime
                  id={choosenDay.id}
                  formatedOpenMinute={choosenDay.formatedOpenMinute}
                  formatedCloseHour={choosenDay.formatedCloseHour}
                  formatedCloseMinute={choosenDay.formatedCloseMinute}
                />
              )}
            </WookSchedule>
          </AfterChooseOneDay>
        ) : (
          <InicializePage>
            <div>
              <p>Clique em um dia da semana para começar a editar</p>
            </div>
          </InicializePage>
        )}
      </Container>
    </>
  );
}
