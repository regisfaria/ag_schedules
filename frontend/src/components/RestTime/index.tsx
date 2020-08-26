import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';

import api from '../../services/api';

import Select from '../Select';
import Button from '../Button';
import PageHeader from '../PageHeader';

interface Day {
  id: string;
  formatedOpenHour: number;
  formatedOpenMinute: number;
  formatedCloseHour: number;
  formatedCloseMinute: number;
}

interface IRestDay {
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

    // Array para o horario de inicio
    const createArrayForStartHours = Array.from(
      { length: formatedCloseHour - formatedOpenHour - 1 },
      (_, index) => index + formatedOpenHour + 1,
    );

    setStartHoursArray(createArrayForStartHours);

    api.get<IRestDay[]>(`/schedules/rest/${id}`).then(response => {
      setInfoRestDay(
        response.data.sort(function (a, b) {
          return a.formatedStartHour - b.formatedStartHour;
        }),
      );
    });
  }, [id]);

  // Array para o horario de saida
  useEffect(() => {
    if (inicialStartHour === -1) {
      return;
    }

    const hourStart = inicialStartHour + 1;

    if (formatedCloseHour === 23 && formatedCloseMinute === 59) {
      const createArrayForEndHours = Array.from(
        { length: formatedCloseHour - hourStart + 1 },
        (_, index) => index + hourStart,
      );

      setEndHoursArray(createArrayForEndHours);

      return;
    }

    const createArrayForEndHours = Array.from(
      { length: formatedCloseHour - hourStart },
      (_, index) => index + hourStart,
    );

    console.log(
      `for each: ${createArrayForEndHours.map(element => {
        return element;
      })}`,
    );
    console.log(
      `find: ${createArrayForEndHours.findIndex(element => element === 11)}`,
    );

    setEndHoursArray(createArrayForEndHours);
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
      {infoRestDay.map(day => {
        return (
          <p>
            {`Inicio do intervalo: ${day.formatedStartHour}:${day.formatedStartMinute} Fim do intervalo: ${day.formatedEndHour}:${day.formatedEndMinute}`}
          </p>
        );
      })}

      <Form ref={formRef} onSubmit={handleSubmit}>
        <PageHeader
          title="Horários de Intervalo"
          subTitle="Marque abaixo os dias que você gostaria de trabalhar"
        />

        <span>De:</span>
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

        <Select name="openTimeMin" disabled>
          <option value={formatedOpenMinute} selected hidden>
            {String(formatedOpenMinute).padStart(2, '0')}
          </option>
        </Select>

        <span>Até:</span>
        <Select name="closeTimeHour" onChange={handleChangeEndTimeHour}>
          <option value="" selected hidden>
            Horas
          </option>
          {endHoursArray.map(hour => {
            return (
              <option value={hour}>{String(hour).padStart(2, '0')}</option>
            );
          })}
        </Select>

        <Select name="closeTimeMinute" disabled>
          <option value={formatedOpenMinute} selected hidden>
            {String(formatedOpenMinute).padStart(2, '0')}
          </option>
        </Select>

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default SelectHours;
