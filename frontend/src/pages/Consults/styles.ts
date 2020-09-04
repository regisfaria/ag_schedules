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
    }
  }

  @media only screen and (max-width: 450px) and (min-height: 500px) and (max-height: 680px) {
    height: 100%;

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

  padding: 1rem 0 1rem 0;

  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    width: 70rem;
    height: 70rem;
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

    p {
      color: var(--black);
    }
  }

  ${props =>
    props.status === 'Em Aberto' &&
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
        `
      : css`
          height: 10rem;
          transition: height 0.5s ease-in-out;
        `}
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

  @media (min-width: 1024px) {
    button {
      margin: 1rem 1.5rem 0 5rem;
    }
  }
`;

export const HiddenContent = styled.div<ExpandedProps>``;
