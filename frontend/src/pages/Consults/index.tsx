import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import Menu from '../../components/Menu';
import Main from '../../components/Main';
import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';

import {
  Container,
  ConsultsList,
  ConsultCard,
  CardRightContent,
  HiddenContent,
} from './styles';

const Consults: React.FC = () => {
  const { user } = useAuth();

  const [expand, setExpand] = useState(false);

  const handleExpand = useCallback(() => {
    setExpand(!expand);
    console.log('ok');
  }, [expand]);

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
                  <p>Getulio Nargas</p>
                  <p>12:00 - 13:00</p>
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
