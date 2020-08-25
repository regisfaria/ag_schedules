import styled from 'styled-components';

import doctorImg from '../../assets/MinhaAgenda.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  background-image: url(${doctorImg});
  /* background-position: center; */
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 50rem;
  background-color: var(--light-blue);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
  }

  @media (min-width: 1024px) {
    height: 100vh;
  }
`;

export const DaysWeek = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 6rem 1rem 3rem 1rem;

  button {
    padding: 0;
    margin: 0;
    max-width: 5rem;
    height: 5rem;

    & + button {
      margin-left: 0.5rem;
    }
  }
`;

export const WookSchedule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  header {
    padding: 3rem 0 3rem 0;
  }
`;

export const InicializePage = styled.div`
  font-size: 3rem;
  text-align: center;
  max-width: 50rem;
`;

export const AfterChooseOneDay = styled.div`
  display: none;
`;
