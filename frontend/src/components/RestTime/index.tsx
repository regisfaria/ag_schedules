import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiTrash2, FiXCircle, FiCheck, FiClock } from 'react-icons/fi';

import {
  Container,
  ListRestDay,
  ButtonToEditOrRemove,
  ButtonToCancelOrAccept,
  NewRestTime,
} from './styles';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useReset } from '../../hooks/reset';

import Select from '../Select';
import SectionRow from '../SectionRow';
import Button from '../Button';
import Input from '../Input';
import PageHeader from '../PageHeader';

interface Day {
  id: string;
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

const ListRestTime: React.FC<Day> = ({
  id,
  formatedOpenMinute,
  formatedCloseHour,
  formatedCloseMinute,
}) => {
  const formRef = useRef<FormHandles>(null);
  const formRefDelite = useRef<FormHandles>(null);

  const { resetCreateRestTime, resetCreateRestTimePage } = useReset();

  const { addToast } = useToast();

  const [startHour, setStartHour] = useState<number>(-1);

  const [endHour, setEndHour] = useState<number>(-1);

  const [listRestTimes, setListRestTimes] = useState<IRestDay[]>([]);

  const [arrayWithPossibleHours, setArrayWithPossibleHours] = useState<
    number[]
  >([]);

  const [
    arrayWithPossiblesEndHoursToRest,
    setArrayWithPossiblesEndHourToRest,
  ] = useState<number[]>([]);

  const [idByDelete, setIdByDelete] = useState('');

  const [deleteRest, setDeleteRest] = useState(false);

  useEffect(() => {
    setStartHour(-1);
    setEndHour(-1);
    setArrayWithPossiblesEndHourToRest([]);

    setDeleteRest(false);

    formRef.current?.setFieldValue('formatedStartHour', '');
    formRef.current?.setFieldValue('formatedStartMinute', formatedOpenMinute);

    formRef.current?.setFieldValue('formatedEndHour', '');
    formRef.current?.setFieldValue('formatedEndMinute', formatedOpenMinute);

    api.get<IRestDay[]>(`/schedules/rest/${id}`).then(response => {
      setListRestTimes(
        response.data.sort(function (a, b) {
          return a.formatedStartHour - b.formatedStartHour;
        }),
      );
    });

    api
      .get<number[]>(`/schedules/availableSchedulesForRest/${id}`)
      .then(response => {
        setArrayWithPossibleHours(response.data);
      });
  }, [id, resetCreateRestTime]);

  // Array para o horario de saida
  useEffect(() => {
    if (startHour === -1) {
      return;
    }

    const tmpStartHourArray = arrayWithPossibleHours.slice(0);

    const valueForRemove = tmpStartHourArray.findIndex(
      remove => remove === startHour,
    );

    tmpStartHourArray.splice(0, valueForRemove + 1);

    formatedCloseHour === 23 && formatedCloseMinute === 59
      ? tmpStartHourArray.push(formatedCloseHour)
      : tmpStartHourArray.push(formatedCloseHour - 1);

    setArrayWithPossiblesEndHourToRest(tmpStartHourArray);
  }, [startHour]);

  const handleChangeStartTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStartHour(Number(event.target.value));
      formRef.current?.setFieldValue('formatedEndHour', '');
    },
    [],
  );

  const handleChangeEndTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setEndHour(Number(event.target.value));
    },
    [],
  );

  const handleDeleteRest = useCallback((idByRest: string) => {
    setIdByDelete(idByRest);

    setDeleteRest(true);
  }, []);

  const handleCancelDeleteRest = useCallback(() => {
    setIdByDelete('');

    setDeleteRest(false);
  }, []);

  const handleSubmitDelete = useCallback(() => {
    if (idByDelete === '') {
      handleCancelDeleteRest();
      // chamar erro
      return;
    }

    if (idByDelete !== '') {
      api.delete(`/schedules/rest/delete/${idByDelete}`);
    }

    resetCreateRestTimePage(!resetCreateRestTime);

    handleCancelDeleteRest();

    addToast({
      type: 'success',
      title: 'Horário de Intervalo Apagado Com Sucesso!',
    });
  }, [idByDelete, resetCreateRestTime]);

  const handleSubmit = useCallback(
    async (data: IRestDay) => {
      try {
        const schema = Yup.object().shape({
          formatedStartHour: Yup.number().required(
            'Hora de Inicial do Descanso é Obrigatorio',
          ),
          formatedStartMinute: Yup.number().required(
            'Minuto Inicial do Descanso é Obrigatorio',
          ),
          formatedEndHour: Yup.number().required(
            'Hora Final do Descanso é Obrigatorio',
          ),
          formatedEndMinute: Yup.number().required(
            'Minuto Final do Descanso é Obrigatorio',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Comparação

        const inicialRest = Number(data.formatedStartHour);
        const endRest = Number(data.formatedEndHour);

        await listRestTimes.forEach(anotherRest => {
          if (
            (inicialRest >= anotherRest.formatedStartHour &&
              endRest <= anotherRest.formatedEndHour) ||
            (inicialRest > anotherRest.formatedStartHour &&
              inicialRest < anotherRest.formatedEndHour) ||
            (endRest > anotherRest.formatedStartHour &&
              endRest < anotherRest.formatedEndHour)
          ) {
            throw new Error('Horários Indisponiveis');
          }

          if (
            (inicialRest === anotherRest.formatedStartHour &&
              endRest > anotherRest.formatedEndHour) ||
            (inicialRest < anotherRest.formatedStartHour &&
              endRest === anotherRest.formatedEndHour) ||
            (inicialRest < anotherRest.formatedStartHour &&
              endRest > anotherRest.formatedEndHour)
          ) {
            api.delete(`/schedules/rest/delete/${anotherRest.id}`);

            addToast({
              type: 'info',
              title: 'Lista de Horários, será atualizada!',
              description: `O Horário ${anotherRest.formatedStartHour}:${String(
                anotherRest.formatedStartMinute,
              ).padStart(2, '0')} - ${anotherRest.formatedEndHour}:${String(
                anotherRest.formatedStartMinute,
              ).padStart(2, '0')} foi ataulizado para ${inicialRest}:${String(
                anotherRest.formatedStartMinute,
              ).padStart(2, '0')} - ${endRest}:${String(
                anotherRest.formatedStartMinute,
              ).padStart(2, '0')}`,
            });
          }
        });

        api.post(`/schedules/rest`, {
          scheduleAvailabilityId: id,
          startTime: `${data.formatedStartHour}:${data.formatedStartMinute}`,
          endTime: `${data.formatedEndHour}:${data.formatedStartMinute}`,
        });

        addToast({
          type: 'success',
          title: 'Horário de Intervalo Criado Com Sucesso!',
        });

        resetCreateRestTimePage(!resetCreateRestTime);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro de Intervalo',
          description:
            'Ocorreu um erro durante o cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, resetCreateRestTime, listRestTimes, id],
  );

  return (
    <Container>
      <ListRestDay>
        {listRestTimes.length ? (
          <>
            {listRestTimes.map(day => {
              return (
                <>
                  <Form
                    ref={formRefDelite}
                    onSubmit={handleSubmitDelete}
                    key={day.id}
                  >
                    <SectionRow>
                      <span>De: </span>
                      <Input
                        name="StartHour"
                        type="text"
                        icon={FiClock}
                        placeholder={`${String(day.formatedStartHour).padStart(
                          2,
                          '0',
                        )} : ${String(day.formatedStartMinute).padStart(
                          2,
                          '0',
                        )}`}
                        disabled
                      />

                      <span>Ate:</span>
                      <Input
                        name="EndHour"
                        type="text"
                        icon={FiClock}
                        placeholder={`${String(day.formatedEndHour).padStart(
                          2,
                          '0',
                        )} : ${String(day.formatedStartMinute).padStart(
                          2,
                          '0',
                        )}`}
                        disabled
                      />

                      {idByDelete !== day.id ? (
                        <ButtonToEditOrRemove>
                          <button
                            type="button"
                            disabled={deleteRest}
                            onClick={() => {
                              handleDeleteRest(day.id);
                            }}
                          >
                            <FiTrash2
                              size={25}
                              color={deleteRest ? 'd9d9d9' : 'f8403a'}
                            />
                          </button>
                        </ButtonToEditOrRemove>
                      ) : (
                        <ButtonToCancelOrAccept>
                          <button type="submit">
                            <FiCheck size={25} color="008000" />
                          </button>

                          <button
                            type="button"
                            onClick={handleCancelDeleteRest}
                          >
                            <FiXCircle size={23} color="f8403a" />
                          </button>
                        </ButtonToCancelOrAccept>
                      )}
                    </SectionRow>
                  </Form>
                </>
              );
            })}
          </>
        ) : (
          <span>Você Não Possui Horários de Intevalo Cadastrados</span>
        )}
      </ListRestDay>

      <NewRestTime>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <PageHeader
            title="Horários de Intervalo"
            subTitle="Marque abaixo os Horários de intervalo, que você gostaria de ter"
          />

          <SectionRow subTitle="De: ">
            <Select
              name="formatedStartHour"
              onChange={handleChangeStartTimeHour}
            >
              <option value="" selected hidden>
                Horas
              </option>

              {arrayWithPossibleHours.map(hour => {
                return (
                  <option value={hour}>{String(hour).padStart(2, '0')}</option>
                );
              })}
            </Select>

            <Select name="formatedStartMinute" disabled>
              <option value={formatedOpenMinute} selected hidden>
                {String(formatedOpenMinute).padStart(2, '0')}
              </option>
            </Select>
          </SectionRow>

          {arrayWithPossiblesEndHoursToRest.length ? (
            <>
              <SectionRow subTitle="Até:">
                <Select
                  name="formatedEndHour"
                  onChange={handleChangeEndTimeHour}
                >
                  <option value="" selected hidden>
                    Horas
                  </option>

                  {arrayWithPossiblesEndHoursToRest.map(hour => {
                    return (
                      <option value={hour}>
                        {String(hour).padStart(2, '0')}
                      </option>
                    );
                  })}
                </Select>

                <Select name="formatedEndMinute" disabled>
                  <option value={formatedOpenMinute} selected hidden>
                    {String(formatedOpenMinute).padStart(2, '0')}
                  </option>
                </Select>
              </SectionRow>
              <Button type="submit">Salvar</Button>
            </>
          ) : (
            <p>
              Caso queira marcar um intervalo, por favor selecione um horário
              inicial
            </p>
          )}
        </Form>
      </NewRestTime>
    </Container>
  );
};

export default ListRestTime;
