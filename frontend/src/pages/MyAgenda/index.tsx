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

  const [workDays, setWorkDays] = useState<Days[]>([]);
  const [choosenDay, setChoosenDay] = useState<Days>();
  const [workToday, setWorkToday] = useState('');

  const [inicialTimeHour, setInicialTimeHour] = useState<number>();
  const [inicialTimeMinute, setInicialTimeMinute] = useState<number>();
  const [finishTimeMinute, setFinishTimeMinute] = useState<number>();
  const [finishTimeHour, setFinishTimeHour] = useState<number>();

  const [possibleFinishTimeHour, setPossibleFinishTimeHour] = useState<
    number[]
  >([]);

  const [arrayHour, setArrayHour] = useState<number[]>([]);

  const [specialCaseTwentTree, setSpecialCaseTwentTree] = useState(false);

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

  // Create Array for all inicial hours
  useEffect(() => {
    const eachHourArray = Array.from({ length: 24 }, (_, index) => index);

    setArrayHour(eachHourArray);
  }, []);

  // verify if the day is a work day or not
  useEffect(() => {
    if (!choosenDay) {
      return;
    }

    if (choosenDay.workDay === true) {
      setWorkToday('Sim');

      setInicialTimeHour(choosenDay.formatedOpenHour);
      setInicialTimeMinute(choosenDay.formatedOpenMinute);

      setFinishTimeHour(choosenDay.formatedCloseHour);
      setFinishTimeMinute(choosenDay.formatedCloseMinute);

      return;
    }

    setWorkToday('Não');

    setInicialTimeHour(-1);
    setInicialTimeMinute(-1);

    setFinishTimeHour(-1);
    setFinishTimeMinute(-1);
  }, [choosenDay]);

  // Function On Change. It set the value at Work Today, when the select is changed
  const handleSelectOptions = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setWorkToday(event.target.value);
    },
    [],
  );

  const handleChangeMinute = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInicialTimeMinute(Number(event.target.value));
      setFinishTimeMinute(Number(event.target.value));
    },
    [],
  );

  const handleChangeOpenTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInicialTimeHour(Number(event.target.value));
      console.log('mudou');
      setFinishTimeHour(23);
      setInicialTimeMinute(0);
      setFinishTimeMinute(30);
    },
    [],
  );

  // Update the workToday, when we change the day
  useEffect(() => {
    formRef.current?.setFieldValue('consultState', workToday);

    formRef.current?.setFieldValue('openTimeHour', inicialTimeHour);
    formRef.current?.setFieldValue('openTimeMin', inicialTimeMinute);

    formRef.current?.setFieldValue('closeTimeHour', finishTimeHour);
    formRef.current?.setFieldValue('closeTimeMinute', finishTimeMinute);
  }, [workToday, choosenDay]);

  useEffect(() => {
    // Inicio dos agendamentos
    if (!inicialTimeHour) {
      return;
    }

    if (inicialTimeHour === 23) {
      return;
    }

    const hourStart = inicialTimeHour + 1;

    // Cria um vetor de agendamentos por dia, como o funcionamento vai ate as 17horas, o tamanho do vetor tem que ser de 10 posições
    const eachHourArray = Array.from(
      { length: 25 - hourStart },
      (_, index) => index + hourStart,
    );

    setPossibleFinishTimeHour(eachHourArray);
  }, [inicialTimeHour]);

  function handleSubmit(data: FormData) {
    console.log(choosenDay?.id);
    console.log(data);
  }

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

        <InicializePage inicialize={workToday === ''}>
          <div>
            <p>Clique em um dia da semana para começar a editar</p>
          </div>
        </InicializePage>

        <AfterChooseOneDay inicialize={workToday === ''}>
          <div>
            <strong>Realizar Consultas Nesse Dia?</strong>
          </div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select name="consultState" onChange={handleSelectOptions}>
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

              <span>De:</span>
              <Select name="openTimeHour" onChange={handleChangeOpenTimeHour}>
                <option value={inicialTimeHour} selected hidden>
                  {inicialTimeHour === -1
                    ? 'Horas'
                    : String(inicialTimeHour).padStart(2, '0')}
                </option>

                {arrayHour.map(hour => {
                  return (
                    <option value={hour}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  );
                })}
              </Select>

              <Select name="openTimeMin" onChange={handleChangeMinute}>
                <option value={inicialTimeMinute} selected hidden>
                  {inicialTimeMinute === -1
                    ? 'Min'
                    : String(inicialTimeMinute).padStart(2, '0')}
                </option>
                <option value="00">00</option>
                <option value="30">30</option>
              </Select>

              <span>Até:</span>
              <Select name="closeTimeHour">
                <option value={finishTimeHour} selected hidden>
                  {finishTimeHour === -1
                    ? 'Horas'
                    : String(finishTimeHour).padStart(2, '0')}
                </option>
                {possibleFinishTimeHour.map(hour => {
                  return (
                    <option value={hour}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  );
                })}
              </Select>

              <Select name="closeTimeMinute" disabled>
                <option
                  value={
                    specialCaseTwentTree ? finishTimeMinute : inicialTimeMinute
                  }
                  selected
                  hidden
                >
                  {inicialTimeMinute === -1
                    ? 'Min'
                    : String(inicialTimeMinute).padStart(2, '0')}
                </option>
              </Select>
            </WookSchedule>

            <Button type="submit">Salvar</Button>
          </Form>
        </AfterChooseOneDay>
      </Container>
    </>
  );
}
