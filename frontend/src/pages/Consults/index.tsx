import React, {
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { Redirect } from 'react-router-dom';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { parseISO, format } from 'date-fns';

import {
  FiMaximize2,
  FiMinimize2,
  FiEdit3,
  FiCheck,
  FiXCircle,
} from 'react-icons/fi';
import { GoChecklist } from 'react-icons/go';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useReset } from '../../hooks/reset';

import api from '../../services/api';

import Menu from '../../components/Menu';
import Main from '../../components/Main';
import Section from '../../components/Section';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';

import {
  Container,
  ConsultsList,
  ConsultCard,
  HiddenContent,
  CardRightContent,
} from './styles';

import 'react-day-picker/lib/style.css';

interface ConsultsResponse {
  id: string;
  createdById: string;
  createdBy: string;
  specialistId: string;
  specialistName: string;
  specialistImgUrl: string;
  pacientId: string;
  pacientName: string;
  date: string;
  payment: string;
  status: string;
  formatedHour: string;
  formatedEndHour: string;
}

interface SpecialistResponse {
  id: string;
  name: string;
}

interface FormStatusData {
  status: string;
}

interface FormPaymentData {
  payment: string;
}

const Consults: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { resetConsultList, resetConsultListPage } = useReset();

  const [consults, setConsults] = useState<ConsultsResponse[]>([]);
  const [displayableConsults, setDisplayableConsults] = useState<
    ConsultsResponse[]
  >([]);
  const [specialists, setSpecialists] = useState<SpecialistResponse[]>([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState('');
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedConsultId, setSelectedConsultId] = useState('');
  const [
    supervisorUpdateButtonClicked,
    setSupervisorUpdateButtonClicked,
  ] = useState(false);

  const handleSelectedSpecialist = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setDisplayableConsults([]);
      setSelectedDay(new Date());
      setSelectedConsultId('');

      const selectSpecialistId = event.target.value;
      setSelectedSpecialistId(selectSpecialistId);
    },
    [],
  );

  const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDay(day);
    }
  }, []);

  const handleSelectedConsult = useCallback(
    (id: string) => {
      const currentId = selectedConsultId;
      if (currentId === id) {
        setSelectedConsultId('');
        return;
      }

      setSelectedConsultId(id);
    },
    [selectedConsultId],
  );

  useEffect(() => {
    if (resetConsultList) {
      resetConsultListPage(false);
    }

    if (user.type === 'specialist') {
      api.get(`consults/${user.id}`).then(response => {
        setConsults(response.data);
      });
    } else {
      if (selectedSpecialistId === '') {
        return;
      }
      api
        .get(`consults/createdBy/${user.id}/${selectedSpecialistId}`)
        .then(response => {
          setConsults(response.data);
        });
    }
  }, [selectedSpecialistId, resetConsultList]);

  useEffect(() => {
    if (user.type === 'specialist') {
      return;
    }
    api.get('/users/specialists').then(response => {
      setSpecialists(response.data);
    });
  }, []);

  useEffect(() => {
    if (user.type === 'supervisor' && selectedSpecialistId === '') {
      return;
    }

    if (!consults.length || !selectedDay) {
      return;
    }
    const selectedDayConsults: ConsultsResponse[] = [];
    consults.forEach(consult => {
      if (
        format(parseISO(consult.date), 'yyyy-MM-dd') ===
        format(selectedDay, 'yyyy-MM-dd')
      ) {
        selectedDayConsults.push(consult);
      }
    });
    setDisplayableConsults(
      selectedDayConsults.sort((a, b) => {
        return (
          Number(a.formatedHour.split(':')[0]) -
          Number(b.formatedHour.split(':')[0])
        );
      }),
    );
  }, [consults, selectedDay]);

  return (
    <>
      {user.type === 'admin' && <Redirect to={{ pathname: '/history' }} />}
      <Menu />

      <Container>
        <PageHeader
          title="Consultas"
          subTitle="Escolha um dia para ver as consultas naquele dia"
        />
        {user.type === 'supervisor' && (
          <div>
            <span>Escolha um especialista:&nbsp;</span>
            <select name="specialist" onChange={handleSelectedSpecialist}>
              <option value="" selected hidden>
                Especialista
              </option>
              {specialists.map(specialist => (
                <option key={specialist.id} value={specialist.id}>
                  {specialist.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <Main>
          <Section id="ConsultContent">
            <ConsultsList>
              {displayableConsults.length ? (
                <>
                  {displayableConsults.map(consult => (
                    <ConsultCard
                      key={consult.id}
                      isExpanded={selectedConsultId === consult.id}
                      status={consult.status}
                    >
                      <HiddenContent>
                        {selectedConsultId === consult.id ? (
                          <>
                            <p>Paciente: {consult.pacientName}</p>
                            <p>Criada por: {consult.createdBy}</p>
                            <p>
                              Especialista responsavel: {consult.specialistName}
                            </p>
                            <p>
                              Hora: de {consult.formatedHour} até{' '}
                              {consult.formatedEndHour}
                            </p>
                            <p>Status: {consult.status}</p>
                            <p>Pagamento: {consult.payment}</p>
                          </>
                        ) : (
                          <>
                            <p>{consult.pacientName}</p>
                            <p>
                              {consult.formatedHour} - {consult.formatedEndHour}
                            </p>
                          </>
                        )}
                      </HiddenContent>

                      <CardRightContent
                        isExpanded={selectedConsultId === consult.id}
                      >
                        <img
                          src={consult.specialistImgUrl}
                          alt={consult.specialistName}
                        />
                        <div>
                          <button
                            type="button"
                            onClick={() => handleSelectedConsult(consult.id)}
                          >
                            {selectedConsultId === consult.id ? (
                              <FiMinimize2 size={20} />
                            ) : (
                              <FiMaximize2 size={20} />
                            )}
                          </button>
                          {user.type === 'supervisor' && (
                            <button type="button">
                              <FiEdit3 size={20} />
                            </button>
                          )}
                        </div>
                      </CardRightContent>
                    </ConsultCard>
                  ))}
                </>
              ) : (
                <>
                  <GoChecklist size={60} />
                  <span>Nenhuma consulta marcada</span>
                </>
              )}
            </ConsultsList>
          </Section>

          <Section id="ConsultCalendar">
            {(user.type === 'supervisor' && selectedSpecialistId !== '') ||
            user.type === 'specialist' ? (
              <DayPicker
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                months={[
                  'Janeiro',
                  'Fevereiro',
                  'Março',
                  'Abril',
                  'Maio',
                  'Junho',
                  'Julho',
                  'Agosto',
                  'Setembro',
                  'Outubro',
                  'Novembro',
                  'Dezembro',
                ]}
                selectedDays={selectedDay}
                modifiers={{
                  available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
                }}
                onDayClick={handleDayClick}
              />
            ) : (
              <>
                <strong>Escolha um especialista para ver suas consultas</strong>
                <span>apenas consultas que você criou serão visíveis</span>
              </>
            )}
          </Section>
        </Main>
      </Container>
    </>
  );
};

export default Consults;
