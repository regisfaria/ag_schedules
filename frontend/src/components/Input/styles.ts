import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--white);
  border-radius: 10px;
  padding: 1.6rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;

  width: 100%;
  max-width: 70rem;


  height: 5rem;

  border: 2px solid var(--white);
  color: var(--input-placeholder);

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--error-red);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--green);
      border-color: var(--green);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--green);
    `}

    span {
      font-size: 1.2rem;
    }

  input {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);

    width: 100%;
    font-size: 1.4rem;


    &::placeholder {
      color: var(--input-placeholder);
    }

    ::-webkit-datetime-edit-text { padding: 0 0.3rem; color: var(--input-placeholder); }
    ::-webkit-datetime-edit-day-field { text-transform: uppercase; color: var(--input-placeholder); }
    ::-webkit-datetime-edit-month-field { text-transform: uppercase; color: var(--input-placeholder); }
    ::-webkit-datetime-edit-year-field { text-transform: uppercase; color: var(--input-placeholder); }
  }

  svg {
    margin-right: 16px;
  }

  @media (min-width: 425px) {

      span {
        font-size: 1.4rem;
      }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error-red);
    color: #fff;

    &::before {
      border-color: var(--error-red) transparent;
    }
  }
`;
