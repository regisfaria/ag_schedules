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

import Menu from '../../components/Menu';
import Button from '../../components/Button';
import SectionRow from '../../components/SectionRow';

import api from '../../services/api';

import SelectHour from '../../components/SelectHours';
import RestTime from '../../components/RestTime';
import Calendar from './components/DayPicker';

import { useToast } from '../../hooks/toast';
import { useReset } from '../../hooks/reset';
import { useAuth } from '../../hooks/auth';

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

const App: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const formRefSelectOption = useRef<FormHandles>(null);

  const { renderButtonsDays, renderButtonsDaysPage } = useReset();

  const { addToast } = useToast();
  const { user } = useAuth();

  // Recebe os dados da api
  const [arrayInfoDay, setArrayInfoDay] = useState<Days[]>([]);

  // Recebe os dados, quando, um botão é selecionado
  const [chosenDay, setChosenDay] = useState<Days>();

  // Verifica se aquele dia o cara trabalho ou não
  const [workToday, setWorkToday] = useState(false);

  const [buttonHoursWork, setButtonHoursWork] = useState(true);

  const [buttonRestTime, setButtonRestTime] = useState(false);

  // Get information by API
  useEffect(() => {
    api.get<Days[]>(`/schedules/${user.id}`).then(response => {
      setArrayInfoDay(
        response.data.sort(function (a, b) {
          return a.day - b.day;
        }),
      );

      if (chosenDay) {
        setChosenDay(response.data.find(day => day.id === chosenDay.id));
      }
    });
  }, [renderButtonsDays]);

  // verify if the day is a work day or not
  useEffect(() => {
    if (!chosenDay) {
      return;
    }

    if (chosenDay.workDay === true) {
      setWorkToday(true);
      setButtonHoursWork(true);
      setButtonRestTime(false);

      return;
    }

    setWorkToday(false);
  }, [arrayInfoDay, chosenDay]);

  // Update the workToday, when we change the day
  useEffect(() => {
    formRef.current?.setFieldValue('consultState', workToday);
  }, [workToday, chosenDay]);

  const handleButtonHoursWork = useCallback(() => {
    setButtonHoursWork(true);
    setButtonRestTime(false);
  }, []);

  const handleButtonRestTime = useCallback(() => {
    setButtonHoursWork(false);
    setButtonRestTime(true);
  }, []);

  const handleSelectOptions = useCallback(() => {
    setWorkToday(!workToday);

    if (workToday) {
      setButtonHoursWork(false);
      setButtonRestTime(false);
    }
  }, [workToday]);

  const handleSubmitSelectOption = useCallback(
    async (scheduleAvailabilityId: string) => {
      await api.put('/schedules', {
        scheduleId: scheduleAvailabilityId,
        openTime: -1,
        closeTime: -1,
      });

      await api.delete(`/schedules/rest/deleteAll/${scheduleAvailabilityId}`);

      renderButtonsDaysPage(!renderButtonsDays);

      addToast({
        type: 'success',
        title: 'Salvo com Sucesso',
      });
    },
    [addToast, renderButtonsDays, renderButtonsDaysPage],
  );

  return (
    <>
      {/*  <Menu /> */}

      <Calendar />

      {chosenDay && (
        <Back>
          <button
            type="button"
            onClick={() => {
              setChosenDay(undefined);
            }}
          >
            <FiArrowLeft size={35} />
          </button>
        </Back>
      )}

      <Container>
        <DaysWeek>
          {arrayInfoDay.map(dia => {
            return (
              <NewButton
                key={dia.id}
                onClick={() => {
                  setChosenDay(dia);
                }}
                workDay={!dia.workDay}
                selectDay={dia.id === chosenDay?.id}
              >
                {dia.formatedDay}
              </NewButton>
            );
          })}
        </DaysWeek>

        {chosenDay ? (
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
                  color={chosenDay.formatedOpenHour === -1 ? 'gray' : 'yellow'}
                  isSelected={buttonRestTime}
                  onClick={handleButtonRestTime}
                  disabled={chosenDay.formatedOpenHour === -1}
                >
                  Horario de Intervalo
                </Button>
              </SectionRow>
            ) : (
              <Form
                ref={formRefSelectOption}
                onSubmit={() => handleSubmitSelectOption(chosenDay.id)}
              >
                <Button type="submit">Salvar</Button>
              </Form>
            )}

            <WookSchedule work={workToday}>
              {buttonHoursWork && (
                <SelectHour
                  id={chosenDay.id}
                  formatedOpenHour={chosenDay.formatedOpenHour}
                  formatedOpenMinute={chosenDay.formatedOpenMinute}
                  formatedCloseHour={chosenDay.formatedCloseHour}
                  formatedCloseMinute={chosenDay.formatedCloseMinute}
                />
              )}

              {buttonRestTime && (
                <RestTime
                  id={chosenDay.id}
                  formatedOpenMinute={chosenDay.formatedOpenMinute}
                  formatedCloseHour={chosenDay.formatedCloseHour}
                  formatedCloseMinute={chosenDay.formatedCloseMinute}
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
};

export default App;
