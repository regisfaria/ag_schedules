import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { start } from 'repl';
import { Container } from './styles';

import api from '../../services/api';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import PageHeader from '../PageHeader';
import SectionRow from '../SectionRow';
import Section from '../Section';

interface Day {
  id: string;
  formatedOpenHour: number;
  formatedOpenMinute: number;
  formatedCloseHour: number;
  formatedCloseMinute: number;
}

interface IRestDay {
  id: string;
  formatedStartHour: number;
  formatedStartMinute: number;
  formatedEndHour: number;
  formatedEndMinute: number;
}

const SelectHours: React.FC<Day> = ({
  id,
  formatedOpenHour,
  formatedOpenMinute,
  formatedCloseHour,
  formatedCloseMinute,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [inicialStartHour, setInicialStartHour] = useState<number>(-1);
  const [finishEndHour, setFinishEndHour] = useState<number>(-1);

  const [infoRestDay, setInfoRestDay] = useState<IRestDay[]>([]);

  const [startHoursStart, setStartHoursArray] = useState<number[]>([]);
  const [endHoursArray, setEndHoursArray] = useState<number[]>([]);

  useEffect(() => {
    setInicialStartHour(-1);
    setFinishEndHour(-1);
    setEndHoursArray([]);

    formRef.current?.setFieldValue('openTimeHour', '');
    formRef.current?.setFieldValue('openTimeMin', formatedOpenMinute);

    formRef.current?.setFieldValue('closeTimeHour', '');
    formRef.current?.setFieldValue('closeTimeMinute', formatedOpenMinute);

    api.get<IRestDay[]>(`/schedules/rest/${id}`).then(response => {
      setInfoRestDay(
        response.data.sort(function (a, b) {
          return a.formatedStartHour - b.formatedStartHour;
        }),
      );
    });

    api
      .get<number[]>(`/schedules/availableSchedulesForRest/${id}`)
      .then(response => {
        setStartHoursArray(response.data);
      });
  }, [id]);

  // Array para o horario de saida
  useEffect(() => {
    if (inicialStartHour === -1) {
      return;
    }

    const tmpStartHourArray = startHoursStart.slice(0);

    const valueForRemove = tmpStartHourArray.findIndex(
      number => number === inicialStartHour,
    );

    tmpStartHourArray.splice(0, valueForRemove + 1);

    const verifyIfIsTheLastHour = infoRestDay.map(endHour => {
      return endHour.formatedEndHour === formatedCloseHour - 1;
    });

    if (!verifyIfIsTheLastHour[0]) {
      formatedCloseHour === 23 && formatedCloseMinute === 59
        ? tmpStartHourArray.push(formatedCloseHour)
        : tmpStartHourArray.push(formatedCloseHour - 1);
    }

    setEndHoursArray(tmpStartHourArray);
  }, [inicialStartHour]);

  const handleChangeStartTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setInicialStartHour(Number(event.target.value));
      formRef.current?.setFieldValue('closeTimeHour', '');
    },
    [],
  );

  const handleChangeEndTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFinishEndHour(Number(event.target.value));
    },
    [],
  );

  function handleSubmit(data: FormData) {
    console.log(id);
    console.log(data);
  }
  /*   infoRestDay.forEach(day => {
    console.log(
      endHoursArray.findIndex(element => element === day.formatedStartHour),
    );
  }); */
  return (
    <Container>
      {infoRestDay.length ? (
        <Form ref={formRef} onSubmit={handleSubmit}>
          {infoRestDay.map(day => {
            return (
              <SectionRow>
                <span>De:</span>
                <Select name="StartHour">
                  <option value={day.formatedStartHour} selected hidden>
                    {String(day.formatedStartHour).padStart(2, '0')}
                  </option>
                </Select>
                <Select name="StartMinute">
                  <option value={day.formatedStartMinute} selected hidden>
                    {String(day.formatedStartMinute).padStart(2, '0')}
                  </option>
                </Select>

                <span>Ate:</span>
                <Select name="EndHour">
                  <option value={day.formatedEndHour} selected hidden>
                    {String(day.formatedEndHour).padStart(2, '0')}
                  </option>
                </Select>
                <Select name="EndMinute">
                  <option value={day.formatedEndMinute} selected hidden>
                    {String(day.formatedEndMinute).padStart(2, '0')}
                  </option>
                </Select>
                <Button>Hello</Button>
                <Button>Hello</Button>
              </SectionRow>
            );
          })}
        </Form>
      ) : (
        <span>Você Não Possui Horarios de Intevalo Cadastrados</span>
      )}

      <Form ref={formRef} onSubmit={handleSubmit}>
        <PageHeader
          title="Horários de Intervalo"
          subTitle="Marque abaixo os dias que você gostaria de trabalhar"
        />

        <SectionRow subTitle="De: ">
          <Select name="openTimeHour" onChange={handleChangeStartTimeHour}>
            <option value="" selected hidden>
              Horas
            </option>

            {startHoursStart.map(hour => {
              return (
                <option value={hour}>{String(hour).padStart(2, '0')}</option>
              );
            })}
          </Select>

          {console.log(formatedOpenMinute)}

          <Select name="openTimeMin" disabled>
            <option value={formatedOpenMinute} selected hidden>
              {String(formatedOpenMinute).padStart(2, '0')}
            </option>
          </Select>
        </SectionRow>

        {endHoursArray.length ? (
          <>
            <SectionRow subTitle="Até:">
              <Select name="closeTimeHour" onChange={handleChangeEndTimeHour}>
                <option value="" selected hidden>
                  Horas
                </option>
                {endHoursArray.map(hour => {
                  return (
                    <option value={hour}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  );
                })}
              </Select>
              <Select name="closeTimeMinute" disabled>
                <option value={formatedOpenMinute} selected hidden>
                  {String(formatedOpenMinute).padStart(2, '0')}
                </option>
              </Select>
            </SectionRow>
            <Button type="submit">Salvar</Button>
          </>
        ) : (
          <span id="spanNotification">
            Caso queira marcar um intervalo, por favor selecione um horario
            inicial
          </span>
        )}
      </Form>
    </Container>
  );
};

export default SelectHours;
