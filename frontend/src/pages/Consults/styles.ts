import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

import consultsImg from '../../assets/consults.svg';

interface ExpandedProps {
  isExpanded: boolean;
}

interface ConsultCardProps {
  isExpanded: boolean;
  status: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  /* background-image: url(${consultsImg}); */
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 40rem;
  background-color: var(--light-blue);

  main {
    #ConsultContent {
      order: 0;
    }

    #ConsultCalendar {
      order: 1;

      padding: 2rem;

      strong {
        font-size: 1.8rem;
      }

      span {
        font-weight: 200;
        font-size: 1.4rem;
        font-style: italic;
        color: var(--table-gray);
        padding: 0 1.2rem;
      }

      .DayPicker {
        z-index: 0;
        position: initial;
        border-radius: 10px;
      }

      .DayPicker-wrapper {
        padding-bottom: 0;
        background: #3e3b47;
        border-radius: 10px;
      }

      .DayPicker,
      .DayPicker-Month {
        width: 100%;
      }

      .DayPicker-NavButton {
        color: #999591 !important;
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
        background-color: #28262e;
        border-radius: 0 0 10px 10px;
      }

      .DayPicker-Caption {
        margin-bottom: 1em;
        padding: 0 1em;
        color: #f4ede8;

        > div {
          text-align: center;
        }
      }

      .DayPicker-Day {
        width: 40px;
        height: 40px;
      }

      .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
      }

      .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, '#3e3b47')};
      }

      .DayPicker-Day--today {
        font-weight: normal;
      }

      .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
      }

      .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 10px;
        color: #232129 !important;
      }
    }
  }

  @media only screen and (max-width: 450px) and (min-height: 500px) and (max-height: 680px) {
    height: 100%;
  }

  @media (max-width: 1024px) {
    main {
      #ConsultContent {
        order: 1;
      }

      #ConsultCalendar {
        order: 0;
      }
    }
  }
`;

export const ConsultsList = styled.div`
  display: flex;
  flex-direction: column;

  width: 31rem;
  height: 40rem;

  align-items: center;
  justify-content: flex-start;

  padding: 1rem 0 1rem 0;

  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    width: 70rem;
    height: 70rem;

    justify-content: center;
  }
`;

const blurEffectIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ConsultCard = styled.div<ConsultCardProps>`
  display: flex;
  flex-direction: row;

  width: 30rem;

  height: 10rem;

  justify-content: space-between;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.38);

  border-radius: 20px;

  section {
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;

    margin: 0.8rem 0 0.8rem 1rem;
    div {
      display: flex;
      flex-direction: row;

      align-items: center;

      p {
        color: var(--black);
      }

      button {
        border: none;
        background: none;

        margin-left: 1rem;

        svg {
          position: relative;
          top: 3px;
          color: var(--black);
          transition: color 0.2s;
        }

        &:hover {
          svg {
            color: ${shade(0.3, '#192A3E')};
            transform: scale(1.1);
          }
        }
      }
    }
  }

  ${props =>
    props.status === 'Em aberto' &&
    css`
      background-color: #b8daf3;
    `}

  ${props =>
    props.status === 'Concluída' &&
    css`
      background-color: #e2fffa;
    `}

  ${props =>
    props.status === 'Paciente não compareceu' &&
    css`
      background-color: #f7685b;
    `}

  ${props =>
    props.status === 'Cancelada' &&
    css`
      background-color: #c2cfe0;
    `}

  @media (min-width: 1024px) {
    width: 60rem;
  }

  & + div {
    margin-top: 2rem;
  }

  ${props =>
    props.isExpanded
      ? css`
          height: 20rem;
          transition: height 0.5s ease-in-out;

          section {
            p {
              animation: ${blurEffectIn} 1s;
            }
          }
        `
      : css`
          height: 10rem;
          transition: height 0.5s ease-in-out;
        `}
`;

export const HiddenContent = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;

  margin: 0.8rem 0 0.8rem 1rem;

  div {
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    p {
      color: var(--black);
    }

    button {
      border: none;
      background: none;

      margin-left: 1rem;

      svg {
        color: var(--green);
        transition: color 0.2s;
      }

      &:hover {
        svg {
          color: ${shade(0.3, '#192A3E')};
          transform: scale(1.1);
        }
      }
    }
  }

  form {
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    p {
      color: var(--black);
    }

    div {
      padding: 0;
      margin: 0.5rem 0 0.5rem 0;
      height: 2rem;
    }

    #confirmBtn {
      border: none;
      background: none;

      margin-left: 1rem;

      svg {
        position: relative;
        top: 3px;
        color: var(--green);
        transition: color 0.2s;
      }

      &:hover {
        svg {
          color: ${shade(0.3, '#09644b')};
          transform: scale(1.2);
        }
      }
    }

    #cancelBtn {
      border: none;
      background: none;

      margin-left: 1rem;

      svg {
        position: relative;
        top: 3px;
        color: var(--red);
        transition: color 0.2s;
      }

      &:hover {
        svg {
          color: ${shade(0.3, '#F7685B')};
          transform: scale(1.2);
        }
      }
    }
  }
`;

export const CardRightContent = styled.div<ExpandedProps>`
  display: flex;
  align-items: flex-start;

  border-radius: 20px;

  img {
    align-self: center;

    width: 8rem !important;
    height: 8rem !important;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;

    button {
      border: none;
      background: none;

      margin: 1.5rem 1.5rem 0 1rem;

      svg {
        color: var(--black);
        transition: color 0.2s;
      }

      &:hover {
        svg {
          color: ${shade(0.3, '#192A3E')};
          transform: scale(1.1);
        }
      }
    }
  }

  @media (min-width: 1024px) {
    div {
      button {
        margin: 1rem 1.5rem 0 5rem;
      }
    }
  }
`;
