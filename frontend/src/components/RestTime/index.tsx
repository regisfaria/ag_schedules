import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiEdit3, FiTrash2, FiXCircle, FiCheck } from 'react-icons/fi';
import { number } from 'yup';
import {
  Container,
  ListRestDay,
  ButtonToEditOrRemove,
  ButtonToCancelOrAccept,
} from './styles';

import api from '../../services/api';

import Select from '../Select';
import Button from '../Button';
import PageHeader from '../PageHeader';
import SectionRow from '../SectionRow';

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

interface EditRestTime {
  id: string;
  edit: boolean;
  delete: boolean;
}

const SelectHours: React.FC<Day> = ({
  id,
  formatedOpenHour,
  formatedOpenMinute,
  formatedCloseHour,
  formatedCloseMinute,
}) => {
  const formRef = useRef<FormHandles>(null);
  const formRefEditOrDeleteRestTimes = useRef<FormHandles>(null);

  const [inicialStartHour, setInicialStartHour] = useState<number>(-1);
  const [finishEndHour, setFinishEndHour] = useState<number>(-1);

  const [infoRestDay, setInfoRestDay] = useState<IRestDay[]>([]);

  const [startHoursArray, setStartHoursArray] = useState<number[]>([]);
  const [endHoursArray, setEndHoursArray] = useState<number[]>([]);

  // Editar Ou deletar um horario existente

  const [editInicialStartHour, setEditInicialStartHour] = useState<number>(-1);
  const [editEndtHour, setEditEndtHour] = useState<number>(-1);

  const [auxEndRestTime, setAuxEndRestTime] = useState<number>(-1);

  const [selectEditRestTime, setSelectEditRestTime] = useState<EditRestTime[]>(
    [],
  );

  const [editingOrRemoveRestTime, setEditingOrRemoveRestTime] = useState(false);

  const [editScheduleArray, setEditScheduleArray] = useState<number[]>([]);
  const [editScheduleEndArray, setEditScheduleEndArray] = useState<number[]>(
    [],
  );

  const [reloadApi, setReloadApi] = useState(false);

  useEffect(() => {
    setInicialStartHour(-1);
    setFinishEndHour(-1);
    setEndHoursArray([]);

    setEditInicialStartHour(-1);
    setEditingOrRemoveRestTime(false);
    setEditScheduleEndArray([]);

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
  }, [id, reloadApi]);

  useEffect(() => {
    const auxArrayForGetSchedulesRestTime: EditRestTime[] = [];

    infoRestDay.map(day => {
      return auxArrayForGetSchedulesRestTime.push({
        id: day.id,
        edit: false,
        delete: false,
      });
    });

    setSelectEditRestTime(auxArrayForGetSchedulesRestTime);
  }, [infoRestDay]);

  // Array para o horario de saida
  useEffect(() => {
    if (inicialStartHour === -1) {
      return;
    }

    const tmpStartHourArray = startHoursArray.slice(0);

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

  const handleChangeEditStartTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setEditInicialStartHour(Number(event.target.value));
    },
    [],
  );

  const buttonEditRestTIme = useCallback(
    (idByRest: string, startRestTime: number, endRestTime: number) => {
      setSelectEditRestTime(element => {
        return element.map(rest =>
          rest.id === idByRest ? { ...rest, edit: true } : rest,
        );
      });

      const auxEditStartHourArray = startHoursArray.slice(0);
      auxEditStartHourArray.push(startRestTime);
      auxEditStartHourArray.sort(function (a, b) {
        return a - b;
      });

      setEditScheduleArray(auxEditStartHourArray);
      setAuxEndRestTime(endRestTime);

      setEditingOrRemoveRestTime(true);
    },
    [startHoursArray],
  );

  // Array para o horario de saida referente a editar
  useEffect(() => {
    if (editInicialStartHour === -1) {
      return;
    }

    const auxEditStartHourArray = editScheduleArray.slice(0);

    if (
      !auxEditStartHourArray.find(endRestTime => endRestTime === auxEndRestTime)
    ) {
      auxEditStartHourArray.push(auxEndRestTime);
      auxEditStartHourArray.sort(function (a, b) {
        return a - b;
      });
    }

    const valueForRemove = auxEditStartHourArray.findIndex(
      number => number === editInicialStartHour,
    );

    auxEditStartHourArray.splice(0, valueForRemove + 1);

    const verifyIfIsTheLastHour = infoRestDay.map(endHour => {
      return endHour.formatedEndHour === formatedCloseHour - 1;
    });

    if (!verifyIfIsTheLastHour[0]) {
      formatedCloseHour === 23 && formatedCloseMinute === 59
        ? auxEditStartHourArray.push(formatedCloseHour)
        : auxEditStartHourArray.push(formatedCloseHour - 1);
    }

    setEditScheduleEndArray(auxEditStartHourArray);

    console.log(editInicialStartHour);
  }, [editInicialStartHour]);

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

  const handleChangeEditEndTimeHour = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setEditEndtHour(Number(event.target.value));
    },
    [],
  );

  const buttonDeleteRestTime = useCallback((idByRest: string) => {
    setSelectEditRestTime(element => {
      return element.map(rest =>
        rest.id === idByRest ? { ...rest, delete: true } : rest,
      );
    });

    setEditingOrRemoveRestTime(true);
  }, []);

  const buttonCancelEditOrRemoveRestTime = useCallback((idByRest: string) => {
    setSelectEditRestTime(element => {
      return element.map(rest =>
        rest.id === idByRest ? { ...rest, edit: false, delete: false } : rest,
      );
    });

    setEditingOrRemoveRestTime(false);
  }, []);

  function handleSubmit(data: FormData) {
    console.log(id);
    console.log(data);

    api.post(`/schedules/rest`, {
      scheduleAvailabilityId: id,
      startTime: `${inicialStartHour}:${formatedOpenMinute}`,
      endTime: `${finishEndHour}:${formatedOpenMinute}`,
    });

    setReloadApi(!reloadApi);
  }

  function handleEditOrDeleteRestTime(restId: string) {
    console.log('editar');
    console.log(restId);

    const restTime = selectEditRestTime.find(
      findRestById => findRestById.id === restId,
    );

    if (!restTime) {
      buttonCancelEditOrRemoveRestTime(restId);
      // chamar erro
      return;
    }

    if (restTime.edit) {
      api.put(`/schedules/rest/updateRestTime`, {
        restTimeId: restId,
        openTime: `${editInicialStartHour}:${formatedOpenMinute}`,
        closeTime: `${editEndtHour}:${formatedOpenMinute}`,
      });
    }

    if (restTime.delete) {
      api.delete(`/schedules/rest/delete/${restId}`);
    }

    setReloadApi(!reloadApi);

    buttonCancelEditOrRemoveRestTime(restId);
  }

  return (
    <Container>
      <ListRestDay>
        {infoRestDay.length ? (
          <>
            {infoRestDay.map(day => {
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
                      <Select
                        name="StartHour"
                        onChange={handleChangeEditStartTimeHour}
                        disabled={
                          !!selectEditRestTime.find(schedule => {
                            return (
                              schedule.id === day.id && schedule.edit === false
                            );
                          })
                        }
                      >
                        <option
                          value={day.formatedStartHour}
                          selected={!editingOrRemoveRestTime}
                          hidden
                        >
                          {String(day.formatedStartHour).padStart(2, '0')}
                        </option>

                        {editScheduleArray.map(hour => {
                          return (
                            <option value={hour}>
                              {String(hour).padStart(2, '0')}
                            </option>
                          );
                        })}
                      </Select>

                      <Select name="StartMinute" disabled>
                        <option value={day.formatedStartMinute} hidden>
                          {String(day.formatedStartMinute).padStart(2, '0')}
                        </option>
                      </Select>

                      <span>Ate:</span>
                      <Select
                        name="EndHour"
                        onChange={handleChangeEditEndTimeHour}
                        disabled={
                          !!selectEditRestTime.find(schedule => {
                            return (
                              schedule.id === day.id && schedule.edit === false
                            );
                          })
                        }
                      >
                        <option
                          value={day.formatedEndHour}
                          selected={!editingOrRemoveRestTime}
                          hidden
                        >
                          {String(day.formatedEndHour).padStart(2, '0')}
                        </option>

                        {editInicialStartHour === -1
                          ? []
                          : editScheduleEndArray.map(hour => {
                              return (
                                <option value={hour}>
                                  {String(hour).padStart(2, '0')}
                                </option>
                              );
                            })}
                      </Select>

                      <Select name="EndMinute" disabled>
                        <option value={day.formatedEndMinute} hidden>
                          {String(day.formatedEndMinute).padStart(2, '0')}
                        </option>
                      </Select>

                      {selectEditRestTime.find(schedule => {
                        return (
                          schedule.id === day.id &&
                          schedule.edit === false &&
                          schedule.delete === false
                        );
                      }) ? (
                        <ButtonToEditOrRemove>
                          <button
                            type="button"
                            onClick={() => {
                              buttonEditRestTIme(
                                day.id,
                                day.formatedStartHour,
                                day.formatedEndHour,
                              );
                            }}
                            disabled={editingOrRemoveRestTime}
                          >
                            <FiEdit3
                              size={23}
                              color={editingOrRemoveRestTime ? 'd9d9d9' : '000'}
                            />
                          </button>

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
                          <button
                            type="button"
                            onClick={() => {
                              buttonCancelEditOrRemoveRestTime(day.id);
                            }}
                          >
                            <FiXCircle size={23} color="f8403a" />
                          </button>

                          <button type="submit">
                            <FiCheck size={25} color="008000" />
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

            {startHoursArray.map(hour => {
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
