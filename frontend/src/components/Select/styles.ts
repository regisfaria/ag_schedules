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
  font-size: 1.4rem;

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
      border-color: var(--green);
    `}

  select {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);
    font-size: 16px;
    font-family: Poppins, sans-serifa;
    color: var(--input-placeholder);

    ${props =>
      props.isFocused &&
      css`
        color: var(--green);
      `}

    ${props =>
      props.isFilled &&
      css`
        color: var(--green);
      `}

    option {
      background-color: var(--white);
      flex: 1;
      font-size: 16px;
      font-family: Poppins, sans-serifa;
      color: var(--black);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

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
