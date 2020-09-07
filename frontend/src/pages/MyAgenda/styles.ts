import styled, { css } from 'styled-components';
import { shade } from 'polished';

import doctorImg from '../../assets/MinhaAgenda.svg';

interface WorkDayProps {
  workDay?: boolean;
  selectDay?: boolean;
}

interface SpecialistWorkTodayProps {
  work: boolean;
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
  background-size: 30rem;

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

export const Back = styled.div`
  button {
    border: none;
    position: fixed;
    top: 1rem;
    right: 1.5rem;
    background: transparent;
    z-index: 1;

    svg {
      color: var(--green);
      transition: transform scale color 0.2s;
    }

    &:hover {
      svg {
        transform: scale(1.1);
      }
    }
  }
`;

export const DaysWeek = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 6rem 1rem 3rem 1rem;
`;

export const NewButton = styled.button<WorkDayProps>`
  height: 5rem;
  width: 90%;
  max-width: 10rem;

  background: rgba(9, 100, 67, 0.7);
  border: 0px;
  border-radius: 10px;
  color: var(--black);
  font-weight: 700;

  padding: 0 1.6rem;
  margin-bottom: 1rem;

  transition: background-color 0.2s;

  padding: 0;
  margin: 0;

  & + button {
    margin-left: 0.5rem;
  }

  &:hover {
    background: transparent;
    border: 1px solid black;
    transform: scale(1.1);
  }

  ${props =>
    props.workDay &&
    css`
      background: rgba(247, 104, 91, 0.9);
    `}

  ${props =>
    props.selectDay &&
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
  display: flex;
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

  > section {
    width: 90%;
    margin-top: 1.5rem;
    button {
      font-size: 1.4rem;

      & + button {
        margin-left: 3rem;
      }
    }
  }
`;

export const SelectWorkToday = styled.div`
  background: var(--white);
  border-radius: 10px;
  padding: 1.6rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;

  width: 100%;
  max-width: 30rem;

  height: 5rem;

  border: 2px solid var(--white);
  color: var(--input-placeholder);

  display: flex;
  align-items: center;

  select {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);
    font-family: Poppins, sans-serifa;
    color: var(--input-placeholder);
    width: 100%;

    option {
      background-color: var(--white);
      flex: 1;
      font-size: 1.2rem;
      font-family: Poppins, sans-serifa;
      color: var(--black);
    }
  }
`;

export const Calendar = styled.aside`
  width: 38rem;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #c5c5c5;
    border-radius: 10px;
    color: #000;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
    top: 1.3rem !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #000;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #fcda80;
    border-radius: 10px;
    color: #464646;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #808080 !important;
    background: #d9d9d9 !important;
    border-radius: 10px;
  }

  .DayPicker-Day--selected {
    background: #f9b90d !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
