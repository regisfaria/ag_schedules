import styled, { css } from 'styled-components';

import Tooltips from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrors: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--white);
  border-radius: 10px;
  padding: 16px;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;

  font: 16px Poppins, sans-serifa;

  border: 2px solid var(--white);
  color: var(--input-placeholder);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  ${props =>
    props.isErrors &&
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

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--black);
    font-size:14px;
    resize: none;
    height: 100%;

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
`;

export const Error = styled(Tooltips)`
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
