import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiTrash2, FiXCircle, FiCheck } from 'react-icons/fi';

import {
  Container,
  ListRestDay,
  ButtonToEditOrRemove,
  ButtonToCancelOrAccept,
} from './styles';

import api from '../../services/api';

import Select from '../Select';
import SectionRow from '../SectionRow';
import Button from '../Button';
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

  const [startHourForANewRestTime, setStartHourForANewRestTime] = useState<
    number
  >(-1);

  const [endHourForANewRestTime, setEndHourForANewRestTime] = useState<number>(
    -1,
  );

  const formRefEditOrDeleteRestTimes = useRef<FormHandles>(null);

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

    formRef.current?.setFieldValue('openTimeHour', '');
    formRef.current?.setFieldValue('openTimeMin', formatedOpenMinute);

    formRef.current?.setFieldValue('closeTimeHour', '');
    formRef.current?.setFieldValue('closeTimeMinute', formatedOpenMinute);

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

    const verifyIfIsTheLastHour = listRestTimesForADay.map(endHour => {
      return endHour.formatedEndHour === formatedCloseHour - 1;
    });

    if (!verifyIfIsTheLastHour[0]) {
      formatedCloseHour === 23 && formatedCloseMinute === 59
        ? tmpStartHourArray.push(formatedCloseHour)
        : tmpStartHourArray.push(formatedCloseHour - 1);
    }

    setArrayWithPossiblesEndHourToRest(tmpStartHourArray);
  }, [startHourForANewRestTime]);

  const handleChangeStartTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStartHourForANewRestTime(Number(event.target.value));
      formRef.current?.setFieldValue('closeTimeHour', '');
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
    console.log('editar');
    console.log(restId);

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
  }

  function handleSubmit(data: FormData) {
    console.log(id);
    console.log(data);

    api.post(`/schedules/rest`, {
      scheduleAvailabilityId: id,
      startTime: `${startHourForANewRestTime}:${formatedOpenMinute}`,
      endTime: `${endHourForANewRestTime}:${formatedOpenMinute}`,
    });

    setReloadApi(!reloadApi);
  }

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
                      <Select name="StartHour" disabled>
                        <option
                          value={day.formatedStartHour}
                          selected={!editingOrRemoveRestTime}
                          hidden
                        >
                          {String(day.formatedStartHour).padStart(2, '0')}
                        </option>
                      </Select>

                      <Select name="StartMinute" disabled>
                        <option value={day.formatedStartMinute} hidden>
                          {String(day.formatedStartMinute).padStart(2, '0')}
                        </option>
                      </Select>

                      <span>Ate:</span>
                      <Select name="EndHour" disabled>
                        <option
                          value={day.formatedEndHour}
                          selected={!editingOrRemoveRestTime}
                          hidden
                        >
                          {String(day.formatedEndHour).padStart(2, '0')}
                        </option>
                      </Select>

                      <Select name="EndMinute" disabled>
                        <option value={day.formatedEndMinute} hidden>
                          {String(day.formatedEndMinute).padStart(2, '0')}
                        </option>
                      </Select>

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

            {arrayWithPossibleStartHourToRest.map(hour => {
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
        </SectionRow>

        {arrayWithPossiblesEndHoursToRest.length ? (
          <>
            <SectionRow subTitle="Até:">
              <Select name="closeTimeHour" onChange={handleChangeEndTimeHour}>
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

export default ListRestTime;
