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
  padding: 16px;
  width: 28rem;

  border: 2px solid var(--white);
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
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


  input {
    background: transparent;
    flex: 1;
    border: none;
    color: var(--black);

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
