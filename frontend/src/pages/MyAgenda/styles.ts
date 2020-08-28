import styled, { css } from 'styled-components';
import { shade } from 'polished';

import doctorImg from '../../assets/MinhaAgenda.svg';

interface WorkDayProps {
  workDay?: boolean;
  selectdAY?: boolean;
  inicializePage?: boolean;
}

interface SpecialistWorkTodayProps {
  work: boolean;
}

interface InicializePageProps {
  inicialize: boolean;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  height: 100vh;
  width: 100%;

  background-image: url(${doctorImg});
  /* background-position: center; */
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 90rem;

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

export const NewButton = styled.button<WorkDayProps>`
  height: 5rem;
  width: 90%;
  max-width: 20rem;

  background: rgba(247, 104, 91, 0.9);
  border: 0px;
  border-radius: 10px;
  color: var(--black);
  font-weight: 700;

  padding: 0 1.6rem;
  margin-bottom: 1rem;

  transition: background-color 0.2s;

  &:hover {
    background: transparent;
    border: 1px solid black;
  }

  padding: 0;
  margin: 0;
  max-width: 5rem;
  height: 5rem;

  & + button {
    margin-left: 0.5rem;
  }

  ${props =>
    !props.workDay &&
    css`
      background: rgba(9, 100, 67, 0.7);
    `}

  ${props =>
    props.selectdAY &&
    css`
      background: transparent;
      color: black;
      border: 1px solid black;
    `}
`;

export const WookSchedule = styled.div<SpecialistWorkTodayProps>`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  header {
    padding: 3rem 0 3rem 0;
  }

  ${props =>
    props.work &&
    css`
      display: flex;
    `}
`;

export const InicializePage = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  div {
    width: 90%;
    max-width: 50rem;
    font-size: 3rem;
    text-align: center;
  }
`;

export const AfterChooseOneDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 100%;

  button {
    background-image: linear-gradient(to right, #e9a957 0%, #d67b00 100%);

    &:hover {
      background: ${shade(0.2, '#d67b00')};
    }
  }
`;
