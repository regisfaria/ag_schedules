import React, { useRef } from 'react';
import { Form } from '@unform/web';

import Radio from '../../components/RadioButton';
import {
  Container,
  DaysWeek,
  WookSchedule,
  InicializePage,
  AfterChooseOneDay,
} from './styles';

import PageHeader from '../../components/PageHeader';
import Menu from '../../components/Menu';
import Main from '../../components/Main';
import Section from '../../components/Section';
import Select from '../../components/Select';
import Button from '../../components/Button';

import SelectHour from '../../components/SelectHours';

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface FormData {
  consultState: string;
  openTimeHour: string;
  openTImeMinute: string;
  closeTimeHour: string;
  closeTImeMinute: string;
}

export default function App() {
  const formRef = useRef(null);

  function handleSubmit(data: FormData) {
    console.log(data);
  }

  const checkboxOptions: CheckboxOption[] = [
    { id: 'sim', value: 'sim', label: 'Sim' },
    { id: 'nao', value: 'nao', label: 'Não' },
  ];

  return (
    <>
      <Menu />

      <DaysWeek>
        <Button>D</Button>

        <Button>2°</Button>

        <Button>3°</Button>

        <Button>4°</Button>

        <Button>5°</Button>

        <Button>6°</Button>

        <Button>S</Button>
      </DaysWeek>

      <Container>
        {/* <PageHeader
        title="Meus Horarios"
        subTitle="Marque abaixo os dias que você gostaria de trabalhar"
      /> */}

        <InicializePage>
          <p>Clique em um dia da semana para começar a editar</p>
        </InicializePage>

        <AfterChooseOneDay>
          <div>
            <strong>Realizar Consultas Nesse Dia?</strong>
          </div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Radio name="consultState" options={checkboxOptions} />

            <WookSchedule>
              <PageHeader
                title="Horários de Trabalho"
                subTitle="Marque abaixo os dias que você gostaria de trabalhar"
              />
              <SelectHour />
            </WookSchedule>

            {/* <PageHeader
          title="Hórarios de Descanso"
          subTitle="Marque abaixo os dias que você gostaria de trabalhar"
        />
        <SelectHour /> */}

            <Button type="submit">Done</Button>
          </Form>
        </AfterChooseOneDay>
      </Container>
    </>
  );
}
