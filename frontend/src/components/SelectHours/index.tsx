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

const SelectHours: React.FC<Day> = ({
  id,
  formatedOpenHour,
  formatedOpenMinute,
  formatedCloseHour,
  formatedCloseMinute,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [inicialTimeHour, setInicialTimeHour] = useState<number>();
  const [inicialTimeMinute, setInicialTimeMinute] = useState<number>();
  const [finishTimeMinute, setFinishTimeMinute] = useState<number>();
  const [finishTimeHour, setFinishTimeHour] = useState<number>();
  const [specialCaseTwentTree, setSpecialCaseTwentTree] = useState(false);

  const [possibleFinishTimeHour, setPossibleFinishTimeHour] = useState<
    number[]
  >([]);

  const [arrayHour, setArrayHour] = useState<number[]>([]);

  useEffect(() => {
    setInicialTimeHour(formatedOpenHour);
    setInicialTimeMinute(formatedOpenMinute);
    setFinishTimeHour(formatedCloseHour);
    setFinishTimeMinute(formatedCloseMinute);

    formRef.current?.setFieldValue('openTimeHour', inicialTimeHour);
    formRef.current?.setFieldValue('openTimeMin', inicialTimeMinute);

    formRef.current?.setFieldValue('closeTimeHour', finishTimeHour);
    formRef.current?.setFieldValue('closeTimeMinute', finishTimeMinute);
  }, [id]);

  // Array q Para iniciar o select
  useEffect(() => {
    const eachHourArray = Array.from({ length: 24 }, (_, index) => index);

    setArrayHour(eachHourArray);
  }, []);

  // Array para o horario de saida
  useEffect(() => {
    // Inicio dos agendamentos
    if (!inicialTimeHour) {
      return;
    }

    if (inicialTimeHour === 23) {
      setFinishTimeHour(23);
      setInicialTimeMinute(0);
      setFinishTimeMinute(59);
      setSpecialCaseTwentTree(true);
      setPossibleFinishTimeHour([]);

      return;
    }

    if (specialCaseTwentTree) {
      setSpecialCaseTwentTree(false);
    }

    if (finishTimeMinute && finishTimeMinute === 59) {
      setFinishTimeMinute(inicialTimeMinute);
    }

    const hourStart = inicialTimeHour + 1;

    // Cria um vetor de agendamentos por dia, como o funcionamento vai ate as 17horas, o tamanho do vetor tem que ser de 10 posições
    const eachHourArray = Array.from(
      { length: 24 - hourStart },
      (_, index) => index + hourStart,
    );

    setPossibleFinishTimeHour(eachHourArray);
  }, [inicialTimeHour]);

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
    },
    [],
  );

  const handleChangeCloseTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setFinishTimeHour(Number(event.target.value));
    },
    [],
  );

  function handleSubmit(data: FormData) {
    console.log(id);
    console.log(data);
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
              <option value={hour}>{String(hour).padStart(2, '0')}</option>
            );
          })}
        </Select>

        <Select name="openTimeMin" onChange={handleChangeMinute}>
          <option value={inicialTimeMinute} selected hidden>
            {inicialTimeMinute === -1
              ? 'Min'
              : String(inicialTimeMinute).padStart(2, '0')}
          </option>
          <option value="0" disabled={specialCaseTwentTree}>
            00
          </option>
          <option value="30" disabled={specialCaseTwentTree}>
            30
          </option>
        </Select>

        <span>Até:</span>
        <Select name="closeTimeHour" onChange={handleChangeCloseTimeHour}>
          <option value={finishTimeHour} selected hidden>
            {finishTimeHour === -1
              ? 'Horas'
              : String(finishTimeHour).padStart(2, '0')}
          </option>
          {possibleFinishTimeHour.map(hour => {
            return (
              <option value={hour} disabled={specialCaseTwentTree}>
                {String(hour).padStart(2, '0')}
              </option>
            );
          })}
        </Select>

        <Select name="closeTimeMinute" disabled>
          <option value={finishTimeMinute} selected hidden>
            {finishTimeMinute === -1
              ? 'Min'
              : String(finishTimeMinute).padStart(2, '0')}
          </option>
        </Select>

        <Button type="submit">Salvar</Button>
      </Form>
    </Container>
  );
};

export default SelectHours;
