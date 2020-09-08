import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;

  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);

  header {
    color: #fff;
  }
`;

export const Modal = styled.aside`
  display: flex;
  flex-direction: row;

  div {
    p {
      color: red;
    }
  }

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #bbffbb;
    border-radius: 10px;
    color: #000;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 38rem;
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
    border-radius: 50%;
    color: #464646;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.1, '#225dc4')};
    color: #fff;
  }

  .DayPicker-Day--disabled {
    color: #bfb6b6 !important;
  }

  .DayPicker-Day--holidays {
    font-weight: normal;
    color: #fff !important;
    background: #f7434a;
    border-radius: 50% !important;
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #000 !important;
    background: #4af743;
    border-radius: 50% !important;
  }

  .DayPicker-Day--selected {
    background: #225dc4 !important;
    color: #fff !important;
  }

  .DayPicker-Day--holidays.DayPicker-Day--selected {
    background: #fff !important;
    color: #000 !important;
  }
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1.5rem;
  color: #fff;
  #Hoje {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.5rem;

    div {
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 1rem;
      border-radius: 50%;
      background: #4af743;
    }
  }

  #DiaDeFolga {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 1.5rem;

    div {
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 1rem;
      border-radius: 50%;
      background: #f7434a;
    }
  }
  #DiasSelecionados {
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 1rem;
      border-radius: 50%;
      background: #225dc4;
    }
  }
`;
