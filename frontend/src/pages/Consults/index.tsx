import React, { useCallback, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import Menu from '../../components/Menu';
import Main from '../../components/Main';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

import {
  Container,
  ConsultsList,
  ConsultCard,
  CardRightContent,
} from './styles';

interface ConsultsResponse {
  id: string;
  createdById: string;
  specialistId: string;
  pacientId: string;
  date: string;
  payment: string;
  status: string;
  formatedHour: string;
}

const Consults: React.FC = () => {
  const { user } = useAuth();

  const [expand, setExpand] = useState(false);
  const [consults, setConsults] = useState<ConsultsResponse[]>([]);

  const handleExpand = useCallback(() => {
    setExpand(!expand);
    console.log('ok');
  }, [expand]);

  useEffect(() => {
    if (user.type === 'specialist') {
      api.get(`consults/${user.id}`).then(response => {
        setConsults(response.data);
        console.log(response.data);
      });
    } else {
      api.get(`consults/createdBy/${user.id}`).then(response => {
        setConsults(response.data);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <>
      {user.type === 'admin' && <Redirect to={{ pathname: '/history' }} />}
      <Menu />

      <Container>
        <PageHeader title="Consultas" />
        <Main>
          <Section id="ConsultContent">
            <ConsultsList>
              {/* Below i must send as isExpanded selectedConsultId === this.consultId */}
              <ConsultCard isExpanded={expand} status="Em Aberto">
                <section>
                  {expand ? (
                    <>
                      <p>Paciente: </p>
                      <p>Criada por: </p>
                      <p>Especialista responsavel:</p>
                      <p>Data: </p>
                      <p>Hora: </p>
                      <p>Status: </p>
                      <p>Pagamento: </p>
                    </>
                  ) : (
                    <>
                      <p>Getulio Nargas</p>
                      <p>12:00 - 13:00</p>
                    </>
                  )}
                </section>

                {/* Below I must compare the selectedConsultId with the .map consult and then
              render the right icon */}
                <CardRightContent isExpanded={expand}>
                  <img
                    src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/d3/d3b5f1baddf81b9008af880a7feda060bc626a4b_full.jpg"
                    alt="getulioNargas"
                  />
                  <button type="button" onClick={handleExpand}>
                    {expand ? (
                      <FiMinimize2 size={20} />
                    ) : (
                      <FiMaximize2 size={20} />
                    )}
                  </button>
                </CardRightContent>
              </ConsultCard>
            </ConsultsList>
          </Section>

          <Section id="ConsultCalendar">Calendario aki....</Section>
        </Main>
      </Container>
    </>
  );
};

export default Consults;
