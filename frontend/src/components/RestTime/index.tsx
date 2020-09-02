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
  const formRefEditOrDeleteRestTimes = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [startHourForANewRestTime, setStartHourForANewRestTime] = useState<
    number
  >(-1);

  const [endHourForANewRestTime, setEndHourForANewRestTime] = useState<number>(
    -1,
  );

  const [listRestTimesForADay, setListRestTimesForADay] = useState<IRestDay[]>(
    [],
  );

  const [
    arrayWithPossibleStartHourToRest,
    setArrayWithPossibleStartHourToRest,
  ] = useState<number[]>([]);

  const [idByDeleteARestTime, setIdByDeleteARestTime] = useState('');

  const [editingOrRemoveRestTime, setEditingOrRemoveRestTime] = useState(false);

  const [reloadApi, setReloadApi] = useState(false);

  const [
    arrayWithPossiblesEndHoursToRest,
    setArrayWithPossiblesEndHourToRest,
  ] = useState<number[]>([]);

  useEffect(() => {
    setStartHourForANewRestTime(-1);
    setEndHourForANewRestTime(-1);
    setArrayWithPossiblesEndHourToRest([]);

    setEditingOrRemoveRestTime(false);

    formRef.current?.setFieldValue('formatedStartHour', '');
    formRef.current?.setFieldValue('formatedStartMinute', formatedOpenMinute);

    formRef.current?.setFieldValue('formatedEndHour', '');
    formRef.current?.setFieldValue('formatedEndMinute', formatedOpenMinute);

    api.get<IRestDay[]>(`/schedules/rest/${id}`).then(response => {
      setListRestTimesForADay(
        response.data.sort(function (a, b) {
          return a.formatedStartHour - b.formatedStartHour;
        }),
      );
    });

    api
      .get<number[]>(`/schedules/availableSchedulesForRest/${id}`)
      .then(response => {
        setArrayWithPossibleStartHourToRest(response.data);
      });
  }, [id, reloadApi]);

  // Array para o horario de saida
  useEffect(() => {
    if (startHourForANewRestTime === -1) {
      return;
    }

    const tmpStartHourArray = arrayWithPossibleStartHourToRest.slice(0);

    const valueForRemove = tmpStartHourArray.findIndex(
      remove => remove === startHourForANewRestTime,
    );

    tmpStartHourArray.splice(0, valueForRemove + 1);

    formatedCloseHour === 23 && formatedCloseMinute === 59
      ? tmpStartHourArray.push(formatedCloseHour)
      : tmpStartHourArray.push(formatedCloseHour - 1);

    setArrayWithPossiblesEndHourToRest(tmpStartHourArray);
  }, [startHourForANewRestTime]);

  const handleChangeStartTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStartHourForANewRestTime(Number(event.target.value));
      formRef.current?.setFieldValue('formatedEndHour', '');
    },
    [],
  );

  const handleChangeEndTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setEndHourForANewRestTime(Number(event.target.value));
    },
    [],
  );

  const buttonDeleteRestTime = useCallback((idByRest: string) => {
    setIdByDeleteARestTime(idByRest);

    setEditingOrRemoveRestTime(true);
  }, []);

  const buttonCancelEditOrRemoveRestTime = useCallback(() => {
    setIdByDeleteARestTime('');

    setEditingOrRemoveRestTime(false);
  }, []);

  function handleEditOrDeleteRestTime(restId: string) {
    if (idByDeleteARestTime === '') {
      buttonCancelEditOrRemoveRestTime();
      // chamar erro
      return;
    }

    if (idByDeleteARestTime !== '') {
      api.delete(`/schedules/rest/delete/${idByDeleteARestTime}`);
    }

    setReloadApi(!reloadApi);

    buttonCancelEditOrRemoveRestTime();

    addToast({
      type: 'success',
      title: 'Horário de Intervalo Apagado Com Sucesso!',
    });
  }

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

        await listRestTimesForADay.forEach(anotherRest => {
          if (
            (data.formatedStartHour >= anotherRest.formatedStartHour &&
              data.formatedEndHour <= anotherRest.formatedEndHour) ||
            (data.formatedStartHour <= anotherRest.formatedStartHour &&
              data.formatedEndHour >= anotherRest.formatedStartHour) ||
            (data.formatedStartHour >= anotherRest.formatedStartHour &&
              data.formatedStartHour <= anotherRest.formatedEndHour)
          ) {
            throw new Error();
          }

          if (
            data.formatedStartHour < anotherRest.formatedStartHour &&
            data.formatedEndHour > anotherRest.formatedEndHour
          ) {
            // Função que vai excluir o outro horario
            api.delete(`/schedules/rest/delete/${anotherRest.id}`);
            addToast({
              type: 'info',
              title: 'Lista de Horários, será atualizada!',
              description: 'Este horário abrange outros horários ja setados!',
            });
          }
        });

        /// //////////

        api.post(`/schedules/rest`, {
          scheduleAvailabilityId: id,
          startTime: `${data.formatedStartHour}:${data.formatedStartMinute}`,
          endTime: `${data.formatedEndHour}:${data.formatedStartMinute}`,
        });

        addToast({
          type: 'success',
          title: 'Horário de Intervalo Criado Com Sucesso!',
        });

        setReloadApi(!reloadApi);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no cadastro de Intervalo',
          description:
            'Ocorreu um erro durante o cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, reloadApi, listRestTimesForADay],
  );

  return (
    <Container>
      <ListRestDay>
        {listRestTimesForADay.length ? (
          <>
            {listRestTimesForADay.map(day => {
              return (
                <>
                  <Form
                    ref={formRefEditOrDeleteRestTimes}
                    onSubmit={() => {
                      handleEditOrDeleteRestTime(day.id);
                    }}
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

                      {idByDeleteARestTime !== day.id ? (
                        <ButtonToEditOrRemove>
                          <button
                            type="button"
                            disabled={editingOrRemoveRestTime}
                            onClick={() => {
                              buttonDeleteRestTime(day.id);
                            }}
                          >
                            <FiTrash2
                              size={25}
                              color={
                                editingOrRemoveRestTime ? 'd9d9d9' : 'f8403a'
                              }
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
                            onClick={buttonCancelEditOrRemoveRestTime}
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
          <span>Você Não Possui Horarios de Intevalo Cadastrados</span>
        )}
      </ListRestDay>

      <NewRestTime>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <PageHeader
            title="Horários de Intervalo"
            subTitle="Marque abaixo os dias que você gostaria de trabalhar"
          />

          <SectionRow subTitle="De: ">
            <Select
              name="formatedStartHour"
              onChange={handleChangeStartTimeHour}
            >
              <option value="" selected hidden>
                Horas
              </option>

              {arrayWithPossibleStartHourToRest.map(hour => {
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
              Caso queira marcar um intervalo, por favor selecione um horario
              inicial
            </p>
          )}
        </Form>
      </NewRestTime>
    </Container>
  );
};

export default ListRestTime;
